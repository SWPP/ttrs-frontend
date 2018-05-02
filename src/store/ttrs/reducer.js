import { initialState } from "./selectors"
import * as actions from './actions'

const ttrsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNIN_RESQUEST:
      console.log('username: ', action.username)
      console.log('password: ', action.password)
      return {
        username: action.username,
        password: action.password,
        isSignedIn: true,
      }
    default:
      return state
  }
}

export default ttrsReducer
