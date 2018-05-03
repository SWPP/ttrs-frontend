import { connect } from 'react-redux'
import { AddMemo } from '../components/molecules/AddMemo'
import { addMemoRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isSignedIn : state.ttrs.isSignedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMemo: (content) => {
      dispatch(addMemoRequest(content))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMemo)
