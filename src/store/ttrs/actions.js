export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const GO_SIGNUPPAGE_REQUEST = 'GO_SIGNUPPAGE_REQUEST'

export const signInRequest = (username, password) => {
  return {
    type: SIGNIN_REQUEST,
    username,
    password,
  }
}

export const goSignUpPageRequest = () => {
  return {
    type: GO_SIGNUPPAGE_REQUEST,
  }
}
