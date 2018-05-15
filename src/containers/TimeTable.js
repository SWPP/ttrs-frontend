import { connect } from 'react-redux'
import TimeTable from '../components/molecules/TimeTable'
import { updateMyTimeTable } from '../store/ttrs/actions'

const mapStateToProps = (state, props) => {
  return {
    ...props,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onModifyMemo: (myTimeTable) => {
      dispatch(updateMyTimeTable(myTimeTable, 0))
    },
    onModifyTitle: (myTimeTable) => {
      dispatch(updateMyTimeTable(myTimeTable, 0))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable)
