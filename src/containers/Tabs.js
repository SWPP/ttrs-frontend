import { connect } from 'react-redux'
import Tabs from '../components/molecules/Tabs'
import { changeTab, getNotRecommendCoursesRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    notRecommends: state.ttrs.studentInfo.notRecommends,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTab: (tab) => {
      dispatch(changeTab(tab))
    },
    onGetNotRecommendCourses: (notRecommends) => {
      dispatch(getNotRecommendCoursesRequest(notRecommends))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
