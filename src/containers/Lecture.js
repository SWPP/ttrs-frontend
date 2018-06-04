import { connect } from 'react-redux'
import { getEvaluationsRequest } from '../store/ttrs/actions'
import Lecture from '../components/atoms/Lecture'

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetEvaluations: (lectureId) => {
      dispatch(getEvaluationsRequest(lectureId))
    },
    ...props,
  }
}

export default connect(null, mapDispatchToProps)(Lecture)
