import { connect } from 'react-redux'
import { SearchLecture } from '../components/molecules/SearchLecture'
// import { modifyMemoRequest } from '../store/ttrs/actions'
// import { modifyTitleRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.ttrs.isSignedIn,
    LectureList: state.ttrs.LectureList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onModifyMemo: (content) => {
    //   dispatch(modifyMemoRequest(content))
    // },
    // onModifyTitle: (content) => {
    //   dispatch(modifyTitleRequest(content))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLecture)
