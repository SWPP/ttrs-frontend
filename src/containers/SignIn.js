import { connect } from 'react-redux'
import SignIn from '../components/molecules/SignIn'
import { signInRequest, goSignUpPage, signUpErrorClear } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    isSignUpPage: state.ttrs.isSignUpPage,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
