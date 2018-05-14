import { initialState, RECOMMEND_TAB, BOOKMARK_TAB, RECEIVE_TAB, SETTINGS_TAB } from './selectors'
import * as actions from './actions'

const studentInfo = (state = [], action) => {
  switch (action.type) {
    case actions.SIGNIN_RESPONSE:
      return {
        ...state,
        ...action.studentInfo,
      }
    default:
      return state
  }
}

const belongInfo = (state = [], action) => {
  switch (action.type) {
    case actions.CLEAR_STATE_REQUEST:
      return {
        ...state,
        colleges: state.colleges,
        departments: state.colleges[0].departments,
        majors: state.colleges[0].departments[0].majors,
      }
    case actions.GET_COLLEGELIST_RESPONSE:
      return {
        ...state,
        colleges: action.colleges,
        departments: action.colleges[0].departments,
        majors: action.colleges[0].departments[0].majors,
      }
    case actions.CHANGE_DEPARTMENTLIST_REQUEST:
      return {
        ...state,
        departments: state.colleges[action.collegeIndex].departments,
        majors: state.colleges[action.collegeIndex].departments.length === 0 ? [] : state.colleges[action.collegeIndex].departments[0].majors,
      }
    case actions.CHANGE_MAJORLIST_REQUEST:
      return {
        ...state,
        majors: action.departmentIndex === '' ? [] : state.departments[action.departmentIndex].majors,
      }
    default:
      return state
  }
}

const timeTable = (state = [], action) => {
  switch (action.type) {
    case actions.MODIFY_MEMO_REQUEST:
      return {
        ...state,
        myTimeTable: {
          ...state.myTimeTable,
          memo: action.content,
        },
      }
    case actions.MODIFY_TITLE_REQUEST:
      return {
        ...state,
        myTimeTable: {
          ...state.myTimeTable,
          title: action.content,
        },
      }
    case actions.GET_MYTIMETABLE_RESPONSE:
      return {
        ...state,
        myTimeTable: {
          ...state.myTimeTable,
          lectures: action.lectures,
        },
      }
    case actions.ADD_LECTURE_TO_MY_TIMETABLE_RESPONSE:
      return {
        ...state,
        myTimeTable: {
          ...state.myTimeTable,
          lectures: [
            ...state.myTimeTable.lectures,
            action.lecture,
          ],
        },
      }
    default:
      return state
  }
}

const search = (state = [], action) => {
  switch (action.type) {
    case actions.SEARCH_LECTURE_RESPONSE:
      return {
        ...state,
        lectures: action.lectures,
      }
    default:
      return state
  }
}

const ttrsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNIN_RESPONSE:
      return {
        ...state,
        studentInfo: studentInfo(state.studentInfo, action),
        isMainPage: true,
      }
    case actions.GO_SIGNUPPAGE_REQUEST:
      return {
        ...state,
        isSignUpPage: true,
      }
    case actions.CLEAR_STATE_REQUEST:
      return {
        ...initialState,
        belongInfo: belongInfo(state.belongInfo, action),
      }
    case actions.RECOMMENDTAB_REQUEST:
      return {
        ...state,
        currentTab: RECOMMEND_TAB,
      }
    case actions.BOOKMARKTAB_REQUEST:
      return {
        ...state,
        currentTab: BOOKMARK_TAB,
      }
    case actions.RECEIVETAB_REQUEST:
      return {
        ...state,
        currentTab: RECEIVE_TAB,
      }
    case actions.SETTINGSTAB_REQUEST:
      return {
        ...state,
        currentTab: SETTINGS_TAB,
      }
    case actions.MODIFY_MEMO_REQUEST:
      return {
        ...state,
        timeTable: timeTable(state.timeTable, action),
      }
    case actions.MODIFY_TITLE_REQUEST:
      return {
        ...state,
        timeTable: timeTable(state.timeTable, action),
      }
    case actions.GET_COLLEGELIST_RESPONSE:
      return {
        ...state,
        belongInfo: belongInfo(state.belongInfo, action),
      }
    case actions.CHANGE_DEPARTMENTLIST_REQUEST:
      return {
        ...state,
        belongInfo: belongInfo(state.belongInfo, action),
      }
    case actions.CHANGE_MAJORLIST_REQUEST:
      return {
        ...state,
        belongInfo: belongInfo(state.belongInfo, action),
      }
    case actions.SEARCH_LECTURE_RESPONSE:
      return {
        ...state,
        search: search(state.search, action),
      }
    case actions.GET_MYTIMETABLE_RESPONSE:
      return {
        ...state,
        timeTable: timeTable(state.timeTable, action),
      }
    case actions.ADD_LECTURE_TO_MY_TIMETABLE_RESPONSE:
      return {
        ...state,
        timeTable: timeTable(state.timeTable, action),
      }
    default:
      return state
  }
}

export default ttrsReducer
