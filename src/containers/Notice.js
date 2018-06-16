import { connect } from 'react-redux'
import { dismissNotice, hideNotice } from '../store/ttrs/actions'
import Notice from '../components/atoms/Notice'

const mapStateToProps = (state) => {
  return {
    lastId: state.ttrs.notice.lastId,
    notices: state.ttrs.notice.notices,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDismissNotice: (id) => {
      dispatch(dismissNotice(id))
    },
    onHideNotice: (id) => {
      dispatch(hideNotice(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notice)
