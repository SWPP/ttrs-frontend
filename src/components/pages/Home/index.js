import React from 'react'
import PropTypes from 'prop-types'
import { Container, Dropdown, Grid, Header, List, Menu, Segment } from 'semantic-ui-react'
import SemesterSwitcher from '../../../containers/SemesterSwitcher'
import RecommendTab from '../../../containers/RecommendTab'
import BookmarkTab from '../../../containers/BookmarkTab'
import ReceiveTab from '../../../containers/ReceiveTab'
import SettingsTab from '../../../containers/SettingsTab'
import ttrsIconSmall from '../../../../public/ttrsIconSmallTransparent.png'
import ttrsIcon from '../../../../public/ttrsIcon.png'

class Home extends React.Component {
  static getDerivedStateFromProps(props) {
    if (!props.isLoaded) {
      return null
    }
    if (!props.isSignedIn) {
      props.router.push('/sign-in')
    }
    return null
  }

  render() {
    if (!this.props.isLoaded || !this.props.isSignedIn) {
      return null
    }
    const tabName = this.props.route.currentTab
    let tab = null
    if (tabName === 'recommend') {
      tab = <RecommendTab />
    } else if (tabName === 'bookmark') {
      tab = <BookmarkTab />
    } else if (tabName === 'receive') {
      tab = <ReceiveTab />
    } else if (tabName === 'settings') {
      tab = <SettingsTab />
    } else {
      this.props.router.push('/404')
      return null
    }

    return (
      <div className="homepage">
        <Menu fixed="top" inverted compact>
          <Container>
            <Menu.Item header><img src={ttrsIconSmall} alt="icon" style={{ width: 23, marginRight: 10 }} />TTRS</Menu.Item>
            <Menu.Item onClick={() => this.props.router.push('recommend/')}>Recommend</Menu.Item>
            <Menu.Item onClick={() => this.props.router.push('bookmark/')}>Bookmark</Menu.Item>
            <Menu.Item onClick={() => this.props.router.push('receive/')}>Receive</Menu.Item>
            <Menu.Item onClick={() => this.props.router.push('settings/')}>Settings</Menu.Item>
            <Menu.Menu position="right">
              <SemesterSwitcher />
              <Dropdown
                icon={null}
                text={`Hello, ${this.props.username}`}
                options={[{ text: 'Sign Out', value: 'sign-out' }]}
                onChange={(e, { value }) => {
                  if (value === 'sign-out') {
                    this.props.onSignOut()
                    this.props.router.push('/sign-in')
                  }
                }}
                simple item
              />
            </Menu.Menu>
          </Container>
        </Menu>

        <Container fluid style={{ marginTop: 70, paddingLeft: 70, paddingRight: 70 }}>
          {tab}
        </Container>

        <Segment inverted vertical style={{ padding: '5em 0em', marginTop: 100 }}>
          <Container textAlign="center">
            <Grid divided stackable inverted verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={10}>
                  <Grid stackable inverted verticalAlign="middle">
                    <Grid.Row>
                      <Grid.Column width={5}>
                        <img src={ttrsIcon} alt="icon" width={200} />
                      </Grid.Column>
                      <Grid.Column width={11}>
                        <h1>TTRS</h1>
                        <h3>Time Table Recommendation Service</h3>
                        <h5>for Seoul National University Students</h5>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
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
  isLoaded: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  username: PropTypes.string,
  router: PropTypes.object,
  route: PropTypes.object,

  onSignOut: PropTypes.func,
}

export default Home
