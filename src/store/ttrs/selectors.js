export const initialStudentInfo = {
  id: null,
  username: null,
  password: null,
  email: null,
  grade: null,
  college: null,
  department: null,
  major: null,
  notRecommends: [],
  myTimeTables: [],
  bookmarkedTimeTables: [],
  receivedTimeTables: [],
}

export const initialBelongInfo = {
  colleges: [],
}

export const initialTimeTable = {
  myTimeTable: {
    id: null,
    title: '',
    memo: '',
    lectures: [],
  },
  bookmarkedTimeTable: {
    id: null,
    title: '',
    memo: '',
    lectures: [],
  },
  bookmarkedTimeTables: [],
  receivedTimeTable: {
    id: null,
    title: '',
    memo: '',
    lectures: [],
    sender: null,
    receivedAt: null,
  },
  receivedTimeTables: [],
  recommendedTimeTable: {
    id: null,
    title: '',
    memo: '',
    lectures: [],
  },
  recommendedTimeTables: [],
}

export const initialSearch = {
  lectures: [],
}

export const initialError = {
  signIn: {},
  signUp: {},
}

export const initialState = {
  studentInfo: initialStudentInfo,
  belongInfo: initialBelongInfo,
  timeTable: initialTimeTable,
  search: initialSearch,
  error: initialError,
  toHome: false,
  toSignIn: false,
  semesters: [],
  year: null,
  semester: null,
  notRecommendCourses: [],
}
