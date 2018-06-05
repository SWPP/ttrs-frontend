import React from 'react'
import { Route } from 'react-router'

import App from 'components/App'
import Home from './containers/Home'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'
import NotFoundPage from './components/pages/NotFoundPage'

const routes = (
  <div>
    <App>
      <Route exact path="/" component={Home} currentTab="recommend" />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/recommend" component={Home} currentTab="recommend" />
      <Route path="/bookmark" component={Home} currentTab="bookmark" />
      <Route path="/receive" component={Home} currentTab="receive" />
      <Route path="/settings" component={Home} currentTab="settings" />
      <Route exact path="*" component={NotFoundPage} />
    </App>
  </div>
)

export default routes
