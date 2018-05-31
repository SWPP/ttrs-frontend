import React from 'react'
import { Container, Grid } from 'semantic-ui-react'
import SignIn from '../../../containers/SignIn'
import SignUp from '../../../containers/SignUp'
import SignOut from '../../../containers/SignOut'
import Tabs from '../../../containers/Tabs'
import SemesterSwitcher from '../../../containers/SemesterSwitcher'

const HomePage = () => {
  return (
    <div className="homepage">
      <SignIn />
      <SignUp />
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

export default HomePage
