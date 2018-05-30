import { connect } from 'react-redux'
import SettingsTab from '../components/organisms/SettingsTab'
import { changePassword, deleteFromNotRecommendsRequest, withdraw } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    currentTab: state.ttrs.currentTab,
    oldPassword: state.ttrs.studentInfo.password,
    notRecommends: state.ttrs.studentInfo.notRecommends,
    notRecommendCourses: state.ttrs.notRecommendCourses,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangePassword: (password) => {
      dispatch(changePassword(password))
    },
    onWithdraw: () => {
      dispatch(withdraw())
    },
    onDeleteFromNotRecommends: (notRecommends, courseId) => {
      dispatch(deleteFromNotRecommendsRequest(notRecommends, courseId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab)
