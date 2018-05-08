import React, { PropTypes } from 'react'
import Button from '../../atoms/Button'

export const SignUp = ({ onSignUp, isSignUpPage }) => {
  let inputUsername
  let inputPassword
  let inputPasswordConfirm
  let inputEmail
  let inputGrade
  const gradeOption = [1, 2, 3, 4];

  const onSubmit = () => {
    if (inputUsername.value.trim() && inputPassword.value.trim() && inputPasswordConfirm.value.trim() && inputEmail.value.trim()) {
      if (inputPassword.value === inputPasswordConfirm.value) {
        console.log(inputGrade.value)
        onSignUp(inputUsername.value, inputPassword.value, inputGrade.value)
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
        <Button type="submit" onClick={onSubmit}>Sign Up</Button>
      </div>
    )
  }
  return null
}

SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  isSignUpPage: PropTypes.bool,
}

export default SignUp
