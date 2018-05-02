import { initialState } from "./selectors"
import * as actions from './actions'

const ttrsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNIN_REQUEST:
      console.log('username: ', action.username)
      console.log('password: ', action.password)
      console.log('main page')
      return {
        username: action.username,
        password: action.password,
        isSignedIn: true,
      }
    case actions.GO_SIGNUPPAGE_REQUEST:
      console.log('sign up page')
      return {
        isSignUpPage: true,
      }
    case actions.SIGNUP_REQUEST:
      console.log('sign up complete')
      return {
        isSignUpPage: false,
      }
    default:
      return state
  }
}

export default ttrsReducer
