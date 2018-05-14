import React from 'react'
import Button from '../../atoms/Button'

const SignIn = ({ onSignIn, onGoSignUpPage, isMainPage, isSignUpPage }) => {
  let inputUsername
  let inputPassword
  const onSubmitSignIn = () => {
    if (inputUsername.value.trim() && inputPassword.value.trim()) {
      onSignIn(inputUsername.value, inputPassword.value)
      inputUsername.value = ''
      inputPassword.value = ''
    } else {
      console.log('blank input not allowed')
    }
  }

  if (!isMainPage && !isSignUpPage) {
    return (
      <div>
        <input ref={node => { inputUsername = node }} placeholder={'username'} /> <br />
        <input ref={node => { inputPassword = node }} placeholder={'password'} type='password' /> <br />
        <Button type='submit' onClick={onSubmitSignIn}>Sign In</Button> <br />
        <Button type='submit' onClick={onGoSignUpPage}>Sign Up</Button>
      </div>
    )
  }
  return null
}

export default SignIn
