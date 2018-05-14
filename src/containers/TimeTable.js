import { connect } from 'react-redux'
import TimeTable from '../components/molecules/TimeTable'
import { modifyMemo, modifyTitle } from '../store/ttrs/actions'

const mapStateToProps = (state, props) => {
  return {
    ...props,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onModifyMemo: (content) => {
      dispatch(modifyMemo(content))
    },
    onModifyTitle: (content) => {
      dispatch(modifyTitle(content))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable)
