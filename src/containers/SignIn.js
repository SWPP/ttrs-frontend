import { connect } from 'react-redux'
import SignIn from '../components/pages/SignIn'
import { signInRequest, setErrors } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    toHome: state.ttrs.toHome,
    errors: state.ttrs.error.signIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (username, password) => {
      dispatch(signInRequest(username, password))
    },
    onClearError: () => {
      dispatch(setErrors('signIn', {}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
