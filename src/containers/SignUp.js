import { connect } from 'react-redux'
import SignUp from '../components/molecules/SignUp'
import { changeDepartmentList, changeMajorList, clearState, signUp } from '../store/ttrs/actions'

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
      dispatch(changeDepartmentList( collegeIndex ))
    },
    onChangeMajorList: (departmentIndex) => {
      dispatch(changeMajorList( departmentIndex ))
    },
    onSignUp: (username, password, email, grade, college, department, major) => {
      dispatch(signUp({ username, password, email, grade, college, department, major }))
    },
    onReturnToSignInPage: () => {
      dispatch(clearState())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
