import { connect } from 'react-redux'
import SearchLecture from '../components/molecules/SearchLecture'
import { searchLectureRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    searchLectures: state.ttrs.search.lectures,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearchLecture: (courseName) => {
      dispatch(searchLectureRequest(courseName))
    },
    onAddLecture: props.onAddLecture,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLecture)
