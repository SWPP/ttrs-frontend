import React from 'react'
import Classroom from '../Classroom'

const TimeSlot = ({ dayOfWeek, startTime, endTime, classroom }) => (
  <div>
    {`${dayOfWeek}요일 ${startTime}-${endTime}`}
    <Classroom {...classroom} />
  </div>
)

export default TimeSlot
