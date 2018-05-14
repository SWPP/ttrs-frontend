import { connect } from 'react-redux'
import Tabs from '../components/molecules/Tabs'
import { goRecommendTabRequest, goBookmarkTabRequest, goReceiveTabRequest, goSettingsTabRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
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
    onGoReceiveTab: () => {
      dispatch(goReceiveTabRequest())
    },
    onGoSettingsTab: () => {
      dispatch(goSettingsTabRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
