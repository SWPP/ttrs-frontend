import React from 'react'
import { RECOMMEND_TAB } from '../../../store/ttrs/selectors'
import SearchLecture from '../../../containers/SearchLecture'
import TimeTable from '../../../containers/TimeTable'

const RecommendTab = ({ isMainPage, currentTab, myTimeTable, onUpdateMyTimeTable }) => {
  const getLectureIds = () => {
    const lectureIds = []
    myTimeTable.lectures.forEach((lecture) => {
      lectureIds.push(lecture.id)
    })
    return lectureIds
  }

  const getLectureIdsWithout = (lectureId) => {
    const lectureIds = []
    myTimeTable.lectures.forEach((lecture) => {
      if (lecture.id !== lectureId) {
        lectureIds.push(lecture.id)
      }
    })
    return lectureIds
  }

  if (isMainPage && currentTab === RECOMMEND_TAB) {
    return (
      <div>
        <SearchLecture
          onAddLecture={(newLectureId) => onUpdateMyTimeTable(myTimeTable.id, { lectures: getLectureIds() }, newLectureId)}
        />
        <hr />
        <TimeTable
          onModifyMemo={(memo) => onUpdateMyTimeTable(myTimeTable.id, {memo}, null)}
          onModifyTitle={(title) => onUpdateMyTimeTable(myTimeTable.id, {title}, null)}
          onDeleteLecture={(lectureId) => onUpdateMyTimeTable(myTimeTable.id, { lectures: getLectureIdsWithout(lectureId) }, -lectureId)}
          {...myTimeTable}
          timeTableId={myTimeTable.id}
        />
      </div>
    )
  }
  return null
}

export default RecommendTab
