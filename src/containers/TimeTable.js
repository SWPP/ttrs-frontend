import { connect } from 'react-redux'
import { TimeTable } from '../components/molecules/TimeTable'
import { modifyMemoRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.ttrs.isSignedIn,
    memo: state.ttrs.memo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onModifyMemo: (content) => {
      dispatch(modifyMemoRequest(content))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable)
