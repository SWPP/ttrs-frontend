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
    searchLectureLoading: state.ttrs.loading.searchLectureLoading,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearchLecture: (options) => {
      dispatch(searchLectureRequest(options))
    },
    onClose: () => {
      props.onClose()
      dispatch(clearSearchLecture())
    },
    onAddLecture: props.onAddLecture,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLecture)
