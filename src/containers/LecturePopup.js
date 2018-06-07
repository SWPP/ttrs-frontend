import { connect } from 'react-redux'
import LecturePopup from '../components/molecules/LecturePopup'
import {
  addEvaluationRequest, addToNotRecommendsRequest, deleteEvaluationRequest, deleteFromNotRecommendsRequest,
  getEvaluationsRequest, modifyEvaluationRequest, setEvaluationsResponse, toggleLikeItRequest,
} from '../store/ttrs/actions'

const mapStateToProps = (state, props) => {
  return {
    userId: state.ttrs.studentInfo.id,
    username: state.ttrs.studentInfo.username,
    evaluations: state.ttrs.evaluations,
    lectureDetail: state.ttrs.lectureDetail,
    notRecommends: state.ttrs.studentInfo.notRecommends,
    lecture: props.lecture,
    open: props.open,
    canDelete: props.canDelete,
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
    onAddToNotRecommends: (notRecommends, courseId) => {
      dispatch(addToNotRecommendsRequest(notRecommends, courseId))
    },
    onDeleteFromNotRecommends: (notRecommends, courseId) => {
      dispatch(deleteFromNotRecommendsRequest(notRecommends, courseId))
    },
    onClose: () => {
      props.onClose()
      dispatch(setEvaluationsResponse([], { id: null, rating: 0 }))
    },
    onDeleteLecture: props.onDeleteLecture,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LecturePopup)
