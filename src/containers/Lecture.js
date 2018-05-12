import { connect } from 'react-redux'
import Lecture from '../components/atoms/Lecture'

const mapDispatchToProps = (dispatch) => {
  return {
    onAddLectureToTimeTable: (content) => {
      dispatch(searchLectureRequest(content))
    },
  }
}

export default connect(mapDispatchToProps)(Lecture)
