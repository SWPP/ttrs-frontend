import React from 'react'
import Button from '../../atoms/Button'

export const SignUp = ({ onSignUp, onReturnToSignInPage, onChangeDepartmentList, onChangeMajorList, isSignUpPage, colleges, departments, majors }) => {
  let inputUsername
  let inputPassword
  let inputPasswordConfirm
  let inputEmail
  let inputGrade
  let inputCollegeIndex = {value: 0}
  let inputDepartmentIndex = {value: 0}
  let inputMajorIndex
  const gradeOption = [1, 2, 3, 4];

  const onSubmit = () => {
    if (inputUsername.value.trim() && inputPassword.value.trim() && inputPasswordConfirm.value.trim() && inputEmail.value.trim()) {
      if (inputPassword.value === inputPasswordConfirm.value) {
        onSignUp(
          inputUsername.value,
          inputPassword.value,
          inputEmail.value+'@snu.ac.kr',
          parseInt(inputGrade.value),
          colleges[inputCollegeIndex.value].id,
          inputDepartmentIndex.value === '' ? null : departments[inputDepartmentIndex.value].id,
          inputMajorIndex.value === '' ? null : majors[inputMajorIndex.value].id,
        )
      }
      else {
        console.log('password not same')
      }
    }
    else {
      console.log('blank input not allowed')
    }
  }

  if (isSignUpPage) {
    return (
      <div>
        <input ref={node => { inputUsername = node }} placeholder={'username'} /> <br />
        <input ref={node => { inputPassword = node }} placeholder={'password'} /> <br />
        <input ref={node => { inputPasswordConfirm = node }} placeholder={'password confirm'} /> <br />
        <input ref={node => { inputEmail = node }} placeholder={'email'} />@snu.ac.kr <br />
        Grade
        <select ref={node => { inputGrade = node }}>
          {gradeOption.map(value =>
            <option
              key={value}
              value={value}
            >{value}</option>
          )}
        </select> <br />
        College
        <select ref={node => { inputCollegeIndex = node }} onChange={() => onChangeDepartmentList(inputCollegeIndex.value)}>
          {colleges.map((value, index) =>
            <option
              key={value.id}
              value={index}
            >{value.name}</option>
          )}
        </select> <br />
        Department
        <select ref={node => { inputDepartmentIndex = node }} onChange={() => onChangeMajorList(inputDepartmentIndex.value)}>
          <option value=''>----</option>
          {departments.map((value, index) =>
            <option
              key={value.id}
              value={index}
            >{value.name}</option>
          )}
        </select> <br />
        Major
        <select ref={node => { inputMajorIndex = node }}>
          <option value=''>----</option>
          {majors.map((value, index) =>
            <option
              key={value.id}
              value={index}
            >{value.name}</option>
          )}
        </select> <br />
        <Button type="submit" onClick={onSubmit}>Sign Up</Button>
        <Button type="submit" onClick={onReturnToSignInPage}>Return</Button>
      </div>
    )
  }
  return null
}

export default SignUp
