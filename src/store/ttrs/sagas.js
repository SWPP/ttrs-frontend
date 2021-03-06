import axios from 'axios'
import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from './actions'
import { convertToCStyle, convertToJavaStyle, updateURLParams } from '../../services/parser'
import { initialTimeTable, initialState } from './selectors'
import { processErrors } from '../../services/error_utility'

/* Axios default settings */
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

function* getLecturesFromLectureIds(timeTable) {
  const lectures = []
  for (let i = 0; i < timeTable.lectures.length; i += 1) {
    const response = yield call(axios.get, `ttrs/lectures/${timeTable.lectures[i]}/`, config)
    lectures.push(response.data)
  }
  return lectures
}

function* getCurrentMyTimeTable(response) {
  let myTimeTable = {
    ...initialTimeTable.myTimeTable,
  }
  if (response.data.length !== 0) {
    myTimeTable = {
      ...response.data[0],
    }
    myTimeTable.lectures = yield call(getLecturesFromLectureIds, response.data[0])
  }
  yield put(actions.createMyTimeTable(myTimeTable))
}

function* getBookmarkedTimeTables(response) {
  let bookmarkedTimeTables = []
  if (response.data.length !== 0) {
    bookmarkedTimeTables = [...response.data]
    bookmarkedTimeTables[0].lectures = yield call(getLecturesFromLectureIds, response.data[0])
  }
  yield put(actions.createBookmarkedTimeTables(bookmarkedTimeTables))
}

function* getReceivedTimeTables(response) {
  let receivedTimeTables = []
  if (response.data.length !== 0) {
    receivedTimeTables = [...response.data]
    const receiveResponse = yield call(axios.get, `ttrs/received-time-tables/${receivedTimeTables[0].id}/receive/`, config)
    console.log('receiveResponse', receiveResponse)
    receivedTimeTables[0].lectures = yield call(getLecturesFromLectureIds, response.data[0])
    receivedTimeTables[0].receivedAt = receiveResponse.data.receivedAt
  }
  yield put(actions.createReceivedTimeTables(receivedTimeTables))
}

function* getRecommendedTimeTables(response) {
  let recommendedTimeTables = []
  if (response.data.length !== 0) {
    recommendedTimeTables = [...response.data]
    recommendedTimeTables[0].lectures = yield call(getLecturesFromLectureIds, response.data[0])
  }
  yield put(actions.createRecommendedTimeTables(recommendedTimeTables))
}

function* getNotRecommendCourses(notRecommends) {
  const notRecommendCourses = []
  for (let i = 0; i < notRecommends.length; i += 1) {
    const getNotRecommendCourseResponse = yield call(axios.get, `/ttrs/courses/${notRecommends[i]}/`, config)
    notRecommendCourses.push({ id: notRecommends[i], name: getNotRecommendCourseResponse.data.name })
  }
  yield put(actions.setNotRecommendCourses(notRecommendCourses))
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
    yield put(actions.setErrors('signIn', processErrors(error.response.data), 'Failed to sign in.'))
    return undefined
  }
  year = initialState.year
  semester = initialState.semester
  try {
    const semesterInfo = JSON.parse(localStorage.getItem('SEMESTER'))
    if (semesterInfo !== null) {
      year = semesterInfo.year
      semester = semesterInfo.semester
    }
  } catch (error) {
    console.log('get semester info from local storage error', error)
    localStorage.removeItem('SEMESTER')
  }
  const params = {
    year,
    semester,
  }
  yield put(actions.switchSemesterResponse(year, semester))
  try {
    const response = yield call(axios.get, updateURLParams('ttrs/static-information/', params), config)
    console.log('get Fields and Types response', response)
    yield put(actions.setFieldsAndTypes(response.data.fields, response.data.types))
  } catch (error) {
    console.log('get Fields and Types error', error.response)
  }
  try {
    const response = yield call(axios.get, updateURLParams('ttrs/my-time-tables/', params), config)
    console.log('getCurrent myTimeTable response', response)
    yield call(getCurrentMyTimeTable, response)
  } catch (error) {
    console.log('getCurrent myTimeTable error', error.response)
    yield put(actions.setErrors('getCurrentMyTimeTable', processErrors(error.response.data), 'Failed to get current my timetable.'))
  }
  try {
    const response = yield call(axios.get, updateURLParams('ttrs/bookmarked-time-tables/', params), config)
    console.log('getCurrent Bookmarked TimeTables response', response)
    yield call(getBookmarkedTimeTables, response)
  } catch (error) {
    console.log('getCurrent Bookmarked TimeTables error', error.response)
    yield put(actions.setErrors('getCurrentBookmarkedTimeTables', processErrors(error.response.data), 'Failed to get bookmarkedtime tables.'))
  }
  try {
    const response = yield call(axios.get, updateURLParams('ttrs/received-time-tables/', params), config)
    console.log('getCurrent Received TimeTables response', response)
    yield call(getReceivedTimeTables, response)
  } catch (error) {
    console.log('getCurrent Received TimeTables error', error.response)
    yield put(actions.setErrors('getCurrentReceivedTimeTables', processErrors(error.response.data), 'Failed to get received timetables.'))
  }
  return undefined
}

function* signUp(studentInfo) {
  try {
    const response = yield call(axios.post, 'ttrs/students/signup/', studentInfo)
    console.log('signUp response', response)
    yield put(actions.signUpResponse())
  } catch (error) {
    console.log('signUp error', error.response)
    yield put(actions.setErrors('signUp', processErrors(error.response.data), 'Failed to sign up.'))
  }
}

function* searchLecture(options) {
  try {
    const params = {
      ...options,
      year,
      semester,
    }
    const response = yield call(axios.get, updateURLParams('ttrs/lectures/', params), config)
    console.log('searchLecture response', response)
    yield put(actions.searchLectureResponse(response.data.results, response.data.count))
  } catch (error) {
    console.log('searchLecture error', error.response)
    yield put(actions.setErrors('searchLecture', processErrors(error.response.data), 'Failed to search lectures.'))
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
      yield put(actions.setErrors('createMyTimeTable', processErrors(error.response.data), 'Failed to create my timetable.'))
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
          yield put(actions.deleteLectureFromMyTimeTableResponse(-newLectureId))
        }
      } else {
        yield put(actions.updateMyTimeTableInfo(updatedInfo))
      }
    } catch (error) {
      console.log('update MyTimeTable error', error.response)
      yield put(actions.setErrors('updateMyTimeTable', processErrors(error.response.data), 'Failed to update the timetable.'))
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
    yield put(actions.searchLectureResponse([]))
    yield put(actions.createRecommendedTimeTables([]))
    const fieldsAndTypesResponse = yield call(axios.get, updateURLParams('ttrs/static-information/', params), config)
    console.log('get Fields and Types response', fieldsAndTypesResponse)
    yield put(actions.setFieldsAndTypes(fieldsAndTypesResponse.data.fields, fieldsAndTypesResponse.data.types))
    const myTimeTableResponse = yield call(axios.get, updateURLParams('ttrs/my-time-tables/', params), config)
    console.log('getCurrent myTimeTable response', myTimeTableResponse)
    yield call(getCurrentMyTimeTable, myTimeTableResponse)
    const bookmarkedTimeTableResponse = yield call(axios.get, updateURLParams('ttrs/bookmarked-time-tables/', params), config)
    console.log('getCurrent bookmarkedTimeTable response', bookmarkedTimeTableResponse)
    yield call(getBookmarkedTimeTables, bookmarkedTimeTableResponse)
    const receivedTimeTableResponse = yield call(axios.get, updateURLParams('ttrs/received-time-tables/', params), config)
    console.log('getCurrent receivedTimeTable response', receivedTimeTableResponse)
    yield call(getReceivedTimeTables, receivedTimeTableResponse)

    yield put(actions.switchSemesterResponse(year, semester))
  } catch (error) {
    console.log('switchSemester error', error.response)
    yield put(actions.setErrors('switchSemester', processErrors(error.response.data), 'Failed to switch the semester.'))
  }
}

function* selectBookmarkedTimeTable(bookmarkedTimeTable) {
  try {
    bookmarkedTimeTable.lectures = yield call(getLecturesFromLectureIds, bookmarkedTimeTable)
    yield put(actions.selectBookmarkedTimeTableResponse(bookmarkedTimeTable))
  } catch (error) {
    // Error happens when bookmarkedTimeTable.lectures is list of Lecture Info (already updated)
    yield put(actions.selectBookmarkedTimeTableResponse(bookmarkedTimeTable))
  }
}

/**
 * If deleteLectureId > 0:
 *   Add Lecture to Bookmarked TimeTable
 *
 * If deleteLectureId === null:
 *   Modify Title or Memo of Bookmarked TimeTable
 *
 * If deleteLectureId < 0:
 *   Delete Lecture from Bookmarked TimeTable
 */
function* updateBookmarkedTimeTable(timeTableId, updatedInfo, newLectureId) {
  if (newLectureId !== null && newLectureId > 0) {
    updatedInfo.lectures.push(newLectureId)
  }
  try {
    const response = yield call(axios.patch, `ttrs/bookmarked-time-tables/${timeTableId}/`, updatedInfo, config)
    console.log('update BookmarkedTimeTable response', response)

    if (newLectureId !== null) {
      if (newLectureId > 0) {
        const lectureResposne = yield call(axios.get, `ttrs/lectures/${newLectureId}/`, config)
        yield put(actions.addLectureToBookmarkedTimeTable(timeTableId, lectureResposne.data))
      } else {
        yield put(actions.deleteLectureFromBookmarkedTimeTableResponse(timeTableId, -newLectureId))
      }
    } else {
      yield put(actions.updateBookmarkedTimeTableInfo(timeTableId, updatedInfo))
    }
  } catch (error) {
    console.log('update BookmarkedTimeTable error', error.response)
    yield put(actions.setErrors('updateBookmarkedTimeTable', processErrors(error.response.data), 'Failed to update the timetable.'))
  }
}

function* bookmark(timeTableId) {
  try {
    const bookmarkResponse = yield call(axios.post, 'ttrs/time-tables/bookmark/', { timeTableId }, config)
    console.log('bookmark response', bookmarkResponse)
    const getBookmarkedTimeTableResponse = yield call(axios.get, `ttrs/bookmarked-time-tables/${bookmarkResponse.data.createdTimeTable}/`, config)
    console.log('get added bookmarked time table response', getBookmarkedTimeTableResponse)
    getBookmarkedTimeTableResponse.data.lectures = yield call(getLecturesFromLectureIds, getBookmarkedTimeTableResponse.data)
    yield put(actions.bookmarkResponse(getBookmarkedTimeTableResponse.data))
  } catch (error) {
    console.log('bookmark error', error.response)
    yield put(actions.setErrors('bookmark', processErrors(error.request.data), 'Failed to bookmark the timetable.'))
  }
}

function* sendTimeTable(sendInfo) {
  try {
    const response = yield call(axios.post, 'ttrs/time-tables/send/', sendInfo, config)
    console.log('send Time Table response', response)
    yield put(actions.sendTimeTableResponse())
  } catch (error) {
    console.log('send Time Table error', error.response)
    yield put(actions.setErrors('send', processErrors(error.request.data), 'Failed to send the timetable.'))
  }
}

function* selectReceivedTimeTable(receivedTimeTable, timeTableId) {
  try {
    receivedTimeTable.lectures = yield call(getLecturesFromLectureIds, receivedTimeTable)
    const receiveResponse = yield call(axios.get, `ttrs/received-time-tables/${receivedTimeTable.id}/receive/`, config)
    console.log('receiveResponse', receiveResponse)
    receivedTimeTable.receivedAt = receiveResponse.data.receivedAt
    yield put(actions.selectReceivedTimeTableResponse(receivedTimeTable, timeTableId))
  } catch (error) {
    // Error happens when receivedTimeTable.lectures is list of Lecture Info (already updated)
    yield put(actions.selectReceivedTimeTableResponse(receivedTimeTable, timeTableId))
  }
}

function* selectRecommendedTimeTable(recommendedTimeTable) {
  try {
    recommendedTimeTable.lectures = yield call(getLecturesFromLectureIds, recommendedTimeTable)
    yield put(actions.selectRecommendedTimeTableResponse(recommendedTimeTable))
  } catch (error) {
    // Error happens when recommendedTimeTable.lectures is list of Lecture Info (already updated)
    yield put(actions.selectRecommendedTimeTableResponse(recommendedTimeTable))
  }
}

function* copyToMyTimeTable(timeTableId) {
  try {
    const copyToMyResponse = yield call(axios.post, 'ttrs/time-tables/copy-to-my/', { timeTableId }, config)
    console.log('copyToMy response', copyToMyResponse)
    const getMyTimeTableResponse = yield call(axios.get, `ttrs/my-time-tables/${copyToMyResponse.data.createdTimeTable}/`, config)
    getMyTimeTableResponse.data.lectures = yield call(getLecturesFromLectureIds, getMyTimeTableResponse.data)
    yield put(actions.copyToMyTimeTableResponse(getMyTimeTableResponse.data))
  } catch (error) {
    console.log('copyToMy error', error.response)
    yield put(actions.setErrors('copyToMyTimeTable', processErrors(error.response.data), 'Failed to copy the timetable to mine.'))
  }
}

function* updateStudentInfo(info) {
  try {
    const response = yield call(axios.patch, 'ttrs/students/my/', info, config)
    console.log('update student info response', response)
    if (info.password) {
      yield put(actions.clearState())
    } else {
      delete response.data.password
      yield put(actions.updateStudentInfoResponse(response.data))
    }
  } catch (error) {
    console.log('update student info error', error.response)
    yield put(actions.setErrors('settingsTab', processErrors(error.response.data), 'Failed to update the profile.'))
  }
}

function* withdraw() {
  try {
    const response = yield call(axios.delete, 'ttrs/students/my/', config)
    console.log('withdraw response', response)
    yield put(actions.withdrawResponse())
  } catch (error) {
    console.log('withdraw error')
    yield put(actions.setErrors('withdraw', processErrors(error.response.data), 'Failed to withdraw the membership.'))
  }
}

function* deleteTimeTable(timeTableId, timeTableType, timeTables) {
  try {
    if (timeTableType === 'my') {
      yield call(axios.delete, `ttrs/my-time-tables/${timeTableId}/`, config)
      console.log('delete my time table')
      yield put(actions.deleteMyTimeTableResponse())
    } else if (timeTableType === 'bookmarked') {
      yield call(axios.delete, `ttrs/bookmarked-time-tables/${timeTableId}/`, config)
      console.log('delete bookmarked time table')
      if (timeTables[0].id === timeTableId) {
        if (timeTables.length === 1) {
          yield put(actions.deleteBookmarkedTimeTableResponse(timeTableId, initialTimeTable.bookmarkedTimeTable))
        } else {
          try {
            timeTables[1].lectures = yield call(getLecturesFromLectureIds, timeTables[1])
            yield put(actions.deleteBookmarkedTimeTableResponse(timeTableId, timeTables[1]))
          } catch (error) {
            // Error happens when bookmarkedTimeTable.lectures is list of Lecture Info (already updated)
            yield put(actions.deleteBookmarkedTimeTableResponse(timeTableId, timeTables[1]))
          }
        }
      } else {
        yield put(actions.deleteBookmarkedTimeTableResponse(timeTableId, timeTables[0]))
      }
    } else if (timeTableType === 'received') {
      yield call(axios.delete, `ttrs/received-time-tables/${timeTableId}/`, config)
      console.log('delete received time table')
      if (timeTables[0].id === timeTableId) {
        if (timeTables.length === 1) {
          yield put(actions.deleteReceivedTimeTableResponse(timeTableId, initialTimeTable.receivedTimeTable))
        } else {
          const response = yield call(axios.get, `ttrs/received-time-tables/${timeTables[1].id}/receive/`, config)
          console.log('receiveResponse', response)
          timeTables[1].receivedAt = response.data.receivedAt
          try {
            timeTables[1].lectures = yield call(getLecturesFromLectureIds, timeTables[1])
            yield put(actions.deleteReceivedTimeTableResponse(timeTableId, timeTables[1]))
          } catch (error) {
            // Error happens when receivedTimeTable.lectures is list of Lecture Info (already updated)
            yield put(actions.deleteReceivedTimeTableResponse(timeTableId, timeTables[1]))
          }
        }
      } else {
        yield put(actions.deleteReceivedTimeTableResponse(timeTableId, timeTables[0]))
      }
    }
  } catch (error) {
    console.log('deleteTimeTable error', error.response)
    yield put(actions.setErrors('deleteTimeTable', processErrors(error.response.data), 'Failed to delete the timetable.'))
  }
}

function* addToNotRecommends(notRecommends, courseId) {
  try {
    let alreadyAdded = false
    notRecommends.forEach((id) => {
      if (id === courseId) {
        alreadyAdded = true
      }
    })
    if (!alreadyAdded) {
      notRecommends.push(courseId)
      const response = yield call(axios.patch, 'ttrs/students/my/', { notRecommends }, config)
      console.log('addToNotRecommends response', response)
      yield put(actions.addToNotRecommendsResponse(notRecommends))
    } else {
      console.log('already added to not Recommends')
      yield put(actions.setErrors('addEvaluation', processErrors(), 'Already registered to not recommend.'))
    }
  } catch (error) {
    console.log('addToNotRecommends error', error.response)
    yield put(actions.setErrors('addToNotRecommends', processErrors(error.response.data), 'Failed to disallow to recommend the course.'))
  }
}

function* deleteFromNotRecommends(notRecommends, courseId) {
  const newNotRecommends = []
  notRecommends.forEach((id) => {
    if (id !== courseId) {
      newNotRecommends.push(id)
    }
  })
  try {
    const response = yield call(axios.patch, 'ttrs/students/my/', { notRecommends: newNotRecommends }, config)
    console.log('deleteFromNotRecommends response', response)
    yield put(actions.deleteFromNotRecommendsResponse(newNotRecommends))
    yield call(getNotRecommendCourses, newNotRecommends)
  } catch (error) {
    console.log('deleteFromNotRecommends error', error.response)
    yield put(actions.setErrors('deleteFromNotRecommends', processErrors(error.response.data), 'Failed to allow to recommend the course.'))
  }
}

function* getEvaluations(lectureId) {
  const params = {
    lecture: lectureId,
  }
  try {
    const response = yield call(axios.get, updateURLParams('ttrs/evaluations/', params), config)
    console.log('get evaluations response', response)
    const lectureResponse = yield call(axios.get, `ttrs/lectures/${lectureId}/`, config)
    console.log('get lecture response', lectureResponse)
    yield put(actions.setEvaluationsResponse(response.data, lectureResponse.data))
  } catch (error) {
    console.log('get evaluations response', error.response)
    yield put(actions.setErrors('getEvaluation', processErrors(error.response.data), 'Failed to get evaluations.'))
  }
}

function* addEvaluation(lectureId, evaluation) {
  try {
    const response = yield call(axios.post, 'ttrs/evaluations/', evaluation, config)
    console.log('add evaluation response', response)
    yield call(getEvaluations, lectureId)
  } catch (error) {
    console.log('add evaluation error', error.response)
    yield put(actions.setErrors('addEvaluation', processErrors(error.response.data), 'Failed to add an evaluation.'))
  }
}

function* deleteEvaluation(lectureId, evaluationId) {
  try {
    const response = yield call(axios.delete, `ttrs/evaluations/${evaluationId}/`, config)
    console.log('delete evaluation response', response)
    yield call(getEvaluations, lectureId)
  } catch (error) {
    console.log('delete evaluation error', error.response)
    yield put(actions.setErrors('deleteEvaluation', processErrors(error.response.data), 'Failed to delete the evaluation.'))
  }
}

function* modifyEvaluation(lectureId, evaluation) {
  try {
    const response = yield call(axios.patch, `ttrs/evaluations/${evaluation.id}/`, evaluation, config)
    console.log('modify evaluation response', response)
    yield call(getEvaluations, lectureId)
  } catch (error) {
    console.log('modify evaluation error', error.response)
    yield put(actions.setErrors('modifyEvaluation', processErrors(error.response.data), 'Failed to modify an evaluation.'))
  }
}

function* toggleLikeIt(lectureId, isAdd, evaluationId) {
  try {
    if (isAdd) {
      const response = yield call(axios.get, `ttrs/evaluations/${evaluationId}/likeit/`, config)
      console.log('add likeit response', response)
    } else {
      const response = yield call(axios.delete, `ttrs/evaluations/${evaluationId}/likeit/`, config)
      console.log('delete likeit response', response)
    }
    yield call(getEvaluations, lectureId)
  } catch (error) {
    console.log('toggle likeit error', error.response)
    yield put(actions.setErrors('toggleLikeIt', processErrors(error.response.data), `Failed to ${isAdd ? '' : 'un'}like the evaluation.`))
  }
}

function* getRecommendation(options) {
  const params = {
    year,
    semester,
    ...options,
  }
  try {
    const response = yield call(axios.get, updateURLParams('ttrs/recommends/', params), config)
    console.log('getCurrent Recommended TimeTables response', response)
    yield call(getRecommendedTimeTables, response)
  } catch (error) {
    console.log('getCurrent Recommended TimeTables error', error.response)
    yield put(actions.setErrors('getRecommendation', processErrors(error.response.data), 'Failed to get recommendations'))
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
    const { studentInfo } = yield take(actions.SIGN_UP_REQUEST)
    yield call(signUp, studentInfo)
  }
}

function* watchSearchLecture() {
  while (true) {
    const { options } = yield take(actions.SEARCH_LECTURE_REQUEST)
    yield call(searchLecture, options)
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
    const { timeTableId, updatedInfo, deleteLectureId } = yield take(actions.UPDATE_BOOKMARKED_TIME_TABLE_REQUEST)
    yield call(updateBookmarkedTimeTable, timeTableId, updatedInfo, deleteLectureId)
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
    const { receivedTimeTable, timeTableId } = yield take(actions.SELECT_RECEIVED_TIME_TABLE_REQUEST)
    yield call(selectReceivedTimeTable, receivedTimeTable, timeTableId)
  }
}

function* watchSelectRecommendedTimeTable() {
  while (true) {
    const { recommendedTimeTable } = yield take(actions.SELECT_RECOMMENDED_TIME_TABLE_REQUEST)
    yield call(selectRecommendedTimeTable, recommendedTimeTable)
  }
}

function* watchCopyToMyTimeTable() {
  while (true) {
    const { timeTableId } = yield take(actions.COPY_TO_MY_TIME_TABLE_REQUEST)
    yield call(copyToMyTimeTable, timeTableId)
  }
}

function* watchUpdateStudentInfo() {
  while (true) {
    const { info } = yield take(actions.UPDATE_STUDENT_INFO_REQUEST)
    yield call(updateStudentInfo, info)
  }
}

function* watchWithdraw() {
  while (true) {
    yield take(actions.WITHDRAW_REQUEST)
    yield call(withdraw)
  }
}

function* watchDeleteTimeTable() {
  while (true) {
    const { timeTableId, timeTableType, timeTables } = yield take(actions.DELETE_TIME_TABLE_REQUEST)
    yield call(deleteTimeTable, timeTableId, timeTableType, timeTables)
  }
}

function* watchAddToNotRecommends() {
  while (true) {
    const { notRecommends, courseId } = yield take(actions.ADD_TO_NOT_RECOMMENDS_REQUEST)
    yield call(addToNotRecommends, notRecommends, courseId)
  }
}

function* watchDeleteFromNotRecommends() {
  while (true) {
    const { notRecommends, courseId } = yield take(actions.DELETE_FROM_NOT_RECOMMENDS_REQUEST)
    yield call(deleteFromNotRecommends, notRecommends, courseId)
  }
}

function* watchGetNotRecommendCourses() {
  while (true) {
    const { notRecommends } = yield take(actions.GET_NOT_RECOMMEND_COURSES_REQUEST)
    yield call(getNotRecommendCourses, notRecommends)
  }
}

function* watchGetEvaluations() {
  while (true) {
    const { lectureId } = yield take(actions.GET_EVALUATIONS_REQUEST)
    yield call(getEvaluations, lectureId)
  }
}

function* watchAddEvaluation() {
  while (true) {
    const { lectureId, evaluation } = yield take(actions.ADD_EVALUATION_REQUEST)
    yield call(addEvaluation, lectureId, evaluation)
  }
}

function* watchDeleteEvaluation() {
  while (true) {
    const { lectureId, evaluationId } = yield take(actions.DELETE_EVALUATION_REQUEST)
    yield call(deleteEvaluation, lectureId, evaluationId)
  }
}

function* watchModifyEvaluation() {
  while (true) {
    const { lectureId, evaluation } = yield take(actions.MODIFY_EVALUATION_REQUEST)
    yield call(modifyEvaluation, lectureId, evaluation)
  }
}

function* watchToggleLikeIt() {
  while (true) {
    const { lectureId, isAdd, evaluationId } = yield take(actions.TOGGLE_LIKE_IT_REQUEST)
    yield call(toggleLikeIt, lectureId, isAdd, evaluationId)
  }
}

function* watchGetRecommendation() {
  while (true) {
    const { options } = yield take(actions.GET_RECOMMENDATION_REQUEST)
    yield call(getRecommendation, options)
  }
}

export default function* () {
  yield call(getInitialInfo)
  try {
    const info = JSON.parse(localStorage.getItem('STUDENT_INFO'))
    if (info != null) {
      yield call(signIn, info.username, info.password)
    }
  } catch (error) {
    console.log('get student info from local storage error', error)
    localStorage.removeItem('STUDENT_INFO')
  }
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
  yield fork(watchSelectRecommendedTimeTable)
  yield fork(watchCopyToMyTimeTable)
  yield fork(watchUpdateStudentInfo)
  yield fork(watchWithdraw)
  yield fork(watchDeleteTimeTable)
  yield fork(watchAddToNotRecommends)
  yield fork(watchDeleteFromNotRecommends)
  yield fork(watchGetNotRecommendCourses)
  yield fork(watchGetEvaluations)
  yield fork(watchAddEvaluation)
  yield fork(watchDeleteEvaluation)
  yield fork(watchModifyEvaluation)
  yield fork(watchToggleLikeIt)
  yield fork(watchGetRecommendation)

  yield put(actions.loadResponse())
}
