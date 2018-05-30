import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../atoms/Button'

const SettingsTab = ({ oldPassword, notRecommends, notRecommendCourses, onChangePassword, onWithdraw, onDeleteFromNotRecommends }) => {
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

  return (
    <div>
      <input ref={node => { inputOldPassword = node }} placeholder={'old password'} /> <br />
      <input ref={node => { inputNewPassword = node }} placeholder={'new password'} /> <br />
      <input ref={node => { inputNewPasswordConfirm = node }} placeholder={'new password confirm'} /> <br />
      <Button type="submit" onClick={onSubmitChangePassword}>Change Password</Button> <hr />
      <h2>Not Recommends</h2>
      {notRecommendCourses.map((course) => (
        <div key={course.id}>
          {course.name}
          <button onClick={() => onDeleteFromNotRecommends(notRecommends, course.id)}>X</button>
        </div>
      ))}
      <hr />
      <input ref={node => { inputPassword = node }} placeholder={'password'} />
      <Button type="submit" onClick={onSubmitWithdraw}>Withdraw</Button>
    </div>
  )
}

SettingsTab.propTypes = {
  oldPassword: PropTypes.func,
  notRecommends: PropTypes.array,
  notRecommendCourses: PropTypes.array,
  onChangePassword: PropTypes.func,
  onWithdraw: PropTypes.func,
}

export default SettingsTab
