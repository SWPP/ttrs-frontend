import React, { PropTypes } from 'react'
import Button from '../../atoms/Button'

export const SignUp = ({ onSignUp, isSignUpPage }) => {
  const onSubmit = () => {
    onSignUp()
  }

  if (isSignUpPage) {
    return (
      <div>
        <input placeholder={'username'} /> <br />
        <input placeholder={'password'} /> <br />
        <input placeholder={'password confirm'} /> <br />
        <input placeholder={'email'} /> <br />
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
