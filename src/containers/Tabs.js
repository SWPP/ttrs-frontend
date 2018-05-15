import { connect } from 'react-redux'
import Tabs from '../components/molecules/Tabs'
import { changeTab } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTab: (tab) => {
      dispatch(changeTab(tab))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
