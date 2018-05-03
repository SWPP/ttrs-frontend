import React, { PropTypes } from 'react'
import Button from '../../atoms/Button'

export const SignUp = ({ onSignUp, isSignUpPage }) => {
  let inputUsername
  let inputPassword
  let passwordConfirm
  let email
  const onSubmit = () => {
    if (inputUsername.value.trim() && inputPassword.value.trim() && passwordConfirm.value.trim() && email.value.trim()) {
      if (inputPassword.value === passwordConfirm.value) {
        onSignUp()
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
        <input ref={node => { passwordConfirm = node }} placeholder={'password confirm'} /> <br />
        <input ref={node => { email = node }} placeholder={'email'} />@snu.ac.kr <br />
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
