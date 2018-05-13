import { connect } from 'react-redux'
import { SignIn } from '../components/molecules/SignIn'
import { signInRequest, goSignUpPageRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.ttrs.isSignedIn,
    isSignUpPage: state.ttrs.isSignUpPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (username, password) => {
      dispatch(signInRequest(username, password))
    },
    onGoSignUpPage: () => {
      dispatch(goSignUpPageRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
