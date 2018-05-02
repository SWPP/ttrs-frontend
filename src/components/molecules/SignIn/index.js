import React, { PropTypes } from 'react'

export const SignIn = ({ onSignIn, isSignedIn }) => {
  if (!isSignedIn) {
    return (
      <div>
        <input placeholder={'username'} />
        <input placeholder={'password'} />
      </div>
    )
  }
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
}

export default SignIn
