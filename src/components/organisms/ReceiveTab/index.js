import React from 'react'
import { RECEIVE_TAB } from '../../../store/ttrs/selectors'
import TimeTable from '../../../containers/TimeTable'

const ReceiveTab = ({ isMainPage, currentTab, myTimeTable }) => {
  if (isMainPage && currentTab === RECEIVE_TAB) {
    return (
      <div>
        <TimeTable {...myTimeTable}/>
      </div>
    )
  }
  return null
}

export default ReceiveTab
