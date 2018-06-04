import { connect } from 'react-redux'
import Home from '../components/pages/Home'
import { clearState } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.ttrs.studentInfo.id !== null,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
