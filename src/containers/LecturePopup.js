import { connect } from 'react-redux'
import LecturePopup from '../components/molecules/LecturePopup'
import {
  addEvaluationRequest, deleteEvaluationRequest, getEvaluationsRequest, modifyEvaluationRequest,
  toggleLikeItRequest
} from '../store/ttrs/actions'

const mapStateToProps = (state, props) => {
  return {
    userId: state.ttrs.studentInfo.id,
    username: state.ttrs.studentInfo.username,
    evaluations: state.ttrs.evaluations,
    lectureDetail: state.ttrs.lectureDetail,
    ...props,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetEvaluations: (lectureId) => {
      dispatch(getEvaluationsRequest(lectureId))
    },
    onAddEvaluation: (lectureId, evaluation) => {
      dispatch(addEvaluationRequest(lectureId, evaluation))
    },
    onDeleteEvaluation: (lectureId, evaluationId) => {
      dispatch(deleteEvaluationRequest(lectureId, evaluationId))
    },
    onModifyEvaluation: (lectureId, evaluation) => {
      dispatch(modifyEvaluationRequest(lectureId, evaluation))
    },
    onToggleLikeIt: (lectureId, isAdd, evaluationId) => {
      dispatch(toggleLikeItRequest(lectureId, isAdd, evaluationId))
    },
    ...props,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LecturePopup)
