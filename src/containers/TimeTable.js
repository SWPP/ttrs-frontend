import { connect } from 'react-redux'
import { TimeTable } from '../components/molecules/TimeTable'
import { modifyMemoRequest, modifyTitleRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    memo: state.ttrs.timeTable.myTimeTable.memo,
    title: state.ttrs.timeTable.myTimeTable.title,
    lectures: state.ttrs.timeTable.myTimeTable.lectures,
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
