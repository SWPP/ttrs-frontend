import { connect } from 'react-redux'
import SignUp from '../components/molecules/SignUp'
import { changeDepartmentListRequest, changeMajorListRequest, clearStateRequest, signUpRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignUpPage: state.ttrs.isSignUpPage,
    colleges: state.ttrs.belongInfo.colleges,
    departments: state.ttrs.belongInfo.departments,
    majors: state.ttrs.belongInfo.majors,
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
    },
    onReturnToSignInPage: () => {
      dispatch(clearStateRequest())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
