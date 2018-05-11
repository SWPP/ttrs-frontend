import React from 'react'

const Course = ({ code, name, type, field, grade, credit, college, department, major }) => (
  <div>
    {"code = "+code+" "}
    {"name = "+name+" "}
    {"type = "+type+" "}
    {"field = "+field+" "}
    {"grade = "+grade+" "}
    {"credit = "+credit+" "}
    {"college = "+college+" "}
    {"department = "+department+" "}
    {"major = "+major+" "}
  </div>
)

export default Course
