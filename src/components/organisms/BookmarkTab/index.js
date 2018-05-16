import React from 'react'
import { BOOKMARK_TAB } from '../../../store/ttrs/selectors'
import TimeTable from '../../../containers/TimeTable'

const BookmarkTab = ({ isMainPage, currentTab, myTimeTable, bookmarkedTimeTables, bookmarkedTimeTable, onSelectBookmarkedTimeTable, onUpdateMyTimeTable, onUpdateBookmarkedTimeTable }) => {
  let inputBookmarkedTimeTableIndex = { value: 0 }

  const getLectureIdsWithout = (lectureId) => {
    const lectureIds = []
    myTimeTable.lectures.forEach((lecture) => {
      if (lecture.id !== lectureId) {
        lectureIds.push(lecture.id)
      }
    })
    return lectureIds
  }

  if (isMainPage && currentTab === BOOKMARK_TAB) {
    return (
      <div>
        <TimeTable
          onModifyMemo={(memo) => onUpdateMyTimeTable(myTimeTable.id, { memo }, null)}
          onModifyTitle={(title) => onUpdateMyTimeTable(myTimeTable.id, { title }, null)}
          onDeleteLecture={(lectureId) => onUpdateMyTimeTable(myTimeTable.id, { lectures: getLectureIdsWithout(lectureId) }, -lectureId)}
          {...myTimeTable}
          timeTableId={myTimeTable.id}
          canDeleteLecture
        />
        <hr />
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
          onModifyMemo={(memo) => onUpdateBookmarkedTimeTable(inputBookmarkedTimeTableIndex.value, bookmarkedTimeTable.id, { memo })}
          onModifyTitle={(title) => onUpdateBookmarkedTimeTable(inputBookmarkedTimeTableIndex.value, bookmarkedTimeTable.id, { title })}
          timeTableId={bookmarkedTimeTable.id}
          {...bookmarkedTimeTable}
          canDeleteLecture
        />
      </div>
    )
  }
  return null
}

export default BookmarkTab
