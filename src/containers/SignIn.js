import { connect } from 'react-redux'
import SignIn from '../components/molecules/SignIn'
import { signInRequest, goSignUpPage, setErrors } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    isSignUpPage: state.ttrs.isSignUpPage,
    errors: state.ttrs.error.signIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (username, password) => {
      dispatch(signInRequest(username, password))
    },
    onGoSignUpPage: () => {
      dispatch(goSignUpPage())
    },
    onClearError: () => {
      dispatch(setErrors('signIn', {}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
