import React from 'react'
import PropTypes from 'prop-types'
import Course from '../Course'
import TimeSlot from '../TimeSlot'


const Lecture = ({ id, course, timeSlots, year, semester, number, instructor, note }) => {
  function showLectureInfo() {
    const info = `${course.name}\n${instructor}`
    alert(info)
  }

  return (
    <div>
      <Course {...course} />
      {timeSlots.map(timeSlot =>
        <TimeSlot
          key={timeSlot.id}
          {...timeSlot}
        />
      )}
      <button onClick={showLectureInfo}>Info</button>
      {/* {`year = ${year} `} */}
      {/* {`semester = ${semester} `} */}
      {/* {`number = ${number} `} */}
      {/* {`instructor = ${instructor} `} */}
      {/* {`note = ${note} `} */}
    </div>
  )
}

Lecture.propTypes = {
  id: PropTypes.number,
}

export default Lecture
