import React, { PropTypes } from 'react'
import Button from '../../atoms/Button'

export const SignIn = ({ onSignIn, isSignedIn }) => {
  let inputUsername
  let inputPassword
  const onSubmit = () => {
    onSignIn(inputUsername.value, inputPassword.value)
  }

  if (!isSignedIn) {
    return (
      <div>
        <input ref={node => { inputUsername = node }} placeholder={'username'} />
        <input ref={node => { inputPassword = node }} placeholder={'password'} />
        <Button type="submit" onClick={onSubmit}>Sign In</Button>
      </div>
    )
  }
  return null
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
}

export default SignIn
