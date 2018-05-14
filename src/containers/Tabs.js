import { connect } from 'react-redux'
import Tabs from '../components/molecules/Tabs'
import { goRecommendTab, goBookmarkTab, goReceiveTab, goSettingsTab } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGoRecommendTab: () => {
      dispatch(goRecommendTab())
    },
    onGoBookmarkTab: () => {
      dispatch(goBookmarkTab())
    },
    onGoReceiveTab: () => {
      dispatch(goReceiveTab())
    },
    onGoSettingsTab: () => {
      dispatch(goSettingsTab())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
