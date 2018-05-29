import { connect } from 'react-redux'
import SignUp from '../components/molecules/SignUp'
import { clearState, setErrors, signUpRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignUpPage: state.ttrs.isSignUpPage,
    colleges: state.ttrs.belongInfo.colleges,
    departments: state.ttrs.belongInfo.departments,
    majors: state.ttrs.belongInfo.majors,
    errors: state.ttrs.error.signUp,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (username, password, email, grade, college, department, major) => {
      dispatch(signUpRequest({ username, password, email, grade, college, department, major }))
    },
    onReturnToSignInPage: () => {
      dispatch(clearState())
    },
    onClearError: () => {
      dispatch(setErrors('signUp', {}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
