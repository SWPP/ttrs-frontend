import React from 'react'

const Lecture = ({ year, semester, number, instructor, note }) => (
  <div>
    {"year = "+year+" "}
    {"semester = "+semester+" "}
    {"number = "+number+" "}
    {"instructor = "+instructor+" "}
    {"note = "+note+" "}
  </div>
)

export default Lecture
