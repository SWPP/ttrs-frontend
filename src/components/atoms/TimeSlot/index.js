import React from 'react'
import PropTypes from 'prop-types'

const TimeSlot = ({ dayOfWeek, startTime, endTime, classroom }) => (
  <span>
    {`${dayOfWeek}요일 ${startTime}-${endTime} `}
    {classroom && `${classroom.building}-${classroom.roomNo}`}
  </span>
)

TimeSlot.propTypes = {
  dayOfWeek: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  classroom: PropTypes.object,
}

export default TimeSlot
