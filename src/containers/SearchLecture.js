import { connect } from 'react-redux'
import { SearchLecture } from '../components/molecules/SearchLecture'
import { searchLectureRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.ttrs.isSignedIn,
    lectures: state.ttrs.lectures,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchLecture: (content) => {
      dispatch(searchLectureRequest(content))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLecture)
