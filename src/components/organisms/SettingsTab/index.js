import React from 'react'
import { SETTINGS_TAB } from '../../../store/ttrs/selectors'
import Button from '../../atoms/Button'

const SettingsTab = ({ isMainPage, currentTab, oldPassword, notRecommendCourseNames, onChangePassword, onWithdraw }) => {
  let inputOldPassword
  let inputNewPassword
  let inputNewPasswordConfirm
  let inputPassword
  const onSubmitChangePassword = () => {
    if (inputOldPassword.value !== oldPassword) {
      console.log('old password is not correct')
      return
    }
    if (inputNewPassword.value !== inputNewPasswordConfirm.value) {
      console.log('new password is not same')
      return
    }
    onChangePassword(inputNewPassword.value)
  }
  const onSubmitWithdraw = () => {
    if (inputPassword.value !== oldPassword) {
      console.log('password is not correct')
      return
    }
    onWithdraw()
  }
  if (isMainPage && currentTab === SETTINGS_TAB) {
    console.log(notRecommendCourseNames)
    return (
      <div>
        <input ref={node => { inputOldPassword = node }} placeholder={'old password'} /> <br />
        <input ref={node => { inputNewPassword = node }} placeholder={'new password'} /> <br />
        <input ref={node => { inputNewPasswordConfirm = node }} placeholder={'new password confirm'} /> <br />
        <Button type="submit" onClick={onSubmitChangePassword}>Change Password</Button> <hr />
        <h2>Not Recommends</h2>
        {notRecommendCourseNames.map((name) =>
          <div key={name}>
            {name}
          </div>
        )} <hr />
        <input ref={node => { inputPassword = node }} placeholder={'password'} />
        <Button type="submit" onClick={onSubmitWithdraw}>Withdraw</Button>
      </div>
    )
  }
  return null
}

export default SettingsTab
