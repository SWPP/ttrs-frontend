export const SIGNIN_RESQUEST = 'SIGNIN_RESQUEST'

export const signInRequest = (username, password) => {
  return {
    type: SIGNIN_RESQUEST,
    username,
    password,
  }
}
