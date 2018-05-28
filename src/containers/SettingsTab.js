import { connect } from 'react-redux'
import SettingsTab from '../components/organisms/SettingsTab'
import { changePassword, withdraw } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    currentTab: state.ttrs.currentTab,
    oldPassword: state.ttrs.studentInfo.password,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab)
