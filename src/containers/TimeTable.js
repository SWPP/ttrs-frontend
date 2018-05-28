import { connect } from 'react-redux'
import TimeTable from '../components/molecules/TimeTable'
import { bookmarkRequest, copyToMyTimeTableRequest, sendTimeTable } from '../store/ttrs/actions'

const mapStateToProps = (state, props) => {
  return {
    username: state.ttrs.studentInfo.username,
    ...props,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onBookmark: (timeTableId) => {
      dispatch(bookmarkRequest(timeTableId))
    },
    onSendTimeTable: (sendInfo) => {
      dispatch(sendTimeTable(sendInfo))
    },
    onCopyToMy: (timeTableId) => {
      dispatch(copyToMyTimeTableRequest(timeTableId))
    },
    ...props,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable)
