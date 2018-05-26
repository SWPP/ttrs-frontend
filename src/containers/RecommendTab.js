import { connect } from 'react-redux'
import RecommendTab from '../components/organisms/RecommendTab'
import { updateMyTimeTableRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    currentTab: state.ttrs.currentTab,
    myTimeTable: state.ttrs.timeTable.myTimeTable,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateMyTimeTable: (myTimeTableId, updatedInfo, newLectureId) => {
      dispatch(updateMyTimeTableRequest(myTimeTableId, updatedInfo, newLectureId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendTab)
