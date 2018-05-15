import { connect } from 'react-redux'
import RecommendTab from '../components/organisms/RecommendTab'
import { createMyTimeTableRequest, updateMyTimeTableRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    currentTab: state.ttrs.currentTab,
    myTimeTable: state.ttrs.timeTable.myTimeTable,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateMyTimeTable: (lectureIds, newLectureId) => {
      dispatch(createMyTimeTableRequest(lectureIds, newLectureId))
    },
    onUpdateMyTimeTable: (myTimeTable, newLectureId) => {
      dispatch(updateMyTimeTableRequest(myTimeTable, newLectureId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendTab)
