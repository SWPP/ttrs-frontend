import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import Home from './containers/Home'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'

const routes = (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="sign-in" component={SignIn} />
      <Route path="sign-up" component={SignUp} />
    </Route>
  </div>
)

export default routes
