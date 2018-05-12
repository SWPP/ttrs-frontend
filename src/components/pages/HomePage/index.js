import React from 'react'
import SignIn from '../../../containers/SignIn'
import SignUp from '../../../containers/SignUp'
import SignOut from '../../../containers/SignOut'
import Tabs from '../../../containers/Tabs'
import TimeTable from '../../../containers/TimeTable'
import SearchLecture from '../../../containers/SearchLecture'


const HomePage = () => {
  return (
    <div>
      <SignIn />
      <SignUp />
      <SignOut />
      <Tabs />
      <SearchLecture />
      <TimeTable />
    </div>
  )
}

export default HomePage
