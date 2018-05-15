import React from 'react'
import { RECOMMEND_TAB } from '../../../store/ttrs/selectors'
import SearchLecture from '../../../containers/SearchLecture'
import TimeTable from '../../../containers/TimeTable'

const RecommendTab = ({ isMainPage, currentTab, myTimeTable, onUpdateMyTimeTable }) => {
  if (isMainPage && currentTab === RECOMMEND_TAB) {
    return (
      <div>
        <SearchLecture
          onAddLecture={(newLectureId) => onUpdateMyTimeTable(myTimeTable, newLectureId)} />
        <TimeTable {...myTimeTable} />
      </div>
    )
  }
  return null
}

export default RecommendTab
