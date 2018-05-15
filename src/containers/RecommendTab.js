import { connect } from 'react-redux'
import RecommendTab from '../components/organisms/RecommendTab'
import { updateMyTimeTable } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    currentTab: state.ttrs.currentTab,
    myTimeTable: state.ttrs.timeTable.myTimeTable,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateMyTimeTable: (myTimeTable, newLectureId) => {
      dispatch(updateMyTimeTable(myTimeTable, newLectureId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendTab)
