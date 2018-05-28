import React from 'react'
import { RECEIVE_TAB } from '../../../store/ttrs/selectors'
import TimeTable from '../../../containers/TimeTable'
import { getLectureIdsWithout } from '../RecommendTab'

const ReceiveTab = ({ isMainPage, currentTab, myTimeTable, receivedTimeTables, receivedTimeTable, onSelectReceivedTimeTable, onUpdateMyTimeTable }) => {
  let inputReceivedTimeTableIndex = { value: 0 }

  if (isMainPage && currentTab === RECEIVE_TAB) {
    return (
      <div>
        <h1>My TimeTable</h1>
        <TimeTable
          onModifyContent={(content) => onUpdateMyTimeTable(myTimeTable.id, content, null)}
          onDeleteLecture={(lectureId) => onUpdateMyTimeTable(myTimeTable.id, { lectures: getLectureIdsWithout(lectureId, myTimeTable) }, -lectureId)}
          {...myTimeTable}
          canModify
        />
        <hr />
        <h1>Received TimeTable</h1>
        <select
          ref={node => { inputReceivedTimeTableIndex = node }}
          onChange={() => onSelectReceivedTimeTable(receivedTimeTables[inputReceivedTimeTableIndex.value])}
        >
          {receivedTimeTables.map((value, index) =>
            <option
              key={value.id}
              value={index}
            >{value.title}</option>
          )}
        </select>
        <h2>sender: {receivedTimeTable.sender}</h2>
        <TimeTable
          {...receivedTimeTable}
          canModify={false}
        />
      </div>
    )
  }
  return null
}

export default ReceiveTab
