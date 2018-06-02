import React from 'react'
import PropTypes from 'prop-types'
import { Container, Grid } from 'semantic-ui-react'
import SignOut from '../../../containers/SignOut'
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
        <Container>
          <Grid padded container>
            <Grid.Row columns={2}>
              <Grid.Column floated="left">
                <SemesterSwitcher />
              </Grid.Column>
              <Grid.Column>
                <SignOut />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Tabs />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

Home.propTypes = {
  isSignedIn: PropTypes.bool,
}

export default Home
