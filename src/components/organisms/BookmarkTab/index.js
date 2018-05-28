import React from 'react'
import { BOOKMARK_TAB } from '../../../store/ttrs/selectors'
import TimeTable from '../../../containers/TimeTable'
import { getLectureIdsWithout } from '../RecommendTab'

const BookmarkTab = ({ isMainPage, currentTab, myTimeTable, bookmarkedTimeTables, bookmarkedTimeTable, onSelectBookmarkedTimeTable, onUpdateMyTimeTable, onUpdateBookmarkedTimeTable }) => {
  let inputBookmarkedTimeTableIndex = { value: 0 }

  if (isMainPage && currentTab === BOOKMARK_TAB) {
    return (
      <div>
        <h1>My TimeTable</h1>
        <TimeTable
          onModifyContent={(content) => onUpdateMyTimeTable(myTimeTable.id, content, null)}
          onDeleteLecture={(lectureId) => onUpdateMyTimeTable(myTimeTable.id, { lectures: getLectureIdsWithout(lectureId, myTimeTable) }, -lectureId)}
          {...myTimeTable}
          canModify
          canCopyToMy={false}
        />
        <hr />
        <h1>Bookmarked TimeTable</h1>
        <select
          ref={node => { inputBookmarkedTimeTableIndex = node }}
          onChange={() => onSelectBookmarkedTimeTable(bookmarkedTimeTables[inputBookmarkedTimeTableIndex.value])}
        >
          {bookmarkedTimeTables.map((value, index) =>
            <option
              key={value.id}
              value={index}
            >{value.title}</option>
          )}
        </select>
        <TimeTable
          onModifyContent={(content) => onUpdateBookmarkedTimeTable(inputBookmarkedTimeTableIndex.value, bookmarkedTimeTable.id, content, null)}
          onDeleteLecture={(lectureId) => onUpdateBookmarkedTimeTable(inputBookmarkedTimeTableIndex.value, bookmarkedTimeTable.id, { lectures: getLectureIdsWithout(lectureId, bookmarkedTimeTable) }, lectureId)}
          {...bookmarkedTimeTable}
          canModify
          canCopyToMy
        />
      </div>
    )
  }
  return null
}

export default BookmarkTab
