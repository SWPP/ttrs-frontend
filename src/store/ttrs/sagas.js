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
  const hash = new Buffer(`${username}:${password}`).toString('base64')
  config.headers = { Authorization: `Basic ${hash}` }
  try {
    const response = yield call(axios.get, 'ttrs/students/my/', config)
    console.log('signIn response', response)
    yield put(actions.signInResponse(response.data))
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
