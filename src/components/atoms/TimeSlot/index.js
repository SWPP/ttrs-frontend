import React from 'react'
import Classroom from '../Classroom'

const TimeSlot = ({ dayOfWeek, startTime, endTime, classroom }) => (
  <span>
    {`${dayOfWeek}요일 ${startTime}-${endTime} `}
    <Classroom {...classroom} />
  </span>
)

export default TimeSlot
