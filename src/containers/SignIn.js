import { connect } from 'react-redux'
import { SignIn } from '../components/molecules/SignIn'
import { signInRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.ttrs.isSignedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: () => {
      dispatch(signInRequest())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)