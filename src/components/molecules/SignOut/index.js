import React from 'react'
import Button from '../../atoms/Button'

export const SignOut = ({ onSignOut, isSignedIn, username }) => {
  if (isSignedIn) {
    return (
      <div>
        Hello, {username}!
        <Button type='submit' onClick={onSignOut}>Sign Out</Button>
      </div>
    )
  }
  return null
}

export default SignOut
