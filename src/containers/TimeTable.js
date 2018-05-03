import { connect } from 'react-redux'
import { TimeTable } from '../components/molecules/TimeTable'

const mapStateToProps = (state) => {
  return {
    memoList: state.ttrs.memoList,
    isSignedIn: state.ttrs.isSignedIn,
  }
}


// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick: (id) => {
//       dispatch(toggleTodo(id))
//     }
//   }
// }

export default connect(mapStateToProps)(TimeTable)
