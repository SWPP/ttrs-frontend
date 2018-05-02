import React from 'react'
import SignIn from '../../../containers/SignIn'
import SignUp from '../../../containers/SignUp'
import SignOut from '../../../containers/SignOut'

const HomePage = () => {
  return (
    <div>
      <SignIn />
      <SignUp />
      <SignOut />
    </div>
  )
}

export default HomePage
