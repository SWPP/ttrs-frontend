import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { initialErrorUnit } from '../../../store/ttrs/selectors'

class SignIn extends React.Component {
  static getDerivedStateFromProps(props) {
    if (props.toHome) {
      props.router.push('/')
    }
    return null
  }

  state = {
    username: '',
    password: '',
  }

  componentWillUnmount() {
    this.props.onSetError(initialErrorUnit)
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSignIn = () => {
    this.props.onSignIn(this.state.username, this.state.password)
  }

  render() {
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
            <Form
              size="large"
              onSubmit={() => {
                this.props.onClearError()
                this.handleSignIn()
              }}
            >
              <Segment raised>
                <Form.Input
                  fluid
                  required
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  required
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <Button.Group widths="2">
                  <Button type="button" color="teal" size="large" onClick={() => this.props.router.push('/sign-up')}>Sign Up</Button>
                  <Button type="submit" color="teal" size="large">Sign In</Button>
                </Button.Group>
              </Segment>
            </Form>
            {this.props.errors.texts.detail &&
            <Message
              negative
              header={this.props.errors.texts.detail.substring(8)}
            />}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

SignIn.propTypes = {
  onSignIn: PropTypes.func,
  onClearError: PropTypes.func,
  onSetError: PropTypes.func,
  toHome: PropTypes.bool,
  errors: PropTypes.object,
  router: PropTypes.object,
}

export default SignIn
