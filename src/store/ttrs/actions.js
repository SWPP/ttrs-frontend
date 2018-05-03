export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const GO_SIGNUPPAGE_REQUEST = 'GO_SIGNUPPAGE_REQUEST'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNOUT_REQUEST = 'SIGNOUT_REQUEST'
export const RECOMMENDTAB_REQUEST = 'RECOMMENDTAB_REQUEST'
export const BOOKMARKTAB_REQUEST = 'BOOKMARKTAB_REQUEST'
export const RECEIVEDTAB_REQUEST = 'RECEIVEDTAB_REQUEST'
export const SETTINGTAB_REQUEST = 'SETTINGTAB_REQUEST'
export const ADDMEMO_REQUEST = 'ADDMEMO_REQUEST'


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

export const signUpRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  }
}

export const signOutRequest = () => {
  return {
    type: SIGNOUT_REQUEST,
  }
}

export const goRecommendTabRequest = () => {
  return {
    type: RECOMMENDTAB_REQUEST,
  }
}

export const goBookmarkTabRequest = () => {
  return {
    type: BOOKMARKTAB_REQUEST,
  }
}

export const goReceivedTabRequest = () => {
  return {
    type: RECEIVEDTAB_REQUEST,
  }
}

export const goSettingTabRequest = () => {
  return {
    type: SETTINGTAB_REQUEST,
  }
}

let memoId = 0
export const addMemoRequest = (content) => {
  return {
    type: ADDMEMO_REQUEST,
    id: memoId++,
    content,
  }
}
