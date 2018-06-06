import { connect } from 'react-redux'
import SearchLecture from '../components/molecules/SearchLecture'
import { clearSearchLecture, searchLectureRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    searchLectures: state.ttrs.search.lectures,
    count: state.ttrs.search.count,
    colleges: state.ttrs.belongInfo.colleges,
    fields: state.ttrs.fields,
    types: state.ttrs.types,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearchLecture: (options) => {
      dispatch(searchLectureRequest(options))
    },
    ...props,
    onClose: () => {
      props.onClose()
      dispatch(clearSearchLecture())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLecture)
