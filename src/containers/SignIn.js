import { connect } from 'react-redux'
import SignIn from '../components/pages/SignIn'
import { signInRequest, setErrors } from '../store/ttrs/actions'
import { initialErrorUnit } from '../store/ttrs/selectors'

const mapStateToProps = (state) => {
  return {
    toHome: state.ttrs.toGo === 'home',
    errors: state.ttrs.error.signIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (username, password) => {
      dispatch(signInRequest(username, password))
    },
    onClearError: () => {
      dispatch(setErrors('signIn', initialErrorUnit))
    },
    onSetError: (errors) => {
      dispatch(setErrors('signIn', errors))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
