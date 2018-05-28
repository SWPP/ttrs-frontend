export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_RESPONSE = 'SIGN_IN_RESPONSE'
export const GO_SIGN_UP_PAGE = 'GO_SIGN_UP_PAGE'
export const SIGN_UP = 'SIGN_UP'
export const CLEAR_STATE = 'CLEAR_STATE'
export const CHANGE_TAB = 'CHANGE_TAB'
export const GET_COLLEGE_LIST = 'GET_COLLEGE_LIST'
export const GET_SEMESTER_LIST = 'GET_SEMESTER_LIST'
export const CHANGE_DEPARTMENT_LIST = 'CHANGE_DEPARTMENT_LIST'
export const CHANGE_MAJOR_LIST = 'CHANGE_MAJOR_LIST'
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
export const COPY_TO_MY_TIME_TABLE_REQUEST = 'COPY_TO_MY_TIME_TABLE_REQUEST'
export const COPY_TO_MY_TIME_TABLE_RESPONSE = 'COPY_TO_MY_TIME_TABLE_RESPONSE'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const WITHDRAW = 'WITHDRAW'
export const DELETE_TIME_TABLE = 'DELETE_TIME_TABLE'
export const DELETE_MY_TIME_TABLE = 'DELETE_MY_TIME_TABLE'


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

export const goSignUpPage = () => {
  return {
    type: GO_SIGN_UP_PAGE,
  }
}

export const signUp = (studentInfo) => {
  return {
    type: SIGN_UP,
    studentInfo,
  }
}

export const clearState = () => {
  return {
    type: CLEAR_STATE,
  }
}

export const changeTab = (tab) => {
  return {
    type: CHANGE_TAB,
    tab,
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

export const changeDepartmentList = (collegeIndex) => {
  return {
    type: CHANGE_DEPARTMENT_LIST,
    collegeIndex,
  }
}

export const changeMajorList = (departmentIndex) => {
  return {
    type: CHANGE_MAJOR_LIST,
    departmentIndex,
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

export const changePassword = (password) => {
  return {
    type: CHANGE_PASSWORD,
    password,
  }
}

export const withdraw = () => {
  return {
    type: WITHDRAW,
  }
}

export const deleteTimeTable = (timeTableId, timeTableType) => {
  return {
    type: DELETE_TIME_TABLE,
    timeTableId,
    timeTableType,
  }
}

export const deleteMyTimeTable = () => {
  return {
    type: DELETE_MY_TIME_TABLE,
  }
}
