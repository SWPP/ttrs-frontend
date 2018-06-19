import * as actions from './actions'

export const logger = store => next => action => {
  console.log('\n')
  console.group(action.type)
  console.info('dispatching', action)
  const result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

export const saveToken = store => next => action => {
  switch (action.type) {
    case actions.SIGN_IN_RESPONSE:
    case actions.UPDATE_STUDENT_INFO_RESPONSE:
      localStorage.setItem('STUDENT_INFO', JSON.stringify(action.studentInfo))
      break
    case actions.SIGN_OUT:
    case actions.WITHDRAW_RESPONSE:
      localStorage.removeItem('STUDENT_INFO')
      localStorage.removeItem('SEMESTER')
      break
    case actions.SWITCH_SEMESTER_RESPONSE:
      localStorage.setItem('SEMESTER', JSON.stringify({ year: action.year, semester: action.semester }))
      break
    case actions.SET_ERRORS:
      if (actions.identifier === 'switchSemester') {
        localStorage.removeItem('SEMESTER')
      }
      break
    default:
  }
  const result = next(action)
  return result
}
