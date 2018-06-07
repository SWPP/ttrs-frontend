import { connect } from 'react-redux'
import RecommendTab from '../components/organisms/RecommendTab'
import { deleteTimeTable, getRecommendationRequest, selectRecommendedTimeTableRequest, updateMyTimeTableRequest } from '../store/ttrs/actions'

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
      dispatch(deleteTimeTable(timeTableId, timeTableType, timeTables))
    },
    onSelectRecommendedTimeTable: (recommendedTimeTable) => {
      dispatch(selectRecommendedTimeTableRequest(recommendedTimeTable))
    },
    onGetRecommendation: () => {
      dispatch(getRecommendationRequest())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendTab)
