import { connect } from 'react-redux'
import SignUp from '../components/pages/SignUp'
import { clearState, setErrors, signUpRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    toSignIn: state.ttrs.toSignIn,
    colleges: state.ttrs.belongInfo.colleges,
    errors: state.ttrs.error.signUp,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (username, password, email, grade, college, department, major) => {
      dispatch(signUpRequest({ username, password, email, grade, college, department, major }))
    },
    onClearError: () => {
      dispatch(setErrors('signUp', {}))
    },
    onExit: () => {
      dispatch(clearState())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
