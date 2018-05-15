export const initialStudentInfo = {
  username: undefined,
  password: undefined,
  email: undefined,
  grade: undefined,
  college: undefined,
  department: undefined,
  major: undefined,
  notRecommends: [],
  myTimeTables: [],
  bookmarkedTimeTables: [],
  receivedTimeTables: [],
}

export const initialBelongInfo = {
  colleges: [],
  departments: [],
  majors: [],
}

export const initialTimeTable = {
  myTimeTable: {
    id: undefined,
    title: '',
    memo: '',
    lectures: [],
  },
}

export const initialSearch = {
  lectures: [],
}

export const RECOMMEND_TAB = 0
export const BOOKMARK_TAB = 1
export const RECEIVE_TAB = 2
export const SETTINGS_TAB = 3

export const initialState = {
  studentInfo: initialStudentInfo,
  belongInfo: initialBelongInfo,
  timeTable: initialTimeTable,
  search: initialSearch,
  isMainPage: false,
  isSignUpPage: false,
  currentTab: RECOMMEND_TAB,
}
