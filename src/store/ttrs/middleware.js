import * as actions from './actions'

export const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  const result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

export const saveToken = store => next => action => {
  console.log('saveToken', action.type)
  switch (action.type) {
    case actions.SIGN_IN_RESPONSE:
      localStorage.setItem('STUDENT_INFO', JSON.stringify(action.studentInfo))
      break
    case actions.SIGN_OUT:
      localStorage.removeItem('STUDENT_INFO')
      break
    default:
  }
  const result = next(action)
  return result
}
