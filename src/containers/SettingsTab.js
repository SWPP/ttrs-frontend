import { connect } from 'react-redux'
import SettingsTab from '../components/organisms/SettingsTab'
import {
  clearState, deleteFromNotRecommendsRequest, setErrors, setSuccess, updateStudentInfoRequest,
  withdraw
} from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    username: state.ttrs.studentInfo.username,
    password: state.ttrs.studentInfo.password,
    email: state.ttrs.studentInfo.email,
    grade: state.ttrs.studentInfo.grade,
    college: state.ttrs.studentInfo.college,
    department: state.ttrs.studentInfo.department,
    major: state.ttrs.studentInfo.major,
    notRecommends: state.ttrs.studentInfo.notRecommends,
    notRecommendCourses: state.ttrs.notRecommendCourses,
    colleges: state.ttrs.belongInfo.colleges,
    errors: state.ttrs.error.settingsTab,
    response: state.ttrs.response.settingsTab,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateInfo: (info) => {
      dispatch(updateStudentInfoRequest(info))
    },
    onWithdraw: () => {
      dispatch(withdraw())
    },
    onDeleteFromNotRecommends: (notRecommends, courseId) => {
      dispatch(deleteFromNotRecommendsRequest(notRecommends, courseId))
    },
    onClearError: () => {
      dispatch(setErrors('settingsTab', {}))
    },
    onExit: () => {
      dispatch(clearState())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab)
