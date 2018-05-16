import React from 'react'
import { BOOKMARK_TAB } from '../../../store/ttrs/selectors'
import TimeTable from '../../../containers/TimeTable'

const BookmarkTab = ({ isMainPage, currentTab, myTimeTable, bookmarkedTimeTables, bookmarkedTimeTable, onSelectBookmarkedTimeTable, onUpdateMyTimeTable }) => {
  let inputBookmarkedTimeTable
  if (isMainPage && currentTab === BOOKMARK_TAB) {
    return (
      <div>
        <TimeTable
          onModifyMemo={(memo) => onUpdateMyTimeTable(myTimeTable.id, {memo}, null)}
          onModifyTitle={(title) => onUpdateMyTimeTable(myTimeTable.id, {title}, null)}
          {...myTimeTable}
        />
        <hr />
        <select
          ref={node => { inputBookmarkedTimeTable = node }}
          onChange={() => onSelectBookmarkedTimeTable(bookmarkedTimeTables[inputBookmarkedTimeTable.value])}
        >
          {bookmarkedTimeTables.map((value, index) =>
            <option
              key={value.id}
              value={index}
            >{value.title}</option>
          )}
        </select>
        <TimeTable {...bookmarkedTimeTable} />
      </div>
    )
  }
  return null
}

export default BookmarkTab
