import { connect } from 'react-redux'
import LecturePopup from '../components/molecules/LecturePopup'

const mapStateToProps = (state, props) => {
  return {
    ...props,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    ...props,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LecturePopup)
