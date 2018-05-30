import { connect } from 'react-redux'
import SearchLecture from '../components/molecules/SearchLecture'
import { addToNotRecommendsRequest, searchLectureRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    searchLectures: state.ttrs.search.lectures,
    notRecommends: state.ttrs.studentInfo.notRecommends,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearchLecture: (courseName) => {
      dispatch(searchLectureRequest(courseName))
    },
    onAddLecture: props.onAddLecture,
    onAddToNotRecommends: (notRecommends, courseId) => {
      dispatch(addToNotRecommendsRequest(notRecommends, courseId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLecture)
