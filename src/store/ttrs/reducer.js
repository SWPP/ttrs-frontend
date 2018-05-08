import { initialState } from "./selectors"
import * as actions from './actions'

const ttrsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNIN_RESPONSE:
      console.log(action.studentInfo)
      console.log('main page')
      return {
        ...state,
        ...action.studentInfo,
        isSignedIn: true,
      }
    case actions.GO_SIGNUPPAGE_REQUEST:
      console.log('sign up page')
      return {
        ...state,
        isSignUpPage: true,
      }
    case actions.SIGNUP_REQUEST:
      console.log('sign up complete')
      console.log(action.studentInfo)
      return {
        ...state,
        isSignUpPage: false,
      }
    case actions.SIGNOUT_REQUEST:
      console.log('sign in page')
      return initialState
    case actions.RECOMMENDTAB_REQUEST:
      console.log('recommend tab')
      return {
        ...state,
        isRecommendTab: true,
      }
    case actions.BOOKMARKTAB_REQUEST:
      console.log('bookmark tab')
      return {
        ...state,
        isBookmarkTab: true,
      }
    case actions.RECEIVEDTAB_REQUEST:
      console.log('received tab')
      return {
        ...state,
        isReceivedTab: true,
      }
    case actions.SETTINGTAB_REQUEST:
      console.log('setting tab')
      return {
        ...state,
        isSettingTab: true,
      }
    case actions.MODIFY_MEMO_REQUEST:
      console.log('modify Memo')
      return {
        ...state,
        memo: action.content,
      }
    case actions.MODIFY_TITLE_REQUEST:
      console.log('modify Title')
      return {
        ...state,
        title: action.content,
      }
    default:
      return state
  }
}

export default ttrsReducer
