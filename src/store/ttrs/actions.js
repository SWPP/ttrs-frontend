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
