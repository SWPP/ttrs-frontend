import { initialState, RECOMMEND_TAB, BOOKMARK_TAB, RECEIVE_TAB, SETTINGS_TAB } from './selectors'
import * as actions from './actions'

const studentInfo = (state = [], action) => {
  switch (action.type) {
    case actions.SIGN_IN_RESPONSE:
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
    case actions.CLEAR_STATE:
      return {
        ...state,
        colleges: state.colleges,
        departments: state.colleges[0].departments,
        majors: state.colleges[0].departments[0].majors,
      }
    case actions.GET_COLLEGE_LIST:
      return {
        ...state,
        colleges: action.colleges,
        departments: action.colleges[0].departments,
        majors: action.colleges[0].departments[0].majors,
      }
    case actions.CHANGE_DEPARTMENT_LIST:
      return {
        ...state,
        departments: state.colleges[action.collegeIndex].departments,
        majors: state.colleges[action.collegeIndex].departments.length === 0 ? [] : state.colleges[action.collegeIndex].departments[0].majors,
      }
    case actions.CHANGE_MAJOR_LIST:
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
    case actions.GET_MY_TIME_TABLE:
      return {
        ...state,
        myTimeTable: action.myTimeTable
      }
    case actions.ADD_LECTURE_TO_MY_TIME_TABLE:
      console.log('update', action.myTimeTable.id)
      return {
        ...state,
        myTimeTable: {
          ...action.myTimeTable,
          lectures: [
            ...action.myTimeTable.lectures,
            action.newLecture
          ],
        }
      }
    case actions.UPDATE_TITLE_OR_MEMO_OF_MY_TIME_TABLE:
      console.log('update', action.myTimeTable.id)
      return {
        ...state,
        myTimeTable: action.myTimeTable,
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
    case actions.SIGN_IN_RESPONSE:
      return {
        ...state,
        studentInfo: studentInfo(state.studentInfo, action),
        isMainPage: true,
      }
    case actions.GO_SIGN_UP_PAGE:
      return {
        ...state,
        isSignUpPage: true,
      }
    case actions.CLEAR_STATE:
      return {
        ...initialState,
        belongInfo: belongInfo(state.belongInfo, action),
      }
    case actions.GO_RECOMMEND_TAB:
      return {
        ...state,
        currentTab: RECOMMEND_TAB,
      }
    case actions.GO_BOOKMARK_TAB:
      return {
        ...state,
        currentTab: BOOKMARK_TAB,
      }
    case actions.GO_RECEIVE_TAB:
      return {
        ...state,
        currentTab: RECEIVE_TAB,
      }
    case actions.GO_SETTINGS_TAB:
      return {
        ...state,
        currentTab: SETTINGS_TAB,
      }
    case actions.GET_COLLEGE_LIST:
      return {
        ...state,
        belongInfo: belongInfo(state.belongInfo, action),
      }
    case actions.CHANGE_DEPARTMENT_LIST:
      return {
        ...state,
        belongInfo: belongInfo(state.belongInfo, action),
      }
    case actions.CHANGE_MAJOR_LIST:
      return {
        ...state,
        belongInfo: belongInfo(state.belongInfo, action),
      }
    case actions.SEARCH_LECTURE_RESPONSE:
      return {
        ...state,
        search: search(state.search, action),
      }
    case actions.GET_MY_TIME_TABLE:
      return {
        ...state,
        timeTable: timeTable(state.timeTable, action),
      }
    case actions.ADD_LECTURE_TO_MY_TIME_TABLE:
      return {
        ...state,
        timeTable: timeTable(state.timeTable, action),
      }
    case actions.UPDATE_TITLE_OR_MEMO_OF_MY_TIME_TABLE:
      return {
        ...state,
        timeTable: timeTable(state.timeTable, action),
      }
    default:
      return state
  }
}

export default ttrsReducer
