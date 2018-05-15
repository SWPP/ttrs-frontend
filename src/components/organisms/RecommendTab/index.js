import React from 'react'
import { RECOMMEND_TAB } from '../../../store/ttrs/selectors'
import SearchLecture from '../../../containers/SearchLecture'
import TimeTable from '../../../containers/TimeTable'

const RecommendTab = ({ isMainPage, currentTab, myTimeTable, onCreateMyTimeTable, onUpdateMyTimeTable }) => {

  const onAddLecture = (newLectureId) => {
    const myTimeTableLectureIds = []
    myTimeTable.lectures.forEach((lecture) => {
      myTimeTableLectureIds.push(lecture.id)
    })

    if (myTimeTable.id === undefined) {
      onCreateMyTimeTable(myTimeTableLectureIds, newLectureId)
    } else {
      onUpdateMyTimeTable(myTimeTableLectureIds, newLectureId)
    }
  }

  if (isMainPage && currentTab === RECOMMEND_TAB) {
    return (
      <div>
        <SearchLecture
          onAddLecture={onAddLecture} />
        <TimeTable {...myTimeTable} />
      </div>
    )
  }
  return null
}

export default RecommendTab
