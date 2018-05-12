export const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
export const SIGNIN_RESPONSE = 'SIGNIN_RESPONSE'
export const GO_SIGNUPPAGE_REQUEST = 'GO_SIGNUPPAGE_REQUEST'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_RESPONSE = 'SIGNUP_RESPONSE'
export const SIGNOUT_REQUEST = 'SIGNOUT_REQUEST'
export const RECOMMENDTAB_REQUEST = 'RECOMMENDTAB_REQUEST'
export const BOOKMARKTAB_REQUEST = 'BOOKMARKTAB_REQUEST'
export const RECEIVEDTAB_REQUEST = 'RECEIVEDTAB_REQUEST'
export const SETTINGTAB_REQUEST = 'SETTINGTAB_REQUEST'
export const MODIFY_MEMO_REQUEST = 'MODIFY_MEMO_REQUEST'
export const MODIFY_TITLE_REQUEST = 'MODIFY_TITLE_REQUEST'
export const GET_COLLEGELIST_RESPONSE = 'GET_COLLEGELIST_RESPONSE'
export const CHANGE_DEPARTMENTLIST_REQUEST = 'CHANGE_DEPARTMENTLIST_REQUEST'
export const CHANGE_MAJORLIST_REQUEST = 'CHANGE_MAJORLIST_REQUEST'


export const signInRequest = (username, password) => {
  return {
    type: SIGNIN_REQUEST,
    username,
    password,
  }
}

export const signInResponse = (studentInfo) => {
  return {
    type: SIGNIN_RESPONSE,
    studentInfo,
  }
}

export const goSignUpPageRequest = () => {
  return {
    type: GO_SIGNUPPAGE_REQUEST,
  }
}

export const signUpRequest = (studentInfo) => {
  return {
    type: SIGNUP_REQUEST,
    studentInfo,
  }
}

export const signUpResponse = (studentInfo) => {
  return {
    type: SIGNUP_RESPONSE,
    studentInfo,
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

export const modifyMemoRequest = (content) => {
  return {
    type: MODIFY_MEMO_REQUEST,
    content,
  }
}

export const modifyTitleRequest = (content) => {
  return {
    type: MODIFY_TITLE_REQUEST,
    content,
  }
}

export const getCollegeListResponse = (colleges) => {
  return {
    type: GET_COLLEGELIST_RESPONSE,
    colleges,
  }
}

export const changeDepartmentListRequest = (collegeIndex) => {
  return {
    type: CHANGE_DEPARTMENTLIST_REQUEST,
    collegeIndex,
  }
}

export const changeMajorListRequest = (departmentIndex) => {
  return {
    type: CHANGE_MAJORLIST_REQUEST,
    departmentIndex,
  }
}
