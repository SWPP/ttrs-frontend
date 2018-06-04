import { connect } from 'react-redux'
import SearchLecture from '../components/molecules/SearchLecture'
import { addToNotRecommendsRequest, searchLectureRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    searchLectures: state.ttrs.search.lectures,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearchLecture: (options) => {
      dispatch(searchLectureRequest(options))
    },
    ...props,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLecture)
