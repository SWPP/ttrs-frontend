import { initialState, initialTimeTable, initialError, initialSearch, initialNotice, initialStudentInfo, initialLoading } from './selectors'
import * as actions from './actions'

const studentInfo = (state = [], action) => {
  switch (action.type) {
    case actions.WITHDRAW_RESPONSE:
      return initialStudentInfo
    case actions.SIGN_IN_RESPONSE:
      return {
        ...state,
        ...action.studentInfo,
      }
    case actions.UPDATE_STUDENT_INFO_RESPONSE:
      return {
        ...state,
        ...action.info,
      }
    case actions.ADD_TO_NOT_RECOMMENDS_RESPONSE:
      return {
        ...state,
        notRecommends: [...action.notRecommends],
      }
    case actions.DELETE_FROM_NOT_RECOMMENDS_RESPONSE:
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
    case actions.GET_COLLEGE_LIST:
      return {
        colleges: action.colleges,
      }
    default:
      return state
  }
}

const timeTable = (state = [], action) => {
  let bookmarkedTimeTables
  let bookmarkedTimeTable
  let receivedTimeTables
  let lectures
  let creditSum
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
    case actions.DELETE_LECTURE_FROM_MY_TIME_TABLE_RESPONSE:
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
    case actions.ADD_LECTURE_TO_BOOKMARKED_TIME_TABLE:
      bookmarkedTimeTables = [...state.bookmarkedTimeTables]
      bookmarkedTimeTables.forEach((timeTable, index) => {
        if (timeTable.id === action.timeTableId) {
          bookmarkedTimeTables[index] = {
            ...state.bookmarkedTimeTable,
            lectures: [
              ...state.bookmarkedTimeTable.lectures,
              action.newLecture,
            ],
            creditSum: state.bookmarkedTimeTable.creditSum + action.newLecture.course.credit,
          }
          bookmarkedTimeTable = bookmarkedTimeTables[index]
        }
      })
      return {
        ...state,
        bookmarkedTimeTables: [...bookmarkedTimeTables],
        bookmarkedTimeTable,
      }
    case actions.UPDATE_BOOKMARKED_TIME_TABLE_INFO:
      bookmarkedTimeTables = [...state.bookmarkedTimeTables]
      bookmarkedTimeTables.forEach((timeTable, index) => {
        if (timeTable.id === action.timeTableId) {
          bookmarkedTimeTables[index] = {
            ...state.bookmarkedTimeTable,
            ...action.updatedInfo,
          }
          bookmarkedTimeTable = bookmarkedTimeTables[index]
        }
      })
      return {
        ...state,
        bookmarkedTimeTables: [...bookmarkedTimeTables],
        bookmarkedTimeTable,
      }
    case actions.BOOKMARK_RESPONSE:
      bookmarkedTimeTables = [...state.bookmarkedTimeTables]
      bookmarkedTimeTables.push(action.bookmarkedTimeTable)
      return {
        ...state,
        bookmarkedTimeTables: [...bookmarkedTimeTables],
        bookmarkedTimeTable: bookmarkedTimeTables.length === 1 ? action.bookmarkedTimeTable : state.bookmarkedTimeTable,
      }
    case actions.DELETE_LECTURE_FROM_BOOKMARKED_TIME_TABLE_RESPONSE:
      lectures = []
      creditSum = state.bookmarkedTimeTable.creditSum
      state.bookmarkedTimeTable.lectures.forEach((lecture) => {
        if (lecture.id !== action.deleteLectureId) {
          lectures.push(lecture)
        } else {
          creditSum -= lecture.course.credit
        }
      })
      bookmarkedTimeTables = [...state.bookmarkedTimeTables]
      bookmarkedTimeTables.forEach((timeTable, index) => {
        if (timeTable.id === action.timeTableId) {
          bookmarkedTimeTables[index] = {
            ...state.bookmarkedTimeTable,
            lectures,
            creditSum,
          }
        }
      })
      return {
        ...state,
        bookmarkedTimeTables: [...bookmarkedTimeTables],
        bookmarkedTimeTable: {
          ...state.bookmarkedTimeTable,
          lectures: [
            ...lectures,
          ],
          creditSum,
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
      receivedTimeTables.forEach((timeTable, index) => {
        if (timeTable.id === action.timeTableId) {
          receivedTimeTables[index] = {
            ...action.receivedTimeTable,
          }
        }
      })
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
    case actions.DELETE_MY_TIME_TABLE_RESPONSE:
      return {
        ...state,
        myTimeTable: initialTimeTable.myTimeTable,
      }
    case actions.DELETE_BOOKMARKED_TIME_TABLE_RESPONSE:
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
    case actions.DELETE_RECEIVED_TIME_TABLE_RESPONSE:
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
  let lectures = []
  switch (action.type) {
    case actions.SEARCH_LECTURE_RESPONSE:
      return {
        ...state,
        lectures: action.lectures,
        count: action.count,
      }
    case actions.SET_EVALUATIONS_RESPONSE:
      lectures = state.lectures
      lectures.forEach((lecture, index) => {
        if (lecture.id === action.lectureDetail.id) {
          lectures[index] = action.lectureDetail
        }
      })
      return {
        ...state,
        lectures: [...lectures],
      }
    case actions.CLEAR_SEARCH_LECTURE:
      return initialSearch
    default:
      return state
  }
}

const error = (state = initialError, action) => {
  switch (action.type) {
    case actions.CLEAR_STATE:
      return initialError
    case actions.SET_ERRORS:
      return {
        ...state,
        [action.identifier]: action.errors,
      }
    default:
      return state
  }
}

const newNotice = (state, newId, message = undefined) => {
  return {
    lastId: Math.abs(newId),
    notices: [
      ...state.notices,
      {
        id: newId,
        message,
      },
    ],
  }
}

const notice = (state = initialNotice, action) => {
  const newId = state.lastId + 1
  const notices = []
  switch (action.type) {
    case actions.DISMISS_NOTICE:
      state.notices.forEach(notice => {
        if (notice.id !== action.id) {
          notices.push(notice)
        }
      })
      return {
        ...state,
        notices,
      }
    case actions.HIDE_NOTICE:
      return {
        ...state,
        notices: state.notices.map(notice => ({
          ...notice,
          invisible: notice.id === action.id ? true : notice.invisible,
        })),
      }
    case actions.SIGN_UP_RESPONSE:
      return newNotice(state, newId, 'You have successfully joined the membership.')
    case actions.UPDATE_STUDENT_INFO_RESPONSE:
    case actions.UPDATE_MY_TIME_TABLE_INFO:
    case actions.UPDATE_BOOKMARKED_TIME_TABLE_INFO:
      return newNotice(state, newId)
    case actions.WITHDRAW_RESPONSE:
      return newNotice(state, newId, 'You have successfully withdrawn the membership.')
    case actions.ADD_LECTURE_TO_MY_TIME_TABLE:
    case actions.ADD_LECTURE_TO_BOOKMARKED_TIME_TABLE:
      return newNotice(state, newId, 'Added successfully.')
    case actions.DELETE_MY_TIME_TABLE_RESPONSE:
    case actions.DELETE_BOOKMARKED_TIME_TABLE_RESPONSE:
    case actions.DELETE_RECEIVED_TIME_TABLE_RESPONSE:
    case actions.DELETE_LECTURE_FROM_MY_TIME_TABLE_RESPONSE:
    case actions.DELETE_LECTURE_FROM_BOOKMARKED_TIME_TABLE_RESPONSE:
      return newNotice(state, newId, 'Deleted successfully.')
    case actions.ADD_TO_NOT_RECOMMENDS_RESPONSE:
      return newNotice(state, newId, 'The course won\'t be recommended.')
    case actions.COPY_TO_MY_TIME_TABLE_RESPONSE:
      return newNotice(state, newId, 'Copied to mine successfully.')
    case actions.BOOKMARK_RESPONSE:
      return newNotice(state, newId, 'Bookmarked successfully.')
    case actions.SEND_TIME_TABLE:
      return newNotice(state, newId, 'Sent successfully.')
    case actions.DELETE_FROM_NOT_RECOMMENDS_RESPONSE:
      return newNotice(state, newId, 'Allowed successfully.')
    case actions.SEND_TO_DEVELOPER_RESPONSE:
      return newNotice(state, newId, 'Sent successfully.')
    case actions.SET_ERRORS:
      if (action.message) {
        return newNotice(state, -newId, action.message)
      }
      return (Object.keys(action.errors.bools).length > 0 || Object.keys(action.errors.texts).length > 0)
        ? newNotice(state, -newId)
        : state
    default:
      return state
  }
}

const loading = (state = [], action) => {
  switch (action.type) {
    case actions.SIGN_IN_REQUEST:
      return {
        ...state,
        myTimeTableLoading: true,
        bookmarkedTimeTableLoading: true,
        receivedTimeTableLoading: true,
      }
    case actions.SWITCH_SEMESTER:
      return {
        ...state,
        myTimeTableLoading: true,
        bookmarkedTimeTableLoading: true,
        receivedTimeTableLoading: true,
      }
    case actions.CREATE_MY_TIME_TABLE:
      return {
        ...state,
        myTimeTableLoading: false,
      }
    case actions.CREATE_BOOKMARKED_TIME_TABLES:
      return {
        ...state,
        bookmarkedTimeTableLoading: false,
      }
    case actions.CREATE_RECEIVED_TIME_TABLES:
      return {
        ...state,
        receivedTimeTableLoading: false,
      }
    case actions.GET_RECOMMENDATION_REQUEST:
      return {
        ...state,
        recommendedTimeTableLoading: true,
      }
    case actions.CREATE_RECOMMENDED_TIME_TABLES:
      return {
        ...state,
        recommendedTimeTableLoading: false,
      }
    case actions.SELECT_RECOMMENDED_TIME_TABLE_REQUEST:
      return {
        ...state,
        recommendedTimeTableLoading: true,
      }
    case actions.SELECT_RECOMMENDED_TIME_TABLE_RESPONSE:
      return {
        ...state,
        recommendedTimeTableLoading: false,
      }
    case actions.GET_NOT_RECOMMEND_COURSES_REQUEST:
      return {
        ...state,
        notRecommendsLoading: true,
      }
    case actions.SET_NOT_RECOMMEND_COURSES:
      return {
        ...state,
        notRecommendsLoading: false,
      }
    case actions.GET_EVALUATIONS_REQUEST:
      return {
        ...state,
        evaluationsLoading: true,
      }
    case actions.SET_EVALUATIONS_RESPONSE:
      return {
        ...state,
        evaluationsLoading: false,
      }
    case actions.SEARCH_LECTURE_REQUEST:
      return {
        ...state,
        searchLectureLoading: true,
      }
    case actions.SEARCH_LECTURE_RESPONSE:
      return {
        ...state,
        searchLectureLoading: false,
      }
    case actions.UPDATE_MY_TIME_TABLE_REQUEST:
      return {
        ...state,
        myTimeTableLoading: true,
      }
    case actions.ADD_LECTURE_TO_MY_TIME_TABLE:
      return {
        ...state,
        myTimeTableLoading: false,
      }
    case actions.UPDATE_MY_TIME_TABLE_INFO:
      return {
        ...state,
        myTimeTableLoading: false,
      }
    case actions.DELETE_LECTURE_FROM_MY_TIME_TABLE_RESPONSE:
      return {
        ...state,
        myTimeTableLoading: false,
      }
    case actions.SELECT_BOOKMARKED_TIME_TABLE_REQUEST:
      return {
        ...state,
        bookmarkedTimeTableLoading: true,
      }
    case actions.UPDATE_BOOKMARKED_TIME_TABLE_REQUEST:
      return {
        ...state,
        bookmarkedTimeTableLoading: true,
      }
    case actions.BOOKMARK_REQUEST:
      return {
        ...state,
        bookmarkedTimeTableLoading: true,
      }
    case actions.SELECT_BOOKMARKED_TIME_TABLE_RESPONSE:
      return {
        ...state,
        bookmarkedTimeTableLoading: false,
      }
    case actions.ADD_LECTURE_TO_BOOKMARKED_TIME_TABLE:
      return {
        ...state,
        bookmarkedTimeTableLoading: false,
      }
    case actions.UPDATE_BOOKMARKED_TIME_TABLE_INFO:
      return {
        ...state,
        bookmarkedTimeTableLoading: false,
      }
    case actions.BOOKMARK_RESPONSE:
      return {
        ...state,
        bookmarkedTimeTableLoading: false,
      }
    case actions.DELETE_LECTURE_FROM_BOOKMARKED_TIME_TABLE_RESPONSE:
      return {
        ...state,
        bookmarkedTimeTableLoading: false,
      }
    case actions.SELECT_RECEIVED_TIME_TABLE_REQUEST:
      return {
        ...state,
        receivedTimeTableLoading: true,
      }
    case actions.SELECT_RECEIVED_TIME_TABLE_RESPONSE:
      return {
        ...state,
        receivedTimeTableLoading: false,
      }
    case actions.COPY_TO_MY_TIME_TABLE_REQUEST:
      return {
        ...state,
        myTimeTableLoading: true,
      }
    case actions.COPY_TO_MY_TIME_TABLE_RESPONSE:
      return {
        ...state,
        myTimeTableLoading: false,
      }
    case actions.UPDATE_STUDENT_INFO_REQUEST:
      return {
        ...state,
        updateProfileLoading: true,
      }
    case actions.UPDATE_STUDENT_INFO_RESPONSE:
      return {
        ...state,
        updateProfileLoading: false,
      }
    case actions.DELETE_TIME_TABLE_REQUEST:
      return {
        ...state,
        myTimeTableLoading: true,
        bookmarkedTimeTableLoading: true,
        receivedTimeTableLoading: true,
      }
    case actions.DELETE_MY_TIME_TABLE_RESPONSE:
      return {
        ...state,
        myTimeTableLoading: false,
        bookmarkedTimeTableLoading: false,
        receivedTimeTableLoading: false,
      }
    case actions.DELETE_BOOKMARKED_TIME_TABLE_RESPONSE:
      return {
        ...state,
        myTimeTableLoading: false,
        bookmarkedTimeTableLoading: false,
        receivedTimeTableLoading: false,
      }
    case actions.DELETE_RECEIVED_TIME_TABLE_RESPONSE:
      return {
        ...state,
        myTimeTableLoading: false,
        bookmarkedTimeTableLoading: false,
        receivedTimeTableLoading: false,
      }
    case actions.DELETE_FROM_NOT_RECOMMENDS_REQUEST:
      return {
        ...state,
        notRecommendsLoading: true,
      }
    case actions.DELETE_FROM_NOT_RECOMMENDS_RESPONSE:
      return {
        ...state,
        notRecommendsLoading: false,
      }
    case actions.ADD_EVALUATION_REQUEST:
      return {
        ...state,
        evaluationsLoading: true,
      }
    case actions.DELETE_EVALUATION_REQUEST:
      return {
        ...state,
        evaluationsLoading: true,
      }
    case actions.MODIFY_EVALUATION_REQUEST:
      return {
        ...state,
        evaluationsLoading: true,
      }
    case actions.TOGGLE_LIKE_IT_REQUEST:
      return {
        ...state,
        evaluationsLoading: true,
      }
    case actions.SET_ERRORS:
      return initialLoading
    default:
      return state
  }
}

const ttrsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOAD_RESPONSE:
      return {
        ...state,
        loaded: true,
      }
    case actions.GET_SEMESTER_LIST:
      return {
        ...state,
        semesters: action.semesters,
      }
    case actions.SIGN_IN_RESPONSE:
      return {
        ...state,
        studentInfo: studentInfo(state.studentInfo, action),
        toGo: 'home',
        notice: notice(state.notice, action),
        loading: loading(state.loading, action),
      }
    case actions.SIGN_UP_RESPONSE:
      return {
        ...state,
        toGo: 'signIn',
        notice: notice(state.notice, action),
      }
    case actions.WITHDRAW_RESPONSE:
      return {
        ...state,
        toGo: 'signIn',
        studentInfo: studentInfo(state.notice, action),
        notice: notice(state.notice, action),
      }
    case actions.CLEAR_STATE:
      return {
        ...initialState,
        loaded: state.loaded,
        belongInfo: belongInfo(state.belongInfo, action),
        semesters: state.semesters,
      }
    case actions.SET_NOT_RECOMMEND_COURSES:
      return {
        ...state,
        notRecommendCourses: action.notRecommendCourses,
        loading: loading(state.loading, action),
      }
    case actions.SET_EVALUATIONS_RESPONSE:
      return {
        ...state,
        evaluations: action.evaluations,
        lectureDetail: action.lectureDetail,
        search: search(state.search, action),
        loading: loading(state.loading, action),
      }
    case actions.SET_FIELDS_AND_TYPES:
      return {
        ...state,
        fields: action.fields,
        types: action.types,
      }
    default:
      return {
        ...state,
        studentInfo: studentInfo(state.studentInfo, action),
        belongInfo: belongInfo(state.belongInfo, action),
        timeTable: timeTable(state.timeTable, action),
        search: search(state.search, action),
        error: error(state.error, action),
        notice: notice(state.notice, action),
        loading: loading(state.loading, action),
      }
  }
}

export default ttrsReducer
