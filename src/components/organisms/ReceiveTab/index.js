import React from 'react'
import { RECEIVE_TAB } from '../../../store/ttrs/selectors'
import TimeTable from '../../../containers/TimeTable'
import { getLectureIdsWithout } from '../RecommendTab'

const ReceiveTab = ({ isMainPage, currentTab, myTimeTable, receivedTimeTables, receivedTimeTable, onSelectReceivedTimeTable, onUpdateMyTimeTable }) => {
  let inputReceivedTimeTableIndex = { value: 0 }

  if (isMainPage && currentTab === RECEIVE_TAB) {
    return (
      <div>
        <TimeTable
          onModifyContent={(content) => onUpdateMyTimeTable(myTimeTable.id, content, null)}
          onDeleteLecture={(lectureId) => onUpdateMyTimeTable(myTimeTable.id, { lectures: getLectureIdsWithout(lectureId, myTimeTable) }, -lectureId)}
          {...myTimeTable}
          canModify
        />
        <hr />
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
