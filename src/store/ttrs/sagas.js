import axios from 'axios'
import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from './actions'
import { convertToCStyle, convertToJavaStyle, updateURLParams } from '../../services/parser'
import { initialTimeTable, initialState } from './selectors'

axios.defaults.baseURL = 'http://127.0.0.1:8000/'
axios.interceptors.request.use((config) => {
  const newData = convertToCStyle(config.data)
  return {
    ...config,
    data: newData,
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
  let bookmarkedTimeTables = []
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

function* getReceivedTimeTables(response) {
  let receivedTimeTables = []
  if (response.data.length !== 0) {
    receivedTimeTables = response.data.map((timeTable) => ({
      ...timeTable,
    }))
    const receiveResponse = yield call(axios.get, `ttrs/received-time-tables/${receivedTimeTables[0].id}/receive`, config)
    console.log('receiveResponse', receiveResponse)
    receivedTimeTables[0].lectures = []
    receivedTimeTables[0].receivedAt = receiveResponse.data.receivedAt
    for (let i = 0; i < response.data[0].lectures.length; i += 1) {
      const lectureResponse = yield call(axios.get, `ttrs/lectures/${response.data[0].lectures[i]}/`, config)
      receivedTimeTables[0].lectures.push(lectureResponse.data)
    }
  }
  yield put(actions.createReceivedTimeTables(receivedTimeTables))
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
    response.data.password = password
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
  try {
    const response = yield call(axios.get, updateURLParams('ttrs/received-time-tables/', params), config)
    console.log('getCurrent Received TimeTables response', response)
    yield call(getReceivedTimeTables, response)
  } catch (error) {
    console.log('getCurrent Received TimeTables error', error.response)
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
    const myTimeTableResponse = yield call(axios.get, updateURLParams('ttrs/my-time-tables/', params), config)
    console.log('getCurrent myTimeTable response', myTimeTableResponse)
    yield call(getCurrentMyTimeTable, myTimeTableResponse)
    const bookmarkedTimeTableResponse = yield call(axios.get, updateURLParams('ttrs/bookmarked-time-tables/', params), config)
    console.log('getCurrent bookmarkedTimeTable response', bookmarkedTimeTableResponse)
    yield call(getBookmarkedTimeTables, bookmarkedTimeTableResponse)
    const receivedTimeTableResponse = yield call(axios.get, updateURLParams('ttrs/received-time-tables/', params), config)
    console.log('getCurrent receivedTimeTable response', receivedTimeTableResponse)
    yield call(getReceivedTimeTables, receivedTimeTableResponse)
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
    // Error happens when bookmarkedTimeTable.lectures is list of Lecture Info (already updated)
    yield put(actions.selectBookmarkedTimeTableResponse(bookmarkedTimeTable))
  }
}

/**
 * If deleteLectureId > 0:
 *   Delete Lecture from Bookmarked TimeTable
 *
 * If deleteLectureId === null:
 *   Modify Title or Memo of Bookmarked TimeTable
 */
function* updateBookmarkedTimeTable(index, timeTableId, updatedInfo, deleteLectureId) {
  try {
    const response = yield call(axios.patch, `ttrs/bookmarked-time-tables/${timeTableId}/`, updatedInfo, config)
    console.log('update BookmarkedTimeTable response', response)
    if (deleteLectureId === null) {
      yield put(actions.updateBookmarkedTimeTableInfo(index, updatedInfo))
    } else {
      yield put(actions.deleteLectureFromBookmarkedTimeTable(index, deleteLectureId))
    }
  } catch (error) {
    console.log('update BookmarkedTimeTable error', error.response)
  }
}

function* bookmark(timeTableId) {
  try {
    const bookmarkResponse = yield call(axios.post, 'ttrs/time-tables/bookmark/', { timeTableId }, config)
    console.log('bookmark response', bookmarkResponse)
    const getBookmarkedTimeTableResponse = yield call(axios.get, `ttrs/bookmarked-time-tables/${bookmarkResponse.data.createdTimeTable}/`, config)
    console.log('get added bookmarked time table response', getBookmarkedTimeTableResponse)
    const lectures = []
    for (let i = 0; i < getBookmarkedTimeTableResponse.data.lectures.length; i += 1) {
      const getLectureInfoResponse = yield call(axios.get, `ttrs/lectures/${getBookmarkedTimeTableResponse.data.lectures[i]}/`, config)
      lectures.push(getLectureInfoResponse.data)
    }
    getBookmarkedTimeTableResponse.data.lectures = lectures
    yield put(actions.bookmarkResponse(getBookmarkedTimeTableResponse.data))
  } catch (error) {
    console.log('bookmark error', error.response)
  }
}

function* sendTimeTable(sendInfo) {
  try {
    const response = yield call(axios.post, 'ttrs/time-tables/send/', sendInfo, config)
    console.log('send Time Table response', response)
  } catch (error) {
    console.log('send Time Table error', error.response)
  }
}

function* selectReceivedTimeTable(receivedTimeTable, index) {
  const lectures = []
  try {
    for (let i = 0; i < receivedTimeTable.lectures.length; i += 1) {
      const response = yield call(axios.get, `ttrs/lectures/${receivedTimeTable.lectures[i]}/`, config)
      lectures.push(response.data)
    }
    receivedTimeTable.lectures = [
      ...lectures,
    ]
    const receiveResponse = yield call(axios.get, `ttrs/received-time-tables/${receivedTimeTable.id}/receive`, config)
    console.log('receiveResponse', receiveResponse)
    receivedTimeTable.receivedAt = receiveResponse.data.receivedAt
    yield put(actions.selectReceivedTimeTableResponse(receivedTimeTable, index))
  } catch (error) {
    // Error happens when receivedTimeTable.lectures is list of Lecture Info (already updated)
    yield put(actions.selectReceivedTimeTableResponse(receivedTimeTable, index))
  }
}

function* copyToMyTimeTable(timeTableId) {
  try {
    const copyToMyResponse = yield call(axios.post, 'ttrs/time-tables/copy-to-my/', { timeTableId }, config)
    console.log('copyToMy response', copyToMyResponse)
    const getMyTimeTableResponse = yield call(axios.get, `ttrs/my-time-tables/${copyToMyResponse.data.createdTimeTable}/`, config)
    const lectures = []
    for (let i = 0; i < getMyTimeTableResponse.data.lectures.length; i += 1) {
      const response = yield call(axios.get, `ttrs/lectures/${getMyTimeTableResponse.data.lectures[i]}/`, config)
      lectures.push(response.data)
    }
    getMyTimeTableResponse.data.lectures = lectures
    yield put(actions.copyToMyTimeTableResponse(getMyTimeTableResponse.data))
  } catch (error) {
    console.log('copyToMy error', error.response)
  }
}

function* changePassword(password) {
  try {
    const response = yield call(axios.patch, 'ttrs/students/my/', { password }, config)
    console.log('change password response', response)
    yield put(actions.clearState())
  } catch (error) {
    console.log('change password error', error.response)
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
    const { index, timeTableId, updatedInfo, deleteLectureId } = yield take(actions.UPDATE_BOOKMARKED_TIME_TABLE_REQUEST)
    yield call(updateBookmarkedTimeTable, index, timeTableId, updatedInfo, deleteLectureId)
  }
}

function* watchBookmark() {
  while (true) {
    const { timeTableId } = yield take(actions.BOOKMARK_REQUEST)
    yield call(bookmark, timeTableId)
  }
}

function* watchSendTimeTable() {
  while (true) {
    const { sendInfo } = yield take(actions.SEND_TIME_TABLE)
    yield call(sendTimeTable, sendInfo)
  }
}

function* watchSelectReceivedTimeTable() {
  while (true) {
    const { receivedTimeTable, index } = yield take(actions.SELECT_RECEIVED_TIME_TABLE_REQUEST)
    yield call(selectReceivedTimeTable, receivedTimeTable, index)
  }
}

function* watchCopyToMyTimeTable() {
  while (true) {
    const { timeTableId } = yield take(actions.COPY_TO_MY_TIME_TABLE_REQUEST)
    yield call(copyToMyTimeTable, timeTableId)
  }
}

function* watchChangePassword() {
  while (true) {
    const { password } = yield take(actions.CHANGE_PASSWORD)
    yield call(changePassword, password)
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
  yield fork(watchBookmark)
  yield fork(watchSendTimeTable)
  yield fork(watchSelectReceivedTimeTable)
  yield fork(watchCopyToMyTimeTable)
  yield fork(watchChangePassword)
}
