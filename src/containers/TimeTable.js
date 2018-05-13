import { connect } from 'react-redux'
import { TimeTable } from '../components/molecules/TimeTable'
import { modifyMemoRequest, modifyTitleRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    isSettingTab: state.ttrs.tabs.isSettingTab,
    memo: state.ttrs.timeTable.memo,
    title: state.ttrs.timeTable.title,
    lectures: state.ttrs.timeTable.lecturesOfMyTimeTable,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onModifyMemo: (content) => {
      dispatch(modifyMemoRequest(content))
    },
    onModifyTitle: (content) => {
      dispatch(modifyTitleRequest(content))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable)
