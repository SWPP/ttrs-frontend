import { connect } from 'react-redux'
import { SearchLecture } from '../components/molecules/SearchLecture'
import { addLectureToTimeTableRequest, searchLectureRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.ttrs.isSignedIn,
    lectures: state.ttrs.lectures,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchLecture: (courseName) => {
      dispatch(searchLectureRequest(courseName))
    },
    onAddLectureToTimeTable: (lectureId) => {
      dispatch(addLectureToTimeTableRequest(lectureId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLecture)
