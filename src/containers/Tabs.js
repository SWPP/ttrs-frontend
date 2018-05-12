import { connect } from 'react-redux'
import { Tabs } from '../components/molecules/Tabs'
import { goRecommendTabRequest, goBookmarkTabRequest, goReceivedTabRequest, goSettingTabRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.ttrs.isSignedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGoRecommendTab: () => {
      dispatch(goRecommendTabRequest())
    },
    onGoBookmarkTab: () => {
      dispatch(goBookmarkTabRequest())
    },
    onGoReceivedTab: () => {
      dispatch(goReceivedTabRequest())
    },
    onGoSettingTab: () => {
      dispatch(goSettingTabRequest())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
