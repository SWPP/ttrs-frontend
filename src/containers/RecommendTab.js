import { connect } from 'react-redux'
import RecommendTab from '../components/organisms/RecommendTab'
import {
  deleteTimeTableRequest, getRecommendationRequest, selectBookmarkedTimeTableRequest, selectReceivedTimeTableRequest,
  selectRecommendedTimeTableRequest, updateBookmarkedTimeTableRequest, updateMyTimeTableRequest
} from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    currentTab: state.ttrs.currentTab,
    myTimeTable: state.ttrs.timeTable.myTimeTable,
    recommendedTimeTables: state.ttrs.timeTable.recommendedTimeTables,
    recommendedTimeTable: state.ttrs.timeTable.recommendedTimeTable,
    bookmarkedTimeTables: state.ttrs.timeTable.bookmarkedTimeTables,
    bookmarkedTimeTable: state.ttrs.timeTable.bookmarkedTimeTable,
    receivedTimeTables: state.ttrs.timeTable.receivedTimeTables,
    receivedTimeTable: state.ttrs.timeTable.receivedTimeTable,
    myTimeTableLoading: state.ttrs.loading.myTimeTableLoading,
    bookmarkedTimeTableLoading: state.ttrs.loading.bookmarkedTimeTableLoading,
    receivedTimeTableLoading: state.ttrs.loading.receivedTimeTableLoading,
    recommendedTimeTableLoading: state.ttrs.loading.recommendedTimeTableLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateMyTimeTable: (myTimeTableId, updatedInfo, newLectureId) => {
      dispatch(updateMyTimeTableRequest(myTimeTableId, updatedInfo, newLectureId))
    },
    onDeleteTimeTable: (timeTableId, timeTableType, timeTables) => {
      dispatch(deleteTimeTableRequest(timeTableId, timeTableType, timeTables))
    },
    onSelectRecommendedTimeTable: (recommendedTimeTable) => {
      dispatch(selectRecommendedTimeTableRequest(recommendedTimeTable))
    },
    onGetRecommendation: (options) => {
      dispatch(getRecommendationRequest(options))
    },
    onSelectBookmarkedTimeTable: (bookmarkedTimeTable) => {
      dispatch(selectBookmarkedTimeTableRequest(bookmarkedTimeTable))
    },
    onUpdateBookmarkedTimeTable: (timeTableId, updatedInfo, deleteLectureId) => {
      dispatch(updateBookmarkedTimeTableRequest(timeTableId, updatedInfo, deleteLectureId))
    },
    onSelectReceivedTimeTable: (receivedTimeTable, timeTableId) => {
      dispatch(selectReceivedTimeTableRequest(receivedTimeTable, timeTableId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendTab)
