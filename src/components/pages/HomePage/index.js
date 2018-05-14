import React from 'react'
import SignIn from '../../../containers/SignIn'
import SignUp from '../../../containers/SignUp'
import SignOut from '../../../containers/SignOut'
import Tabs from '../../../containers/Tabs'
import RecommendTab from '../../../containers/RecommendTab'
import BookmarkTab from '../../../containers/BookmarkTab'
import ReceiveTab from '../../../containers/ReceiveTab'
import SettingsTab from '../../../containers/SettingsTab'

const HomePage = () => {
  return (
    <div>
      <SignIn />
      <SignUp />
      <SignOut />
      <Tabs />
      <RecommendTab />
      {/*<BookmarkTab />*/}
      {/*<ReceiveTab />*/}
      {/*<SettingsTab />*/}
    </div>
  )
}

export default HomePage
