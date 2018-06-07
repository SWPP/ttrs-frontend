import React from 'react'
import PropTypes from 'prop-types'
import { Button, Divider } from 'semantic-ui-react'
import TimeTable from '../../../containers/TimeTable'

export const getLectureIds = (timeTable) => {
  const lectureIds = []
  timeTable.lectures.forEach((lecture) => {
    lectureIds.push(lecture.id)
  })
  return lectureIds
}

export const getLectureIdsWithout = (lectureId, timeTable) => {
  const lectureIds = []
  timeTable.lectures.forEach((lecture) => {
    if (lecture.id !== lectureId) {
      lectureIds.push(lecture.id)
    }
  })
  return lectureIds
}

let inputRecommendedTimeTableIndex = { value: 0 }

class RecommendTab extends React.Component {
  render() {
    return (
      <div>
        <h1>My TimeTable</h1>
        <TimeTable
          {...this.props.myTimeTable}
          haveSidebar={false}
          canModify
          canDelete
          canCreate
          canCopyToMy={false}
          onAddLecture={(newLectureId) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, { lectures: getLectureIds(this.props.myTimeTable) }, newLectureId)}
          onDeleteLecture={(lectureId) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, { lectures: getLectureIdsWithout(lectureId, this.props.myTimeTable) }, -lectureId)}
          onModifyContent={(content) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, content, null)}
          onDeleteTimeTable={(timeTableId) => timeTableId !== null ? this.props.onDeleteTimeTable(timeTableId, 'my', null) : console.log('There is no timetable')}
        />
        <Divider />
        <h1>Recommended TimeTable</h1>
        <Button
          color="teal"
          content="Recommend"
          loading={false}
          onClick={this.props.onGetRecommendation}
        /> <br />
        <select
          ref={node => { inputRecommendedTimeTableIndex = node }}
          onChange={() => this.props.onSelectRecommendedTimeTable(this.props.recommendedTimeTables[inputRecommendedTimeTableIndex.value])}
        >
          {this.props.recommendedTimeTables.map((value, index) =>
            <option
              key={value.id}
              value={index}
            >{value.title}</option>
          )}
        </select>
        <TimeTable
          {...this.props.recommendedTimeTable}
          haveSidebar={false}
          canModify={false}
          canDelete={false}
          canCopyToMy
        />
      </div>
    )
  }
}

RecommendTab.propTypes = {
  myTimeTable: PropTypes.object,
  recommendedTimeTables: PropTypes.array,
  recommendedTimeTable: PropTypes.object,
  onSelectRecommendedTimeTable: PropTypes.func,
  onUpdateMyTimeTable: PropTypes.func,
  onDeleteTimeTable: PropTypes.func,
  onGetRecommendation: PropTypes.func,
}

export default RecommendTab
