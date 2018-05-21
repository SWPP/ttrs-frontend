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

const RecommendTab = ({ isMainPage, currentTab, myTimeTable, onUpdateMyTimeTable }) => {
  if (isMainPage && currentTab === RECOMMEND_TAB) {
    return (
      <div>
        <SearchLecture
          onAddLecture={(newLectureId) => onUpdateMyTimeTable(myTimeTable.id, { lectures: getLectureIds(myTimeTable) }, newLectureId)}
        />
        <hr />
        <TimeTable
          onModifyMemo={(memo) => onUpdateMyTimeTable(myTimeTable.id, {memo}, null)}
          onModifyTitle={(title) => onUpdateMyTimeTable(myTimeTable.id, {title}, null)}
          onDeleteLecture={(lectureId) => onUpdateMyTimeTable(myTimeTable.id, { lectures: getLectureIdsWithout(lectureId, myTimeTable) }, -lectureId)}
          {...myTimeTable}
          canDeleteLecture
        />
      </div>
    )
  }
  return null
}

export default RecommendTab
