import React from 'react'
import Course from '../Course'
import TimeSlot from '../TimeSlot'


const Lecture = ({ id, course, timeSlots, rating, instructor, note }) => {
  function showLectureInfo() {
    const info = `${course.name}\n${instructor}\n${note}`
    alert(info)
  }

  return (
    <div>
      <h3>Rating = {rating}</h3>
      <Course {...course} />
      {timeSlots.map(timeSlot =>
        <TimeSlot
          key={timeSlot.id}
          {...timeSlot}
        />
      )}
      <button onClick={showLectureInfo}>Info</button>
    </div>
  )
}

export default Lecture
