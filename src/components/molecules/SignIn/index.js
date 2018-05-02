import React, { PropTypes } from 'react'
import Button from '../../atoms/Button'

export const SignIn = ({ onSignIn, onSignUp, isSignedIn, isSignUpPage }) => {
  let inputUsername
  let inputPassword
  const onSubmitSignIn = () => {
    if (inputUsername.value.trim() && inputPassword.value.trim()) {
      onSignIn(inputUsername.value, inputPassword.value)
      inputUsername.value = ''
      inputPassword.value = ''
    }
  }

  const onSubmitSignUp = () => {
    onSignUp()
  }

  if (!isSignedIn && !isSignUpPage) {
    return (
      <div>
        <input ref={node => { inputUsername = node }} placeholder={'username'} />
        <input ref={node => { inputPassword = node }} placeholder={'password'} />
        <Button type="submit" onClick={onSubmitSignIn}>Sign In</Button>
        <Button type="submit" onClick={onSubmitSignUp}>Sign Up</Button>
      </div>
    )
  }
  return null
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
  isSignUpPage: PropTypes.bool,
}

export default SignIn
