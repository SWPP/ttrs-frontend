import React from 'react'
import PropTypes from 'prop-types'
import { Button, Container, Grid, Header, List, Menu, Popup, Segment } from 'semantic-ui-react'
import Tabs from '../../../containers/Tabs'
import SemesterSwitcher from '../../../containers/SemesterSwitcher'

class Home extends React.Component {
  static getDerivedStateFromProps(props) {
    if (!props.isSignedIn) {
      props.router.push('/sign-in')
    }
    return null
  }

  render() {
    if (!this.props.isSignedIn) {
      return null
    }

    return (
      <div className="homepage">
        <Menu fixed="top" inverted compact>
          <Container>
            <Menu.Item header>TTRS</Menu.Item>
            <Menu.Item onClick={() => this.props.router.push('recommend/')}>Recommend</Menu.Item>
            <Menu.Item onClick={() => this.props.router.push('bookmark/')}>Bookmark</Menu.Item>
            <Menu.Item onClick={() => this.props.router.push('receive/')}>Receive</Menu.Item>
            <Menu.Item onClick={() => this.props.router.push('settings/')}>Settings</Menu.Item>
            <Menu.Menu position="right">
              <SemesterSwitcher />
              <Popup
                on="click"
                inverted
                size="mini"
                content={<Button
                  style={{ margin: 0 }}
                  compact
                  secondary
                  onClick={() => {
                    this.props.onSignOut()
                    this.props.router.push('/sign-in')
                  }}
                  content="Sign Out"
                />}
                trigger={<Menu.Item>
                  Hello, {this.props.username}
                </Menu.Item>}
              />
            </Menu.Menu>
          </Container>
        </Menu>
        <Container style={{ marginTop: 40 }}>
          <Grid padded container>
            <Grid.Row>
              <Grid.Column>
                <Tabs />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container textAlign="center">
            <Grid divided stackable inverted verticalAlign="center">
              <Grid.Row>
                <Grid.Column width={10}>
                  <h1>
                    TTRS
                  </h1>
                  <h3>
                    Time Table Recommendation Service
                  </h3>
                  <h5>
                    for Seoul National University Students
                  </h5>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Header inverted content="About" />
                  <List inverted>
                    <List.Item as="a">Contact Us</List.Item>
                    <List.Item as="a">How to Access</List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }
}

Home.propTypes = {
  isSignedIn: PropTypes.bool,
  username: PropTypes.string,
  onSignOut: PropTypes.func,
  router: PropTypes.object,
}

export default Home
