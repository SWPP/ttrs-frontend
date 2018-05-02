import { initialState } from "./selectors"
import * as actions from './actions'

const ttrsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNIN_RESPONSE:
      return {
        isSignedIn: true,
      }
    default:
      return state
  }
}

export default ttrsReducer
