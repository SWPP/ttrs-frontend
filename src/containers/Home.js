import { connect } from 'react-redux'
import Home from '../components/pages/Home'
import { clearState, sendToDeveloperResponse, signOut } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isLoaded: state.ttrs.loaded,
    isSignedIn: state.ttrs.studentInfo.id !== null,
    username: state.ttrs.studentInfo.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => {
      dispatch(signOut())
      dispatch(clearState())
    },
    onSendToDeveloper: () => {
      dispatch(sendToDeveloperResponse())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
