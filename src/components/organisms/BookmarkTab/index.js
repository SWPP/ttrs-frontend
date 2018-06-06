import React from 'react'
import PropTypes from 'prop-types'
import TimeTable from '../../../containers/TimeTable'
import { getLectureIds, getLectureIdsWithout } from '../RecommendTab'

const BookmarkTab = ({ myTimeTable, bookmarkedTimeTables, bookmarkedTimeTable, onSelectBookmarkedTimeTable, onUpdateMyTimeTable, onUpdateBookmarkedTimeTable, onDeleteTimeTable }) => {
  let inputBookmarkedTimeTableIndex = { value: 0 }

  return (
    <div>
      <h1>My TimeTable</h1>
      <TimeTable
        onAddLecture={(newLectureId) => onUpdateMyTimeTable(myTimeTable.id, { lectures: getLectureIds(myTimeTable) }, newLectureId)}
        onModifyContent={(content) => onUpdateMyTimeTable(myTimeTable.id, content, null)}
        onDeleteLecture={(lectureId) => onUpdateMyTimeTable(myTimeTable.id, { lectures: getLectureIdsWithout(lectureId, myTimeTable) }, -lectureId)}
        {...myTimeTable}
        canModify
        canDelete
        canCreate
        canCopyToMy={false}
        onDeleteTimeTable={(timeTableId) => timeTableId !== null ? onDeleteTimeTable(timeTableId, 'my', null) : console.log('There is no timetable')}
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
        onAddLecture={(newLectureId) => onUpdateBookmarkedTimeTable(inputBookmarkedTimeTableIndex.value, bookmarkedTimeTable.id, { lectures: getLectureIds(bookmarkedTimeTable) }, newLectureId)}
        onModifyContent={(content) => onUpdateBookmarkedTimeTable(inputBookmarkedTimeTableIndex.value, bookmarkedTimeTable.id, content, null)}
        onDeleteLecture={(lectureId) => onUpdateBookmarkedTimeTable(inputBookmarkedTimeTableIndex.value, bookmarkedTimeTable.id, { lectures: getLectureIdsWithout(lectureId, bookmarkedTimeTable) }, -lectureId)}
        {...bookmarkedTimeTable}
        canModify
        canDelete
        canCopyToMy
        onDeleteTimeTable={(timeTableId) => timeTableId !== null ? onDeleteTimeTable(timeTableId, 'bookmarked', bookmarkedTimeTables) : console.log('There is no timetable')}
      />
    </div>
  )
}

BookmarkTab.propTypes = {
  myTimeTable: PropTypes.object,
  bookmarkedTimeTables: PropTypes.array,
  bookmarkedTimeTable: PropTypes.object,
  onSelectBookmarkedTimeTable: PropTypes.func,
  onUpdateMyTimeTable: PropTypes.func,
  onUpdateBookmarkedTimeTable: PropTypes.func,
  onDeleteTimeTable: PropTypes.func,
}

export default BookmarkTab
