import { connect } from 'react-redux'
import { SignUp } from '../components/molecules/SignUp'
import { changeDepartmentListRequest, changeMajorListRequest, signUpRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignUpPage: state.ttrs.isSignUpPage,
    collegeList: state.ttrs.collegeList,
    departmentList: state.ttrs.departmentList,
    majorList: state.ttrs.majorList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeDepartmentList: (collegeIndex) => {
      dispatch(changeDepartmentListRequest( collegeIndex ))
    },
    onChangeMajorList: (departmentIndex) => {
      dispatch(changeMajorListRequest( departmentIndex ))
    },
    onSignUp: (username, password, email, grade, college, department, major) => {
      dispatch(signUpRequest({ username, password, email, grade, college, department, major }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
