import { connect } from 'react-redux'
import { SignUp } from '../components/molecules/SignUp'
import { signUpRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignUpPage: state.ttrs.isSignUpPage,
    collegeList: state.ttrs.collegeList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (username, password, grade, college) => {
      dispatch(signUpRequest({ username, password, grade, college }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
