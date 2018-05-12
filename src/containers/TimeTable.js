import { connect } from 'react-redux'
import { TimeTable } from '../components/molecules/TimeTable'
import { modifyMemoRequest } from '../store/ttrs/actions'
import { modifyTitleRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.ttrs.isSignedIn,
    memo: state.ttrs.memo,
    title: state.ttrs.title,
    timeSlots: state.ttrs.timeSlots,
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
