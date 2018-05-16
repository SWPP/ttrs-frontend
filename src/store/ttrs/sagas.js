import axios from 'axios'
import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from './actions'
import { convertToCStyle, convertToJavaStyle, updateURLParams } from '../../services/parser'
import { initialTimeTable, initialState } from './selectors'

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
let year
let semester

function* getCurrentMyTimeTable(response) {
  let myTimeTable = {
    ...initialTimeTable.myTimeTable,
  }
  if (response.data.length !== 0) {
    myTimeTable = {
      ...response.data[0],
      lectures: [],
    }
    for (let i = 0; i < response.data[0].lectures.length; i += 1) {
      const lectureResponse = yield call(axios.get, `ttrs/lectures/${response.data[0].lectures[i]}/`, config)
      myTimeTable.lectures.push(lectureResponse.data)
    }
  }
  yield put(actions.createMyTimeTable(myTimeTable))
}

function* getBookmarkedTimeTables(response) {
  let bookmarkedTimeTables = [{
    ...initialTimeTable.bookmarkedTimeTable,
  }]
  if (response.data.length !== 0) {
    bookmarkedTimeTables = response.data.map((timeTable) => ({
      ...timeTable,
    }))
    bookmarkedTimeTables[0].lectures = []
    for (let i = 0; i < response.data[0].lectures.length; i += 1) {
      const lectureResponse = yield call(axios.get, `ttrs/lectures/${response.data[0].lectures[i]}/`, config)
      bookmarkedTimeTables[0].lectures.push(lectureResponse.data)
    }
  }
  yield put(actions.createBookmarkedTimeTables(bookmarkedTimeTables))
}

function* getInitialInfo() {
  try {
    const response = yield call(axios.get, 'ttrs/colleges/', config)
    console.log('getCollegeList response', response)
    yield put(actions.getCollegeList(response.data))
  } catch (error) {
    console.log('getCollegeList error', error.response)
  }
  try {
    const response = yield call(axios.get, 'ttrs/semesters/', config)
    console.log('getSemesterList response', response)
    initialState.year = response.data[0].year
    initialState.semester = response.data[0].semester
    yield put(actions.getSemesterList(response.data))
  } catch (error) {
    console.log('getSemesterList error', error.response)
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
  year = initialState.year
  semester = initialState.semester
  const params = {
    year,
    semester,
  }
  try {
    const response = yield call(axios.get, updateURLParams('ttrs/my-time-tables/', params), config)
    console.log('getCurrent myTimeTable response', response)
    yield call(getCurrentMyTimeTable, response)
  } catch (error) {
    console.log('getCurrent myTimeTable error', error.response)
  }
  try {
    const response = yield call(axios.get, updateURLParams('ttrs/bookmarked-time-tables/', params), config)
    console.log('getCurrent Bookmarked TimeTables response', response)
    yield call(getBookmarkedTimeTables, response)
  } catch (error) {
    console.log('getCurrent Bookmarked TimeTables error', error.response)
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

/**
 * If newLectureId > 0:
 *   Add Lecture to My TimeTable
 *
 * If newLectureId === null:
 *   Modify Title or Memo of My TimeTable
 *
 * If newLectureId < 0:
 *   Delete Lecture from My TimeTable
 * ----------------------------------------
 * If myTimeTableId === null:
 *   createMyTimeTable
 *
 * If myTimeTableId > 0:
 *   updateMyTimeTable
 */
function* updateMyTimeTable(myTimeTableId, updatedInfo, newLectureId) {
  if (newLectureId !== null && newLectureId > 0) {
    updatedInfo.lectures.push(newLectureId)
  }
  if (myTimeTableId === null) {
    try {
      const response = yield call(axios.post, 'ttrs/my-time-tables/', updatedInfo, config)
      console.log('create MyTimeTable response', response)

      const lectureResponse = yield call(axios.get, `ttrs/lectures/${newLectureId}/`, config)
      yield put(actions.createMyTimeTable({
        ...response.data,
        lectures: [lectureResponse.data],
      }))
    } catch (error) {
      console.log('create MyTimeTable error', error.response)
    }
  } else {
    try {
      const response = yield call(axios.patch, `ttrs/my-time-tables/${myTimeTableId}/`, updatedInfo, config)
      console.log('update MyTimeTable response', response)

      if (newLectureId !== null) {
        if (newLectureId > 0) {
          const lectureResponse = yield call(axios.get, `ttrs/lectures/${newLectureId}/`, config)
          yield put(actions.addLectureToMyTimeTable(lectureResponse.data))
        } else {
          yield put(actions.deleteLectureFromMyTimeTable(-newLectureId))
        }
      } else {
        yield put(actions.updateMyTimeTableInfo(updatedInfo))
      }
    } catch (error) {
      console.log('update MyTimeTable error', error.response)
    }
  }
}

function* switchSemester(newYear, newSemester) {
  year = newYear
  semester = newSemester
  const params = {
    year,
    semester,
  }
  try {
    const response = yield call(axios.get, updateURLParams('ttrs/my-time-tables/', params), config)
    console.log('getCurrent myTimeTable response', response)
    yield call(getCurrentMyTimeTable, response)
    yield put(actions.searchLectureResponse([]))
  } catch (error) {
    console.log('switchSemester error', error.response)
  }
}

function* selectBookmarkedTimeTable(bookmarkedTimeTable) {
  const lectures = []
  try {
    for (let i = 0; i < bookmarkedTimeTable.lectures.length; i += 1) {
      const response = yield call(axios.get, `ttrs/lectures/${bookmarkedTimeTable.lectures[i]}/`, config)
      lectures.push(response.data)
    }
    bookmarkedTimeTable.lectures = [
      ...lectures,
    ]
    yield put(actions.selectBookmarkedTimeTableResponse(bookmarkedTimeTable))
  } catch (error) {
    yield put(actions.selectBookmarkedTimeTableResponse(bookmarkedTimeTable))
  }
}

function* updateBookmarkedTimeTable(index, timeTableId, updatedInfo) {
  try {
    const response = yield call(axios.patch, `ttrs/bookmarked-time-tables/${timeTableId}/`, updatedInfo, config)
    console.log('update BookmarkedTimeTable response', response)
    yield put(actions.updateBookmarkedTimeTableInfo(index, updatedInfo))
  } catch (error) {
    console.log('update BookmarkedTimeTable error', error.response)
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
    const { myTimeTableId, updatedInfo, newLectureId } = yield take(actions.UPDATE_MY_TIME_TABLE_REQUEST)
    yield call(updateMyTimeTable, myTimeTableId, updatedInfo, newLectureId)
  }
}

function* watchSwitchSemester() {
  while (true) {
    const { newYear, newSemester } = yield take(actions.SWITCH_SEMESTER)
    yield call(switchSemester, newYear, newSemester)
  }
}

function* watchSelectBookmarkedTimeTable() {
  while (true) {
    const { bookmarkedTimeTable } = yield take(actions.SELECT_BOOKMARKED_TIME_TABLE_REQUEST)
    yield call(selectBookmarkedTimeTable, bookmarkedTimeTable)
  }
}

function* watchUpdateBookmarkedTimeTable() {
  while (true) {
    const { index, timeTableId, updatedInfo } = yield take(actions.UPDATE_BOOKMARKED_TIME_TABLE_REQUEST)
    yield call(updateBookmarkedTimeTable, index, timeTableId, updatedInfo)
  }
}

export default function* () {
  yield call(getInitialInfo)
  yield fork(watchSignIn)
  yield fork(watchSignUp)
  yield fork(watchSearchLecture)
  yield fork(watchUpdateMyTimeTable)
  yield fork(watchSwitchSemester)
  yield fork(watchSelectBookmarkedTimeTable)
  yield fork(watchUpdateBookmarkedTimeTable)
}
