import { connect } from 'react-redux'
import SignUp from '../components/pages/SignUp'
import { setErrors, signUpRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    toSignIn: state.ttrs.toGo === 'signIn',
    colleges: state.ttrs.belongInfo.colleges,
    errors: state.ttrs.error.signUp,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (username, password, email, grade, college, department, major) => {
      dispatch(signUpRequest({ username, password, email, grade, college, department, major }))
    },
    onSetError: (errors) => {
      dispatch(setErrors('signUp', errors))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
