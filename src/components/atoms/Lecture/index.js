import React from 'react'
import Course from '../Course'
import TimeSlot from '../TimeSlot'

const Lecture = ({ id, course, timeSlots, rating }) => {
  return (
    <div>
      <h3>Rating = {Math.round(rating * 10) / 10}</h3>
      <Course {...course} />
      {timeSlots.map(timeSlot =>
        <TimeSlot
          key={timeSlot.id}
          {...timeSlot}
        />
      )}
    </div>
  )
}

export default Lecture
