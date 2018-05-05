import React, { PropTypes } from 'react'
import Button from '../../atoms/Button'

export const SignIn = ({ onSignIn, onGoSignUpPage, isSignedIn, isSignUpPage }) => {
  let inputUsername
  let inputPassword
  const onSubmitSignIn = () => {
    if (inputUsername.value.trim() && inputPassword.value.trim()) {
      onSignIn(inputUsername.value, inputPassword.value)
      inputUsername.value = ''
      inputPassword.value = ''
    }
    else {
      console.log('blank input not allowed')
    }
  }

  const onSubmitSignUp = () => {
    onGoSignUpPage()
  }

  if (!isSignedIn && !isSignUpPage) {
    return (
      <div>
        <input ref={node => { inputUsername = node }} placeholder={'username'} /> <br />
        <input ref={node => { inputPassword = node }} placeholder={'password'} /> <br />
        <Button type="submit" onClick={onSubmitSignIn}>Sign In</Button> <br />
        <Button type="submit" onClick={onSubmitSignUp}>Sign Up</Button>
      </div>
    )
  }
  return null
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onGoSignUpPage: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
  isSignUpPage: PropTypes.bool,
}

export default SignIn
