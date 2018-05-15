import { connect } from 'react-redux'
import TimeTable from '../components/molecules/TimeTable'

const mapStateToProps = (state, props) => {
  return {
    ...props,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    ...props,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable)
