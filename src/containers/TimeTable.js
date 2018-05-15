import { connect } from 'react-redux'
import TimeTable from '../components/molecules/TimeTable'
import { updateMyTimeTableRequest } from '../store/ttrs/actions'

const mapStateToProps = (state, props) => {
  return {
    ...props,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onModifyMemo: (myTimeTable) => {
      dispatch(updateMyTimeTableRequest(myTimeTable, 0))
    },
    onModifyTitle: (myTimeTable) => {
      dispatch(updateMyTimeTableRequest(myTimeTable, 0))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable)
