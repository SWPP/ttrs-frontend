import React from 'react'
import Course from '../Course'
import TimeSlot from '../TimeSlot'

const Lecture = ({ course, time_slots, year, semester, number, instructor, note }) => (
  <div>
    <Course {...course} />
    {time_slots.map(timeSlot =>
      <TimeSlot
        key={timeSlot.id}
        {...timeSlot}
      />
    )}
    {"year = "+year+" "}
    {"semester = "+semester+" "}
    {"number = "+number+" "}
    {"instructor = "+instructor+" "}
    {"note = "+note+" "}
  </div>
)

export default Lecture
