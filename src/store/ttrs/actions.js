export const SET_ERRORS = 'SET_ERRORS'
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_RESPONSE = 'SIGN_IN_RESPONSE'
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_RESPONSE = 'SIGN_UP_RESPONSE'
export const CLEAR_STATE = 'CLEAR_STATE'
export const GET_COLLEGE_LIST = 'GET_COLLEGE_LIST'
export const GET_SEMESTER_LIST = 'GET_SEMESTER_LIST'
export const SEARCH_LECTURE_REQUEST = 'SEARCH_LECTURE_REQUEST'
export const SEARCH_LECTURE_RESPONSE = 'SEARCH_LECTURE_RESPONSE'
export const CREATE_MY_TIME_TABLE = 'CREATE_MY_TIME_TABLE'
export const UPDATE_MY_TIME_TABLE_REQUEST = 'UPDATE_MY_TIME_TABLE_REQUEST'
export const ADD_LECTURE_TO_MY_TIME_TABLE = 'ADD_LECTURE_TO_MY_TIME_TABLE'
export const UPDATE_MY_TIME_TABLE_INFO = 'UPDATE_MY_TIME_TABLE_INFO'
export const DELETE_LECTURE_FROM_MY_TIME_TABLE = 'DELETE_LECTURE_FROM_MY_TIME_TABLE'
export const SWITCH_SEMESTER = 'SWITCH_SEMESTER'
export const CREATE_BOOKMARKED_TIME_TABLES = 'CREATE_BOOKMARKED_TIME_TABLES'
export const SELECT_BOOKMARKED_TIME_TABLE_REQUEST = 'SELECT_BOOKMARKED_TIME_TABLE_REQUEST'
export const SELECT_BOOKMARKED_TIME_TABLE_RESPONSE = 'SELECT_BOOKMARKED_TIME_TABLE_RESPONSE'
export const UPDATE_BOOKMARKED_TIME_TABLE_REQUEST = 'UPDATE_BOOKMARKED_TIME_TABLE_REQUEST'
export const UPDATE_BOOKMARKED_TIME_TABLE_INFO = 'UPDATE_BOOKMARKED_TIME_TABLE_INFO'
export const BOOKMARK_REQUEST = 'BOOKMARK_REQUEST'
export const BOOKMARK_RESPONSE = 'BOOKMARK_RESPONSE'
export const DELETE_LECTURE_FROM_BOOKMARKED_TIME_TABLE = 'DELETE_LECTURE_FROM_BOOKMARKED_TIME_TABLE'
export const SEND_TIME_TABLE = 'SEND_TIME_TABLE'
export const CREATE_RECEIVED_TIME_TABLES = 'CREATE_RECEIVED_TIME_TABLES'
export const SELECT_RECEIVED_TIME_TABLE_REQUEST = 'SELECT_RECEIVED_TIME_TABLE_REQUEST'
export const SELECT_RECEIVED_TIME_TABLE_RESPONSE = 'SELECT_RECEIVED_TIME_TABLE_RESPONSE'
export const CREATE_RECOMMENDED_TIME_TABLES = 'CREATE_RECOMMENDED_TIME_TABLES'
export const SELECT_RECOMMENDED_TIME_TABLE_REQUEST = 'SELECT_RECOMMENDED_TIME_TABLE_REQUEST'
export const SELECT_RECOMMENDED_TIME_TABLE_RESPONSE = 'SELECT_RECOMMENDED_TIME_TABLE_RESPONSE'
export const COPY_TO_MY_TIME_TABLE_REQUEST = 'COPY_TO_MY_TIME_TABLE_REQUEST'
export const COPY_TO_MY_TIME_TABLE_RESPONSE = 'COPY_TO_MY_TIME_TABLE_RESPONSE'
export const UPDATE_STUDENT_INFO_REQUEST = 'UPDATE_STUDENT_INFO_REQUEST'
export const UPDATE_STUDENT_INFO_RESPONSE = 'UPDATE_STUDENT_INFO_RESPONSE'
export const WITHDRAW = 'WITHDRAW'
export const DELETE_TIME_TABLE = 'DELETE_TIME_TABLE'
export const DELETE_MY_TIME_TABLE = 'DELETE_MY_TIME_TABLE'
export const DELETE_BOOKMARKED_TIME_TABLE = 'DELETE_BOOKMARKED_TIME_TABLE'
export const DELETE_RECEIVED_TIME_TABLE = 'DELETE_RECEIVED_TIME_TABLE'
export const ADD_TO_NOT_RECOMMENDS_REQUEST = 'ADD_TO_NOT_RECOMMENDS_REQUEST'
export const ADD_TO_NOT_RECOMMENDS_RESPONSE = 'ADD_TO_NOT_RECOMMENDS_RESPONSE'
export const SET_NOT_RECOMMEND_COURSES = 'SET_NOT_RECOMMEND_COURSE_NAMES'
export const DELETE_FROM_NOT_RECOMMENDS_REQUEST = 'DELETE_FROM_NOT_RECOMMENDS_REQUEST'
export const DELETE_FROM_NOT_RECOMMENDS_RESPONSE = 'DELETE_FROM_NOT_RECOMMENDS_RESPONSE'
export const GET_NOT_RECOMMEND_COURSES_REQUEST = 'GET_NOT_RECOMMEND_COURSES_REQUEST'
export const GET_EVALUATIONS_REQUEST = 'GET_EVALUATIONS_REQUEST'
export const ADD_EVALUATION_REQUEST = 'ADD_EVALUATION_REQUEST'
export const DELETE_EVALUATION_REQUEST = 'DELETE_EVALUATION_REQUEST'
export const MODIFY_EVALUATION_REQUEST = 'MODIFY_EVALUATION_REQUEST'
export const SET_EVALUATIONS_RESPONSE = 'MODIFY_EVALUATIONS_RESPONSE'
export const TOGGLE_LIKE_IT_REQUEST = 'TOGGLE_LIKE_IT_REQUEST'

export const setErrors = (identifier, errors) => {
  return {
    type: SET_ERRORS,
    identifier,
    errors,
  }
}

export const signInRequest = (username, password) => {
  return {
    type: SIGN_IN_REQUEST,
    username,
    password,
  }
}

export const signInResponse = (studentInfo) => {
  return {
    type: SIGN_IN_RESPONSE,
    studentInfo,
  }
}

export const signUpRequest = (studentInfo) => {
  return {
    type: SIGN_UP_REQUEST,
    studentInfo,
  }
}

export const signUpResponse = () => {
  return {
    type: SIGN_UP_RESPONSE,
  }
}

export const clearState = () => {
  return {
    type: CLEAR_STATE,
  }
}

export const getCollegeList = (colleges) => {
  return {
    type: GET_COLLEGE_LIST,
    colleges,
  }
}

export const getSemesterList = (semesters) => {
  return {
    type: GET_SEMESTER_LIST,
    semesters,
  }
}

export const searchLectureRequest = (courseName) => {
  return {
    type: SEARCH_LECTURE_REQUEST,
    courseName,
  }
}

export const searchLectureResponse = (lectures) => {
  return {
    type: SEARCH_LECTURE_RESPONSE,
    lectures,
  }
}

export const createMyTimeTable = (myTimeTable) => {
  return {
    type: CREATE_MY_TIME_TABLE,
    myTimeTable,
  }
}

export const updateMyTimeTableRequest = (myTimeTableId, updatedInfo, newLectureId) => {
  return {
    type: UPDATE_MY_TIME_TABLE_REQUEST,
    myTimeTableId,
    updatedInfo,
    newLectureId,
  }
}

export const addLectureToMyTimeTable = (newLecture) => {
  return {
    type: ADD_LECTURE_TO_MY_TIME_TABLE,
    newLecture,
  }
}

export const updateMyTimeTableInfo = (updatedInfo) => {
  return {
    type: UPDATE_MY_TIME_TABLE_INFO,
    updatedInfo,
  }
}

export const deleteLectureFromMyTimeTable = (lectureId) => {
  return {
    type: DELETE_LECTURE_FROM_MY_TIME_TABLE,
    lectureId,
  }
}

export const switchSemester = (newYear, newSemester) => {
  return {
    type: SWITCH_SEMESTER,
    newYear,
    newSemester,
  }
}

export const createBookmarkedTimeTables = (bookmarkedTimeTables) => {
  return {
    type: CREATE_BOOKMARKED_TIME_TABLES,
    bookmarkedTimeTables,
  }
}

export const selectBookmarkedTimeTableRequest = (bookmarkedTimeTable) => {
  return {
    type: SELECT_BOOKMARKED_TIME_TABLE_REQUEST,
    bookmarkedTimeTable,
  }
}

export const selectBookmarkedTimeTableResponse = (bookmarkedTimeTable) => {
  return {
    type: SELECT_BOOKMARKED_TIME_TABLE_RESPONSE,
    bookmarkedTimeTable,
  }
}

export const updateBookmarkedTimeTableRequest = (index, timeTableId, updatedInfo, deleteLectureId) => {
  return {
    type: UPDATE_BOOKMARKED_TIME_TABLE_REQUEST,
    index,
    timeTableId,
    updatedInfo,
    deleteLectureId,
  }
}

export const updateBookmarkedTimeTableInfo = (index, updatedInfo) => {
  return {
    type: UPDATE_BOOKMARKED_TIME_TABLE_INFO,
    index,
    updatedInfo,
  }
}

export const bookmarkRequest = (timeTableId) => {
  return {
    type: BOOKMARK_REQUEST,
    timeTableId,
  }
}

export const bookmarkResponse = (bookmarkedTimeTable) => {
  return {
    type: BOOKMARK_RESPONSE,
    bookmarkedTimeTable,
  }
}

export const deleteLectureFromBookmarkedTimeTable = (index, deleteLectureId) => {
  return {
    type: DELETE_LECTURE_FROM_BOOKMARKED_TIME_TABLE,
    index,
    deleteLectureId,
  }
}

export const sendTimeTable = (sendInfo) => {
  return {
    type: SEND_TIME_TABLE,
    sendInfo,
  }
}

export const createReceivedTimeTables = (receivedTimeTables) => {
  return {
    type: CREATE_RECEIVED_TIME_TABLES,
    receivedTimeTables,
  }
}

export const selectReceivedTimeTableRequest = (receivedTimeTable, index) => {
  return {
    type: SELECT_RECEIVED_TIME_TABLE_REQUEST,
    receivedTimeTable,
    index,
  }
}

export const selectReceivedTimeTableResponse = (receivedTimeTable, index) => {
  return {
    type: SELECT_RECEIVED_TIME_TABLE_RESPONSE,
    receivedTimeTable,
    index,
  }
}

export const createRecommendedTimeTables = (recommendedTimeTables) => {
  return {
    type: CREATE_RECOMMENDED_TIME_TABLES,
    recommendedTimeTables,
  }
}

export const selectRecommendedTimeTableRequest = (recommendedTimeTable) => {
  return {
    type: SELECT_RECOMMENDED_TIME_TABLE_REQUEST,
    recommendedTimeTable,
  }
}

export const selectRecommendedTimeTableResponse = (recommendedTimeTable) => {
  return {
    type: SELECT_RECOMMENDED_TIME_TABLE_RESPONSE,
    recommendedTimeTable,
  }
}

export const copyToMyTimeTableRequest = (timeTableId) => {
  return {
    type: COPY_TO_MY_TIME_TABLE_REQUEST,
    timeTableId,
  }
}

export const copyToMyTimeTableResponse = (myTimeTable) => {
  return {
    type: COPY_TO_MY_TIME_TABLE_RESPONSE,
    myTimeTable,
  }
}

export const updateStudentInfoRequest = (info) => {
  return {
    type: UPDATE_STUDENT_INFO_REQUEST,
    info,
  }
}

export const updateStudentInfoResponse = (info) => {
  return {
    type: UPDATE_STUDENT_INFO_RESPONSE,
    info,
  }
}

export const withdraw = () => {
  return {
    type: WITHDRAW,
  }
}

export const deleteTimeTable = (timeTableId, timeTableType, timeTables) => {
  return {
    type: DELETE_TIME_TABLE,
    timeTableId,
    timeTableType,
    timeTables,
  }
}

export const deleteMyTimeTable = () => {
  return {
    type: DELETE_MY_TIME_TABLE,
  }
}

export const deleteBookmarkedTimeTable = (timeTableId, timeTable) => {
  return {
    type: DELETE_BOOKMARKED_TIME_TABLE,
    timeTableId,
    timeTable,
  }
}

export const deleteReceivedTimeTable = (timeTableId, timeTable) => {
  return {
    type: DELETE_RECEIVED_TIME_TABLE,
    timeTableId,
    timeTable,
  }
}

export const addToNotRecommendsRequest = (notRecommends, courseId) => {
  return {
    type: ADD_TO_NOT_RECOMMENDS_REQUEST,
    notRecommends,
    courseId,
  }
}

export const addToNotRecommendsResponse = (notRecommends) => {
  return {
    type: ADD_TO_NOT_RECOMMENDS_RESPONSE,
    notRecommends,
  }
}

export const setNotRecommendCourses = (notRecommendCourses) => {
  return {
    type: SET_NOT_RECOMMEND_COURSES,
    notRecommendCourses,
  }
}

export const deleteFromNotRecommendsRequest = (notRecommends, courseId) => {
  return {
    type: DELETE_FROM_NOT_RECOMMENDS_REQUEST,
    notRecommends,
    courseId,
  }
}

export const deleteFromNotRecommendsResponse = (notRecommends) => {
  return {
    type: DELETE_FROM_NOT_RECOMMENDS_RESPONSE,
    notRecommends,
  }
}

export const getNotRecommendCoursesRequest = (notRecommends) => {
  return {
    type: GET_NOT_RECOMMEND_COURSES_REQUEST,
    notRecommends,
  }
}

export const getEvaluationsRequest = (lectureId) => {
  return {
    type: GET_EVALUATIONS_REQUEST,
    lectureId,
  }
}

export const addEvaluationRequest = (lectureId, evaluation) => {
  return {
    type: ADD_EVALUATION_REQUEST,
    lectureId,
    evaluation,
  }
}

export const deleteEvaluationRequest = (lectureId, evaluationId) => {
  return {
    type: DELETE_EVALUATION_REQUEST,
    lectureId,
    evaluationId,
  }
}

export const modifyEvaluationRequest = (lectureId, evaluation) => {
  return {
    type: MODIFY_EVALUATION_REQUEST,
    lectureId,
    evaluation,
  }
}

export const setEvaluationsResponse = (evaluations, lectureDetail) => {
  return {
    type: SET_EVALUATIONS_RESPONSE,
    evaluations,
    lectureDetail,
  }
}

export const toggleLikeItRequest = (lectureId, isAdd, evaluationId) => {
  return {
    type: TOGGLE_LIKE_IT_REQUEST,
    lectureId,
    isAdd,
    evaluationId,
  }
}
