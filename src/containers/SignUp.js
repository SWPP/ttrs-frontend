import { connect } from 'react-redux'
import { SignUp } from '../components/molecules/SignUp'
import { signUpRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignUpPage: state.ttrs.isSignUpPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (username, password, grade) => {
      dispatch(signUpRequest({ username, password, grade }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
