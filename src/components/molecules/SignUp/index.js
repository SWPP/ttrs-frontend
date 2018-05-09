import React, { PropTypes } from 'react'
import Button from '../../atoms/Button'

export const SignUp = ({ onSignUp, isSignUpPage, collegeList }) => {
  let inputUsername
  let inputPassword
  let inputPasswordConfirm
  let inputEmail
  let inputGrade
  let inputCollege
  const gradeOption = [1, 2, 3, 4];

  const onSubmit = () => {
    if (inputUsername.value.trim() && inputPassword.value.trim() && inputPasswordConfirm.value.trim() && inputEmail.value.trim()) {
      if (inputPassword.value === inputPasswordConfirm.value) {
        console.log('grade = '+inputGrade.value)
        console.log('college = '+inputCollege.value)
        onSignUp(inputUsername.value, inputPassword.value, inputGrade.value, inputCollege.value)
      }
      else {
        console.log('password not coincide')
      }
    }
    else {
      console.log('blank input not allowed')
    }
  }

  if (isSignUpPage) {
    console.log(collegeList)
    return (
      <div>
        <input ref={node => { inputUsername = node }} placeholder={'username'} /> <br />
        <input ref={node => { inputPassword = node }} placeholder={'password'} /> <br />
        <input ref={node => { inputPasswordConfirm = node }} placeholder={'password confirm'} /> <br />
        <input ref={node => { inputEmail = node }} placeholder={'email'} />@snu.ac.kr <br />
        Grade
        <select ref={node => { inputGrade = node }}>
          {gradeOption.map(value =>
            <option
              key={value}
              value={value}
            >{value}</option>
          )}
        </select> <br />
        College
        <select ref={node => { inputCollege = node }}>
          {collegeList.map(value =>
            <option
              key={value.id}
              value={value.id}
            >{value.name}</option>
          )}
        </select> <br />
        <Button type="submit" onClick={onSubmit}>Sign Up</Button>
      </div>
    )
  }
  return null
}

// Maybe will not use
// SignUp.propTypes = {
//   onSignUp: PropTypes.func.isRequired,
//   isSignUpPage: PropTypes.bool,
// }

export default SignUp
