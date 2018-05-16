import { connect } from 'react-redux'
import SemesterSwitcher from '../components/molecules/SemesterSwitcher'
import { switchSemester } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    semesters: state.ttrs.semesters,
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
