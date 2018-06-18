import { connect } from 'react-redux'
import Lecture from '../components/atoms/Lecture'

const mapStateToProps = (state, props) => {
  return {
    lecture: props.lecture,
    intersects: props.intersects,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddLecture: props.onAddLecture,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lecture)
