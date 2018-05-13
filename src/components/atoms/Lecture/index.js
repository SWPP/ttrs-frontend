import React from 'react'
import Course from '../Course'
import TimeSlot from '../TimeSlot'

const Lecture = ({ id, course, timeSlots, year, semester, number, instructor, note, onAddLectureToTimeTable }) => (
  <div>
    <Course {...course} />
    {timeSlots.map(timeSlot =>
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
