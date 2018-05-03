import { initialState } from "./selectors"
import * as actions from './actions'

const ttrsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNIN_REQUEST:
      console.log('username: ', action.username)
      console.log('password: ', action.password)
      console.log('main page')
      return {
        ...state,
        username: action.username,
        password: action.password,
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
    case actions.ADDMEMO_REQUEST:
      return {
        ...state,
        memoList: [
          ...state.memoList,
          action.content,
        ]
      }
    default:
      return state
  }
}

export default ttrsReducer
