import { connect } from 'react-redux'
import Home from '../components/pages/Home'

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.ttrs.studentInfo.id !== null,
  }
}

export default connect(mapStateToProps, null)(Home)
