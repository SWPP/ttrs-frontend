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

export const initialTabs = {
  isRecommendTab: true,
  isBookmarkTab: false,
  isReceivedTab: false,
  isSettingTab: false,
}

export const initialBelongInfo = {
  colleges: [],
  departments: [],
  majors: [],
}

export const initialTimeTable = {
  title: 'write title',
  memo: 'write memo',
  lecturesOfMyTimeTable: [],
}

export const initialSearch = {
  lectures: [],
}

export const initialState = {
  studentInfo: initialStudentInfo,
  tabs: initialTabs,
  belongInfo: initialBelongInfo,
  timeTable: initialTimeTable,
  search: initialSearch,
  isMainPage: false,
  isSignUpPage: false,
}
