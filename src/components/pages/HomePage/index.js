import React from 'react'
import SignIn from '../../../containers/SignIn'
import SignUp from '../../../containers/SignUp'
import SignOut from '../../../containers/SignOut'
import Tabs from '../../../containers/Tabs'
import AddMemo from '../../../containers/AddMemo'
import TimeTable from '../../../containers/TimeTable'

const HomePage = () => {
  return (
    <div>
      <SignIn />
      <SignUp />
      <SignOut />
      <Tabs />
      <AddMemo />
      <TimeTable />
    </div>
  )
}

export default HomePage
