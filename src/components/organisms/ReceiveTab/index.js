import React from 'react'
import PropTypes from 'prop-types'
import TimeTable from '../../../containers/TimeTable'
import { getLectureIdsWithout } from '../RecommendTab'

const ReceiveTab = ({ myTimeTable, receivedTimeTables, receivedTimeTable, onSelectReceivedTimeTable, onUpdateMyTimeTable, onDeleteTimeTable }) => {
  let inputReceivedTimeTableIndex = { value: 0 }

  return (
    <div>
      <h1>My TimeTable</h1>
      <TimeTable
        onModifyContent={(content) => onUpdateMyTimeTable(myTimeTable.id, content, null)}
        onDeleteLecture={(lectureId) => onUpdateMyTimeTable(myTimeTable.id, { lectures: getLectureIdsWithout(lectureId, myTimeTable) }, -lectureId)}
        {...myTimeTable}
        canModify
        canDelete
        canCopyToMy={false}
        onDeleteTimeTable={(timeTableId) => timeTableId !== null ? onDeleteTimeTable(timeTableId, 'my', null) : console.log('There is no timetable')}
      />
      <hr />
      <h1>Received TimeTable</h1>
      <select
        ref={node => { inputReceivedTimeTableIndex = node }}
        onChange={() => onSelectReceivedTimeTable(receivedTimeTables[inputReceivedTimeTableIndex.value], inputReceivedTimeTableIndex.value)}
      >
        {receivedTimeTables.map((value, index) =>
          <option
            key={value.id}
            value={index}
          >{value.receivedAt === null ? '[New] ' : ''}{value.title}{' '}[From]{' '}{value.sender}</option>
        )}
      </select>
      <h2>sender: {receivedTimeTable.sender}</h2>
      <TimeTable
        {...receivedTimeTable}
        canModify={false}
        canDelete
        canCopyToMy
        onDeleteTimeTable={(timeTableId) => timeTableId !== null ? onDeleteTimeTable(timeTableId, 'received', receivedTimeTables) : console.log('There is no timetable')}
      />
    </div>
  )
}

ReceiveTab.propTypes = {
  myTimeTable: PropTypes.object,
  receivedTimeTables: PropTypes.array,
  receivedTimeTable: PropTypes.object,
  onSelectReceivedTimeTable: PropTypes.func,
  onUpdateMyTimeTable: PropTypes.func,
  onDeleteTimeTable: PropTypes.func,
}

export default ReceiveTab
