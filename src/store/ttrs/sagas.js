import axios from 'axios'
import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from './actions'

axios.defaults.baseURL = 'http://127.0.0.1:8000/'
const config = {}

function* getCollegeList() {
  try {
    const response = yield call(axios.get, 'ttrs/colleges/')
    console.log('getCollegeList response', response)
    yield put(actions.getCollegeListResponse(response.data))
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
    const { email, grade, college, department, major } = response.data
    const notRecommends = response.data.not_recommends
    const myTimeTables = response.data.my_time_tables
    const bookmarkedTimeTables = response.data.bookmarked_time_tables
    const receivedTimeTables = response.data.received_time_tables
    yield put(actions.signInResponse({
      username,
      password,
      email,
      grade,
      college,
      department,
      major,
      notRecommends,
      myTimeTables,
      bookmarkedTimeTables,
      receivedTimeTables,
    }))
  } catch (error) {
    console.log('signIn error', error.response)
  }
}

function* signUp(studentInfo) {
  try {
    const response = yield call(axios.post, 'ttrs/students/signup/', studentInfo)
    console.log('signUp response', response)
    yield put(actions.signUpResponse(studentInfo))
  } catch (error) {
    console.log('signUp error', error.response)
  }
}

function* searchLecture(content) {
  try {
    const response = yield call(axios.get, 'ttrs/lectures/?course__name__contains='+`${content}`, config)
    console.log('searchLecture response', response)
    yield put(actions.searchLectureResponse(response.data))
  } catch (error) {
    console.log('searchLecture error', error.response)
  }
}

function* watchSignInRequest() {
  while (true) {
    const { username, password } = yield take(actions.SIGNIN_REQUEST)
    yield call(signIn, username, password)
  }
}

function* watchSignUpRequest() {
  while (true) {
    const { studentInfo } = yield take(actions.SIGNUP_REQUEST)
    yield call(signUp, studentInfo)
  }
}

function* watchSearchLectureRequest() {
  while (true) {
    const { content } = yield take(actions.SEARCH_LECTURE_REQUEST)
    yield call(searchLecture, content)
  }
}

export default function* () {
  yield call(getCollegeList)
  yield fork(watchSignInRequest)
  yield fork(watchSignUpRequest)
  yield fork(watchSearchLectureRequest)
}
