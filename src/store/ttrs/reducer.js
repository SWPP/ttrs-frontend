import { initialState, initialTimeTable } from './selectors'
import * as actions from './actions'

const studentInfo = (state = [], action) => {
  switch (action.type) {
    case actions.SIGN_IN_RESPONSE:
      return {
        ...state,
        ...action.studentInfo,
      }
    case actions.ADD_TO_NOT_RECOMMENDS_RESPONSE:
      return {
        ...state,
        notRecommends: [...action.notRecommends],
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
        majors: [],
      }
    case actions.GET_COLLEGE_LIST:
      return {
        ...state,
        colleges: action.colleges,
        departments: action.colleges[0].departments,
        majors: [],
      }
    case actions.CHANGE_DEPARTMENT_LIST:
      return {
        ...state,
        departments: state.colleges[action.collegeIndex].departments,
        majors: [],
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
  let bookmarkedTimeTables
  let receivedTimeTables
  let lectures
  switch (action.type) {
    case actions.CREATE_MY_TIME_TABLE:
      return {
        ...state,
        myTimeTable: action.myTimeTable,
      }
    case actions.ADD_LECTURE_TO_MY_TIME_TABLE:
      return {
        ...state,
        myTimeTable: {
          ...state.myTimeTable,
          lectures: [
            ...state.myTimeTable.lectures,
            action.newLecture,
          ],
        },
      }
    case actions.UPDATE_MY_TIME_TABLE_INFO:
      return {
        ...state,
        myTimeTable: {
          ...state.myTimeTable,
          ...action.updatedInfo,
        },
      }
    case actions.DELETE_LECTURE_FROM_MY_TIME_TABLE:
      lectures = []
      state.myTimeTable.lectures.forEach((lecture) => {
        if (lecture.id !== action.lectureId) {
          lectures.push(lecture)
        }
      })
      return {
        ...state,
        myTimeTable: {
          ...state.myTimeTable,
          lectures,
        },
      }
    case actions.CREATE_BOOKMARKED_TIME_TABLES:
      return {
        ...state,
        bookmarkedTimeTables: [...action.bookmarkedTimeTables],
        bookmarkedTimeTable: action.bookmarkedTimeTables.length === 0 ? initialTimeTable.bookmarkedTimeTable : action.bookmarkedTimeTables[0],
      }
    case actions.SELECT_BOOKMARKED_TIME_TABLE_RESPONSE:
      return {
        ...state,
        bookmarkedTimeTable: action.bookmarkedTimeTable,
      }
    case actions.UPDATE_BOOKMARKED_TIME_TABLE_INFO:
      bookmarkedTimeTables = [...state.bookmarkedTimeTables]
      bookmarkedTimeTables[action.index] = {
        ...state.bookmarkedTimeTable,
        ...action.updatedInfo,
      }
      return {
        ...state,
        bookmarkedTimeTables: [...bookmarkedTimeTables],
        bookmarkedTimeTable: bookmarkedTimeTables[action.index],
      }
    case actions.BOOKMARK_RESPONSE:
      bookmarkedTimeTables = [...state.bookmarkedTimeTables]
      bookmarkedTimeTables.push(action.bookmarkedTimeTable)
      return {
        ...state,
        bookmarkedTimeTables: [...bookmarkedTimeTables],
        bookmarkedTimeTable: bookmarkedTimeTables.length === 1 ? action.bookmarkedTimeTable : state.bookmarkedTimeTable,
      }
    case actions.DELETE_LECTURE_FROM_BOOKMARKED_TIME_TABLE:
      lectures = []
      state.bookmarkedTimeTable.lectures.forEach((lecture) => {
        if (lecture.id !== action.deleteLectureId) {
          lectures.push(lecture)
        }
      })
      bookmarkedTimeTables = [...state.bookmarkedTimeTables]
      bookmarkedTimeTables[action.index] = {
        ...state.bookmarkedTimeTable,
        lectures,
      }
      return {
        ...state,
        bookmarkedTimeTables: [...bookmarkedTimeTables],
        bookmarkedTimeTable: {
          ...state.bookmarkedTimeTable,
          lectures: [
            ...lectures,
          ],
        },
      }
    case actions.CREATE_RECEIVED_TIME_TABLES:
      return {
        ...state,
        receivedTimeTables: [...action.receivedTimeTables],
        receivedTimeTable: action.receivedTimeTables.length === 0 ? initialTimeTable.receivedTimeTable : action.receivedTimeTables[0],
      }
    case actions.SELECT_RECEIVED_TIME_TABLE_RESPONSE:
      receivedTimeTables = [...state.receivedTimeTables]
      receivedTimeTables[action.index] = {
        ...action.receivedTimeTable,
      }
      return {
        ...state,
        receivedTimeTables: [...receivedTimeTables],
        receivedTimeTable: action.receivedTimeTable,
      }
    case actions.CREATE_RECOMMENDED_TIME_TABLES:
      return {
        ...state,
        recommendedTimeTables: [...action.recommendedTimeTables],
        recommendedTimeTable: action.recommendedTimeTables.length === 0 ? initialTimeTable.recommendedTimeTable : action.recommendedTimeTables[0],
      }
    case actions.SELECT_RECOMMENDED_TIME_TABLE_RESPONSE:
      return {
        ...state,
        recommendedTimeTable: action.recommendedTimeTable,
      }
    case actions.COPY_TO_MY_TIME_TABLE_RESPONSE:
      return {
        ...state,
        myTimeTable: action.myTimeTable,
      }
    case actions.DELETE_MY_TIME_TABLE:
      return {
        ...state,
        myTimeTable: initialTimeTable.myTimeTable,
      }
    case actions.DELETE_BOOKMARKED_TIME_TABLE:
      bookmarkedTimeTables = []
      state.bookmarkedTimeTables.forEach((timeTable) => {
        if (timeTable.id !== action.timeTableId) {
          bookmarkedTimeTables.push(timeTable)
        }
      })
      return {
        ...state,
        bookmarkedTimeTables: [...bookmarkedTimeTables],
        bookmarkedTimeTable: action.timeTable,
      }
    case actions.DELETE_RECEIVED_TIME_TABLE:
      receivedTimeTables = []
      state.receivedTimeTables.forEach((timeTable) => {
        if (timeTable.id !== action.timeTableId) {
          receivedTimeTables.push(timeTable)
        }
      })
      return {
        ...state,
        receivedTimeTables: [...receivedTimeTables],
        receivedTimeTable: action.timeTable,
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
    case actions.GET_SEMESTER_LIST:
      return {
        ...state,
        semesters: action.semesters,
      }
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
        semesters: state.semesters,
      }
    case actions.CHANGE_TAB:
      return {
        ...state,
        currentTab: action.tab,
      }
    case actions.SET_NOT_RECOMMEND_COURSE_NAMES:
      return {
        ...state,
        notRecommendCourseNames: [...action.notRecommendCourseNames],
      }
    default:
      return {
        ...state,
        studentInfo: studentInfo(state.studentInfo, action),
        belongInfo: belongInfo(state.belongInfo, action),
        timeTable: timeTable(state.timeTable, action),
        search: search(state.search, action),
      }
  }
}

export default ttrsReducer
