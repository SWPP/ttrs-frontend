import axios from 'axios'
import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from './actions'
import { convertToCStyle, convertToJavaStyle } from '../../services/parser'

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
let year = 2018
let semester = '1학기'

function* getCollegeList() {
  try {
    const response = yield call(axios.get, 'ttrs/colleges/', config)
    console.log('getCollegeList response', response)
    yield put(actions.getCollegeListResponse(response.data))
  } catch (error) {
    console.log('getCollegeList error', error.response)
  }
}

function* signIn(username, password) {
  let lecturesOfMyTimeTable = []
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
    const response = yield call(axios.get, `ttrs/my-time-tables/?year=${year}&semester=${semester}`, config)
    console.log('getCurrent myTimeTable response', response)
    if (response.data.length !== 0) {
      for (let i = 0; i < response.data[0].lectures.length; i += 1) {
        const lectureResponse = yield call(axios.get, `ttrs/lectures/${response.data[0].lectures[i]}/`, config)
        lecturesOfMyTimeTable.push(lectureResponse.data)
      }
    }
    yield put(actions.getMyTimeTableResponse(lecturesOfMyTimeTable))
  } catch (error) {
    console.log('getCurrent myTimeTable error', error.response)
  }
}

function* signUp(studentInfo) {
  try {
    const response = yield call(axios.post, 'ttrs/students/signup/', studentInfo)
    console.log('signUp response', response)
    yield put(actions.clearStateRequest())
  } catch (error) {
    console.log('signUp error', error.response)
  }
}

function* searchLecture(courseName) {
  try {
    const response = yield call(axios.get, `ttrs/lectures/?course__name=${courseName}&year=${year}&semester=${semester}`, config)
    console.log('searchLecture response', response)
    yield put(actions.searchLectureResponse(response.data))
  } catch (error) {
    console.log('searchLecture error', error.response)
  }
}

function* addLectureToMyTimeTable (lectureIds, newLectureId) {
  lectureIds.push(newLectureId)
  let myTimeTableInfo = {
    lectures: lectureIds,
  }
  try {
    const response = yield call(axios.post, 'ttrs/my-time-tables/', myTimeTableInfo, config)
    console.log('addLecture response', response)
    const lectureResponse = yield call(axios.get, `ttrs/lectures/${newLectureId}/`, config)
    yield put(actions.addLectureToMyTimeTableResponse(lectureResponse.data))
  } catch (error) {
    console.log('addLecture error', error.response)
  }
}

function* watchSignIn() {
  while (true) {
    const { username, password } = yield take(actions.SIGNIN_REQUEST)
    yield call(signIn, username, password)
  }
}

function* watchSignUp() {
  while (true) {
    const { studentInfo } = yield take(actions.SIGNUP_REQUEST)
    yield call(signUp, studentInfo)
  }
}

function* watchSearchLecture() {
  while (true) {
    const { courseName } = yield take(actions.SEARCH_LECTURE_REQUEST)
    yield call(searchLecture, courseName)
  }
}

function* watchAddLectureToMyTimeTable() {
  while (true) {
    const { lectureIds, newLectureId } = yield take(actions.ADD_LECTURE_TO_MY_TIMETABLE_REQUEST)
    yield call(addLectureToMyTimeTable, lectureIds, newLectureId)
  }
}

export default function* () {
  yield call(getCollegeList)
  yield fork(watchSignIn)
  yield fork(watchSignUp)
  yield fork(watchSearchLecture)
  yield fork(watchAddLectureToMyTimeTable)
}
