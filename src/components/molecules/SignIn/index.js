import React, { PropTypes } from 'react'
import Button from '../../atoms/Button'

export const SignIn = ({ onSignIn, isSignedIn }) => {
  const onSubmit = () => {
    onSignIn()
  }

  if (!isSignedIn) {
    return (
      <div>
        <input placeholder={'username'} />
        <input placeholder={'password'} />
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
