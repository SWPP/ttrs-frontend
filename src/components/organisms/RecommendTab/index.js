import React from 'react'
import { RECOMMEND_TAB } from '../../../store/ttrs/selectors'
import SearchLecture from '../../../containers/SearchLecture'
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

const RecommendTab = ({ isMainPage, currentTab, myTimeTable, recommendedTimeTables, recommendedTimeTable, onSelectRecommendedTimeTable, onUpdateMyTimeTable, onDeleteTimeTable }) => {
  let inputRecommendedTimeTableIndex = { value: 0 }

  if (isMainPage && currentTab === RECOMMEND_TAB) {
    return (
      <div>
        <SearchLecture
          onAddLecture={(newLectureId) => onUpdateMyTimeTable(myTimeTable.id, { lectures: getLectureIds(myTimeTable) }, newLectureId)}
        />
        <hr />
        <h1>My TimeTable</h1>
        <TimeTable
          onModifyContent={(content) => onUpdateMyTimeTable(myTimeTable.id, content, null)}
          onDeleteLecture={(lectureId) => onUpdateMyTimeTable(myTimeTable.id, { lectures: getLectureIdsWithout(lectureId, myTimeTable) }, -lectureId)}
          {...myTimeTable}
          canModify
          canDelete
          canCopyToMy={false}
          onDeleteTimeTable={(timeTableId) => timeTableId !== null ? onDeleteTimeTable(timeTableId, 'my', null) : console.log('There is no timetable')}
        />
        <hr />
        <h1>Recommended TimeTable</h1>
        <select
          ref={node => { inputRecommendedTimeTableIndex = node }}
          onChange={() => onSelectRecommendedTimeTable(recommendedTimeTables[inputRecommendedTimeTableIndex.value])}
        >
          {recommendedTimeTables.map((value, index) =>
            <option
              key={value.id}
              value={index}
            >{value.title}</option>
          )}
        </select>
        <TimeTable
          {...recommendedTimeTable}
          canModify={false}
          canDelete={false}
          canCopyToMy
        />
      </div>
    )
  }
  return null
}

export default RecommendTab
