import { connect } from 'react-redux'
import { SignOut } from '../components/molecules/SignOut'
import { clearStateRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    username: state.ttrs.username,
    isMainPage: state.ttrs.isMainPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => {
      dispatch(clearStateRequest())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut)
