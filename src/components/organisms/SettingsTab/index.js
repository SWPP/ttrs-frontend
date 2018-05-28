import React from 'react'
import { SETTINGS_TAB } from '../../../store/ttrs/selectors'
import Button from '../../atoms/Button'

const SettingsTab = ({ isMainPage, currentTab, oldPassword, onChangePassword }) => {
  let inputOldPassword
  let inputNewPassword
  let inputNewPasswordConfirm
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
  if (isMainPage && currentTab === SETTINGS_TAB) {
    return (
      <div>
        <input ref={node => { inputOldPassword = node }} placeholder={'old password'} /> <br />
        <input ref={node => { inputNewPassword = node }} placeholder={'new password'} /> <br />
        <input ref={node => { inputNewPasswordConfirm = node }} placeholder={'new password confirm'} /> <br />
        <Button type="submit" onClick={onSubmitChangePassword}>Change Password</Button>
      </div>
    )
  }
  return null
}

export default SettingsTab
