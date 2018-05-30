import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const SignOut = ({ onSignOut, isMainPage, username }) => {
  if (isMainPage) {
    return (
      <Button.Group floated="right">
        <Button attached="left" active={false}>Hello, {username}!</Button>
        <Button attached="right" color="teal" onClick={onSignOut}>Sign Out</Button>
      </Button.Group>
    )
  }
  return null
}

SignOut.propTypes = {
  onSignOut: PropTypes.func,
  isMainPage: PropTypes.bool,
  username: PropTypes.string,
}

export default SignOut
