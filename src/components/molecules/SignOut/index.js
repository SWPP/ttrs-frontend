import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const SignOut = ({ onSignOut, username, router }) => {
  return (
    <Button.Group floated="right">
      <Button attached="left" active={false}>Hello, {username}!</Button>
      <Button
        attached="right"
        color="teal"
        onClick={() => {
          onSignOut()
          router.push('/sign-in')
        }}
      >Sign Out</Button>
    </Button.Group>
  )
}

SignOut.propTypes = {
  onSignOut: PropTypes.func,
  username: PropTypes.string,
  router: PropTypes.object,
}

export default SignOut
