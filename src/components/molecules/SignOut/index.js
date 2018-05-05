import React, { PropTypes } from 'react'
import Button from '../../atoms/Button'

export const SignOut = ({ onSignOut, isSignedIn, username }) => {
  if (isSignedIn) {
    return (
      <div>
        Hello, {username}!
        <Button type="submit" onClick={onSignOut}>Sign Out</Button>
      </div>
    )
  }
  return null
}

SignOut.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
  username: PropTypes.string,
}

export default SignOut
