import React, { PropTypes } from 'react'
import Button from '../../atoms/Button'

export const SignUp = ({ onSignUp, isSignUpPage }) => {
  const onSubmit = () => {
    onSignUp()
  }

  if (isSignUpPage) {
    return (
      <div>
        <input placeholder={'username'} />
        <input placeholder={'password'} />
        <input placeholder={'password confirm'} />
        <input placeholder={'email'} />
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
