import { connect } from 'react-redux'
import { SignOut } from '../components/molecules/SignOut'
import { signOutRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    username: state.ttrs.username,
    isSignedIn: state.ttrs.isSignedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => {
      dispatch(signOutRequest())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut)
