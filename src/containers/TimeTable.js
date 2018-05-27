import { connect } from 'react-redux'
import TimeTable from '../components/molecules/TimeTable'
import { bookmarkRequest, sendTimeTable } from '../store/ttrs/actions'

const mapStateToProps = (state, props) => {
  return {
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
    ...props,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable)
