import { connect } from 'react-redux'
import SemesterSwitcher from '../components/molecules/SemesterSwitcher'
import { switchSemester } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    semesters: state.ttrs.semesters,
    year: state.ttrs.year,
    semester: state.ttrs.semester,
    myTimeTableLoading: state.ttrs.loading.myTimeTableLoading,
    bookmarkedTimeTableLoading: state.ttrs.loading.bookmarkedTimeTableLoading,
    receivedTimeTableLoading: state.ttrs.loading.receivedTimeTableLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchSemester: (newYear, newSemester) => {
      dispatch(switchSemester(newYear, newSemester))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SemesterSwitcher)
