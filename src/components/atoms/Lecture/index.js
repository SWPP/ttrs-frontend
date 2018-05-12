import React from 'react'
import Course from '../Course'
import TimeSlot from '../TimeSlot'
import Button from '../Button'

const Lecture = ({ course, timeSlots, year, semester, number, instructor, note, onAddLectureToTimeTable }) => (
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
    <Button type="submit" onClick={onAddLectureToTimeTable}>Add To TimeTable</Button>
  </div>
)

export default Lecture
