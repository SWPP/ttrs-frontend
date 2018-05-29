import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmitSignIn = () => {
    if (this.state.username.trim() && this.state.password.trim()) {
      this.props.onSignIn(this.state.username, this.state.password)
      this.setState({ username: '', password: '' })
    } else {
      console.log('blank input not allowed')
    }
  }

  render() {
    if (!this.props.isMainPage && !this.props.isSignUpPage) {
      return (
        <div className="sign-in-form">
          <style>{`
          body > main,
          body > main > div,
          body > main > div > div.sign-in-form {
            height: 100%;
          }
        `}</style>
          <Grid
            textAlign="center"
            style={{ height: '100%' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 400 }}>
              <Header as="h1" color="teal" textAlign="center">
                TTRS
              </Header>
              <Form size="large" onSubmit={this.handleSubmitSignIn}>
                <Segment raised>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <Button.Group widths="2">
                    <Button type="button" color="teal" size="large" onClick={this.props.onGoSignUpPage}>Sign Up</Button>
                    <Button type="submit" color="teal" size="large">Sign In</Button>
                  </Button.Group>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      )
    }
    return null
  }
}

SignIn.propTypes = {
  onSignIn: PropTypes.func,
  onGoSignUpPage: PropTypes.func,
  isMainPage: PropTypes.bool,
  isSignUpPage: PropTypes.bool,
}

export default SignIn
