import { connect } from 'react-redux'
import TimeTable from '../components/molecules/TimeTable'
import {
  addToNotRecommendsRequest, bookmarkRequest, copyToMyTimeTableRequest,
  sendTimeTable
} from '../store/ttrs/actions'

const mapStateToProps = (state, props) => {
  return {
    username: state.ttrs.studentInfo.username,
    notRecommends: state.ttrs.studentInfo.notRecommends,
    ...props,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onBookmark: (timeTableId) => {
      dispatch(bookmarkRequest(timeTableId))
    },
    onSend: (sendInfo) => {
      dispatch(sendTimeTable(sendInfo))
    },
    onCopyToMy: (timeTableId) => {
      dispatch(copyToMyTimeTableRequest(timeTableId))
    },
    onAddToNotRecommends: (notRecommends, courseId) => {
      dispatch(addToNotRecommendsRequest(notRecommends, courseId))
    },
    ...props,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable)
