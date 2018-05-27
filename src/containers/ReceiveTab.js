import { connect } from 'react-redux'
import ReceiveTab from '../components/organisms/ReceiveTab'
import { selectReceivedTimeTableRequest, updateMyTimeTableRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    currentTab: state.ttrs.currentTab,
    myTimeTable: state.ttrs.timeTable.myTimeTable,
    receivedTimeTables: state.ttrs.timeTable.receivedTimeTables,
    receivedTimeTable: state.ttrs.timeTable.receivedTimeTable,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectReceivedTimeTable: (receivedTimeTable) => {
      dispatch(selectReceivedTimeTableRequest(receivedTimeTable))
    },
    onUpdateMyTimeTable: (myTimeTableId, updatedInfo, newLectureId) => {
      dispatch(updateMyTimeTableRequest(myTimeTableId, updatedInfo, newLectureId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveTab)
