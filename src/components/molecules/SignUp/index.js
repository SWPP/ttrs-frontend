import React, { PropTypes } from 'react'
import Button from '../../atoms/Button'

export const SignUp = ({ onSignUp, onChangeDepartmentList, onChangeMajorList, isSignUpPage, collegeList, departmentList, majorList }) => {
  let inputUsername
  let inputPassword
  let inputPasswordConfirm
  let inputEmail
  let inputGrade
  let inputCollege = {value: 0}
  let inputDepartment = {value: 0}
  let inputMajor
  const gradeOption = [1, 2, 3, 4];

  const onSubmit = () => {
    if (inputUsername.value.trim() && inputPassword.value.trim() && inputPasswordConfirm.value.trim() && inputEmail.value.trim()) {
      if (inputPassword.value === inputPasswordConfirm.value) {
        console.log('grade = '+inputGrade.value)
        console.log('college = '+inputCollege.value)
        console.log('department = '+inputDepartment.value)
        console.log('major = '+inputMajor.value)
        onSignUp(inputUsername.value, inputPassword.value, inputGrade.value, inputCollege.value, inputDepartment.value, inputMajor.value)
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
        <select ref={node => { inputCollege = node }} onChange={() => onChangeDepartmentList(inputCollege.value)}>
          {collegeList.map((value, index) =>
            <option
              key={value.id}
              value={index}
            >{value.name}</option>
          )}
        </select> <br />
        Department
        <select ref={node => { inputDepartment = node }} onChange={() => onChangeMajorList(inputDepartment.value)}>
          {departmentList.map((value, index) =>
            <option
              key={value.id}
              value={index}
            >{value.name}</option>
          )}
        </select> <br />
        {/*Major*/}
        {/*<select ref={node => { inputMajor = node }}>*/}
          {/*{majorList.map((value, index) =>*/}
            {/*<option*/}
              {/*key={value.id}*/}
              {/*value={index}*/}
            {/*>{value.name}</option>*/}
          {/*)}*/}
        {/*</select> <br />*/}
        <Button type="submit" onClick={onSubmit}>Sign Up</Button>
      </div>
    )
  }
  return null
}

// Maybe will not use
// SignUp.propTypes = {
//   onSignUp: PropTypes.func.isRequired,
//   isSignUpPage: PropTypes.bool,
// }

export default SignUp
