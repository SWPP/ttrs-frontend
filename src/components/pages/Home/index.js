import React from 'react'
import PropTypes from 'prop-types'
import {
  Container, Dropdown, Grid, Header, List, Menu, Modal, Segment, Form, TextArea, Button, Dimmer, Loader,
} from 'semantic-ui-react'
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

  state = {
    developerPopupOpen: false,
    contactPopupOpen: false,
  }

  render() {
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
        <Dimmer active={!this.props.isLoaded || !this.props.isSignedIn}>
          <Loader>Loading</Loader>
        </Dimmer>
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

        <Modal
          open={this.state.developerPopupOpen}
          size="small"
          style={{
            marginTop: 200,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          closeOnDimmerClick
          onClose={() => this.setState({ developerPopupOpen: false })}
        >
          <Modal.Header>Developer Information</Modal.Header>
          <Container textAlign="center">
            <Modal.Content>
              <Modal.Description>
                <br /><br /><br /><br />
                <span style={{ fontSize: 30 }}>
                  # 2018~<br /><br />
                </span>
                <span style={{ fontSize: 23 }}>
                  <p>권현우 / 컴퓨터공학부 16</p>
                  <p style={{ marginTop: -15 }}>김성재 / 컴퓨터공학부 16</p>
                  <p style={{ marginTop: -15 }}>남예현 / 컴퓨터공학부 16</p>
                </span>
                <br /><br /><br /><br />
              </Modal.Description>
            </Modal.Content>
          </Container>
        </Modal>

        <Modal
          open={this.state.contactPopupOpen}
          size="small"
          style={{
            marginTop: 200,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          closeOnDimmerClick
          onClose={() => this.setState({ contactPopupOpen: false })}
        >
          <Modal.Header>Contact Us</Modal.Header>
          <Container>
            <Modal.Content>
              <Modal.Description>
                <br /><br />
                <span style={{ fontSize: 20, marginLeft: 45 }}>
                  e-mail (optional)
                </span>
                <Container textAlign="center" style={{ marginTop: 10 }}>
                  <Form>
                    <Form.Input
                      style={{ width: '90%' }}
                      placeholder="example@snu.ac.kr"
                    />
                  </Form>
                </Container>
                <br />
                <span style={{ fontSize: 20, marginLeft: 45 }}>
                  Content
                </span>
                <Container textAlign="center" style={{ marginTop: 10 }}>
                  <Form>
                    <Form.Input
                      required
                      control={TextArea}
                      style={{ width: '90%' }}
                      placeholder="Write Content..."
                    />
                  </Form>
                </Container>
                <br /><br />
              </Modal.Description>
            </Modal.Content>
          </Container>
          <Modal.Actions>
            <Button
              icon={{ name: 'send' }}
              color="teal"
              content="Send"
              onClick={() => {
                this.setState({ contactPopupOpen: false })
                this.props.onSendToDeveloper()
              }}
            />
          </Modal.Actions>
        </Modal>

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
                    <List.Item
                      as="a"
                      onClick={() => this.setState({ developerPopupOpen: true })}
                    >Developer Information</List.Item>
                    <List.Item
                      as="a"
                      onClick={() => this.setState({ contactPopupOpen: true })}
                    >Contact Us</List.Item>
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
  onSendToDeveloper: PropTypes.func,
}

export default Home
