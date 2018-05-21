import { connect } from 'react-redux'
import TimeTable from '../components/molecules/TimeTable'
import { bookmarkRequest } from '../store/ttrs/actions'

const mapStateToProps = (state, props) => {
  return {
    ...props,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onBookmark: (timeTableId) => {
      dispatch(bookmarkRequest(timeTableId))
    },
    ...props,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable)
