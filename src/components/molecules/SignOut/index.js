import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router'

const SignOut = ({ onSignOut, username }) => {
  return (
    <Button.Group floated="right">
      <Button attached="left" active={false}>Hello, {username}!</Button>
      <Link to={'/sign-in'}><Button attached="right" color="teal" onClick={onSignOut}>Sign Out</Button></Link>
    </Button.Group>
  )
}

SignOut.propTypes = {
  onSignOut: PropTypes.func,
  isMainPage: PropTypes.bool,
  username: PropTypes.string,
}

export default SignOut
