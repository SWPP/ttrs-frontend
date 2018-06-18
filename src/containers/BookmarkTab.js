import { connect } from 'react-redux'
import BookmarkTab from '../components/organisms/BookmarkTab'
import { deleteTimeTableRequest, selectBookmarkedTimeTableRequest, updateBookmarkedTimeTableRequest, updateMyTimeTableRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    currentTab: state.ttrs.currentTab,
    myTimeTable: state.ttrs.timeTable.myTimeTable,
    bookmarkedTimeTables: state.ttrs.timeTable.bookmarkedTimeTables,
    bookmarkedTimeTable: state.ttrs.timeTable.bookmarkedTimeTable,
    myTimeTableLoading: state.ttrs.loading.myTimeTableLoading,
    bookmarkedTimeTableLoading: state.ttrs.loading.bookmarkedTimeTableLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectBookmarkedTimeTable: (bookmarkedTimeTable) => {
      dispatch(selectBookmarkedTimeTableRequest(bookmarkedTimeTable))
    },
    onUpdateMyTimeTable: (myTimeTableId, updatedInfo, newLectureId) => {
      dispatch(updateMyTimeTableRequest(myTimeTableId, updatedInfo, newLectureId))
    },
    onUpdateBookmarkedTimeTable: (timeTableId, updatedInfo, deleteLectureId) => {
      dispatch(updateBookmarkedTimeTableRequest(timeTableId, updatedInfo, deleteLectureId))
    },
    onDeleteTimeTable: (timeTableId, timeTableType, timeTables) => {
      dispatch(deleteTimeTableRequest(timeTableId, timeTableType, timeTables))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkTab)
