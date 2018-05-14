import React from 'react'
import { BOOKMARK_TAB } from '../../../store/ttrs/selectors'
import TimeTable from '../../../containers/TimeTable'

const BookmarkTab = ({ isMainPage, currentTab, myTimeTable }) => {
  if (isMainPage && currentTab === BOOKMARK_TAB)
    return (
      <div>
        <TimeTable {...myTimeTable}/>
      </div>
    )
  return null
}

export default BookmarkTab
