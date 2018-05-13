import { connect } from 'react-redux'
import { SearchLecture } from '../components/molecules/SearchLecture'
import { addLectureToMyTimeTableRequest, searchLectureRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    isRecommendTab: state.ttrs.tabs.isRecommendTab,
    lectures: state.ttrs.search.lectures,
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
