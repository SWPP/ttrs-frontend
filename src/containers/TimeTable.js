import { connect } from 'react-redux'
import TimeTable from '../components/molecules/TimeTable'
import { modifyMemoRequest, modifyTitleRequest } from '../store/ttrs/actions'

const mapStateToProps = (state, props) => {
  return {
    ...props,
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
