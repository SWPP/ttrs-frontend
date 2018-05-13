import React from 'react'
import Button from '../../atoms/Button'

export const SignOut = ({ onSignOut, isMainPage, username }) => {
  if (isMainPage) {
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
