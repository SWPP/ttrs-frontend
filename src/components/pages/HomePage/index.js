import React from 'react'
import SignIn from '../../../containers/SignIn'
import SignUp from '../../../containers/SignUp'
import SignOut from '../../../containers/SignOut'
import Tabs from '../../../containers/Tabs'

const HomePage = () => {
  return (
    <div>
      <SignIn />
      <SignUp />
      <SignOut />
      <Tabs />
    </div>
  )
}

export default HomePage
