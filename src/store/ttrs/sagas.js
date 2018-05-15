import axios from 'axios'
import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from './actions'
import { convertToCStyle, convertToJavaStyle, updateURLParams } from '../../services/parser'

axios.defaults.baseURL = 'http://127.0.0.1:8000/'
axios.interceptors.request.use((config) => {
  const newParams = convertToCStyle(config.params)
  return {
    ...config,
    params: newParams,
  }
}, (error) => {
  return Promise.reject(error)
})
axios.interceptors.response.use((response) => {
  const newData = convertToJavaStyle(response.data)
  return {
    ...response,
    data: newData,
  }
}, (error) => {
  const newData = convertToJavaStyle(error.response.data)
  const newError = {
    ...error,
    response: {
      ...error.response,
      data: newData,
    },
  }
  return Promise.reject(newError)
})
const config = {}
const year = 2018
const semester = '1학기'

function* getCollegeList() {
  try {
    const response = yield call(axios.get, 'ttrs/colleges/', config)
    console.log('getCollegeList response', response)
    yield put(actions.getCollegeList(response.data))
  } catch (error) {
    console.log('getCollegeList error', error.response)
  }
}

function* signIn(username, password) {
  const hash = new Buffer(`${username}:${password}`).toString('base64')
  config.headers = { Authorization: `Basic ${hash}` }
  try {
    const response = yield call(axios.get, 'ttrs/students/my/', config)
    console.log('signIn response', response)
    yield put(actions.signInResponse(response.data))
  } catch (error) {
    console.log('signIn error', error.response)
    return undefined
  }
  try {
    const params = {
      year,
      semester,
    }
    let myTimeTable = {
      id: null,
      title: '',
      memo: '',
      lectures: [],
    }
    const response = yield call(axios.get, updateURLParams('ttrs/my-time-tables/', params), config)
    console.log('getCurrent myTimeTable response', response)
    if (response.data.length !== 0) {
      myTimeTable = {
        id: response.data[0].id,
        title: response.data[0].title,
        memo: response.data[0].memo,
        lectures: [],
      }
      for (let i = 0; i < response.data[0].lectures.length; i += 1) {
        const lectureResponse = yield call(axios.get, `ttrs/lectures/${response.data[0].lectures[i]}/`, config)
        myTimeTable.lectures.push(lectureResponse.data)
      }
    }
    console.log(myTimeTable)
    yield put(actions.getMyTimeTable(myTimeTable))
  } catch (error) {
    console.log('getCurrent myTimeTable error', error.response)
  }
}

function* signUp(studentInfo) {
  try {
    const response = yield call(axios.post, 'ttrs/students/signup/', studentInfo)
    console.log('signUp response', response)
    yield put(actions.clearState())
  } catch (error) {
    console.log('signUp error', error.response)
  }
}

function* searchLecture(courseName) {
  try {
    const params = {
      'course.name.contains': courseName,
      year,
      semester,
    }
    const response = yield call(axios.get, updateURLParams('ttrs/lectures/', params), config)
    console.log('searchLecture response', response)
    yield put(actions.searchLectureResponse(response.data))
  } catch (error) {
    console.log('searchLecture error', error.response)
  }
}

function* updateMyTimeTable(myTimeTable, newLectureId) {
  const lectureIds = []
  myTimeTable.lectures.forEach((lecture) => {
    lectureIds.push(lecture.id)
  })
  if (newLectureId !== 0) {
    lectureIds.push(newLectureId)
  }
  const myTimeTableInfo = {
    title: myTimeTable.title,
    memo: myTimeTable.memo,
    lectures: lectureIds,
  }
  if (myTimeTable.id === null) {
    try {
      const response = yield call(axios.post, 'ttrs/my-time-tables/', myTimeTableInfo, config)
      console.log('create MyTimeTable response', response)
      myTimeTable.id = response.data.id
      myTimeTable.lectures = []
      const lectureResponse = yield call(axios.get, `ttrs/lectures/${newLectureId}/`, config)
      yield put(actions.addLectureToMyTimeTable(myTimeTable, lectureResponse.data))
    } catch (error) {
      lectureIds.pop()
      console.log('create MyTimeTable error', error.response)
    }
  } else {
    try {
      const response = yield call(axios.put, `ttrs/my-time-tables/${myTimeTable.id}/`, myTimeTableInfo, config)
      console.log('update MyTimeTable response', response)
      if (newLectureId !== 0) {
        const lectureResponse = yield call(axios.get, `ttrs/lectures/${newLectureId}/`, config)
        yield put(actions.addLectureToMyTimeTable(myTimeTable, lectureResponse.data))
      } else {
        yield put(actions.updateTitleOrMemoOfMyTimeTable(myTimeTable))
      }
    } catch (error) {
      if (newLectureId !== 0) {
        lectureIds.pop()
      }
      console.log('update MyTimeTable error', error.response)
    }
  }
}

function* watchSignIn() {
  while (true) {
    const { username, password } = yield take(actions.SIGN_IN_REQUEST)
    yield call(signIn, username, password)
  }
}

function* watchSignUp() {
  while (true) {
    const { studentInfo } = yield take(actions.SIGN_UP)
    yield call(signUp, studentInfo)
  }
}

function* watchSearchLecture() {
  while (true) {
    const { courseName } = yield take(actions.SEARCH_LECTURE_REQUEST)
    yield call(searchLecture, courseName)
  }
}

function* watchUpdateMyTimeTable() {
  while (true) {
    const { myTimeTable, newLectureId } = yield take(actions.UPDATE_MY_TIME_TABLE)
    yield call(updateMyTimeTable, myTimeTable, newLectureId)
  }
}

export default function* () {
  yield call(getCollegeList)
  yield fork(watchSignIn)
  yield fork(watchSignUp)
  yield fork(watchSearchLecture)
  yield fork(watchUpdateMyTimeTable)
}
