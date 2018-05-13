import { connect } from 'react-redux'
import { SearchLecture } from '../components/molecules/SearchLecture'
import { addLectureToMyTimeTableRequest, searchLectureRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    isRecommendTab: state.ttrs.tabs.isRecommendTab,
    searchLectures: state.ttrs.search.lectures,
    myTimeTableLectures: state.ttrs.timeTable.myTimeTable.lectures,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchLecture: (courseName) => {
      dispatch(searchLectureRequest(courseName))
    },
    onAddLectureToMyTimeTable: (lectureIds, newLectureId) => {
      dispatch(addLectureToMyTimeTableRequest(lectureIds, newLectureId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLecture)
