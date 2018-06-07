import { connect } from 'react-redux'
import RecommendTab from '../components/organisms/RecommendTab'
import { deleteTimeTableRequest, selectRecommendedTimeTableRequest, updateMyTimeTableRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    currentTab: state.ttrs.currentTab,
    myTimeTable: state.ttrs.timeTable.myTimeTable,
    recommendedTimeTables: state.ttrs.timeTable.recommendedTimeTables,
    recommendedTimeTable: state.ttrs.timeTable.recommendedTimeTable,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendTab)
