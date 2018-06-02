import { connect } from 'react-redux'
import SignOut from '../components/molecules/SignOut'
import { clearState } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    username: state.ttrs.studentInfo.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => {
      dispatch(clearState())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut)
