import { connect } from 'react-redux'
import RecommendTab from '../components/organisms/RecommendTab'
import { addLectureToMyTimeTableRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    currentTab: state.ttrs.currentTab,
    myTimeTable: state.ttrs.timeTable.myTimeTable,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddLectureToMyTimeTable: (lectureIds, newLectureId) => {
      dispatch(addLectureToMyTimeTableRequest(lectureIds, newLectureId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendTab)
