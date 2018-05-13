import { connect } from 'react-redux'
import { SearchLecture } from '../components/molecules/SearchLecture'
import { addLectureToMyTimeTableRequest, searchLectureRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.ttrs.isSignedIn,
    isRecommendTab: state.ttrs.tabs.isRecommendTab,
    lectures: state.ttrs.lectures,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchLecture: (courseName) => {
      dispatch(searchLectureRequest(courseName))
    },
    onAddLectureToMyTimeTable: (lectureId) => {
      dispatch(addLectureToMyTimeTableRequest(lectureId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLecture)
