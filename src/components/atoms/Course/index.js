import React from 'react'

const Course = ({ code, name, type, field, grade, credit, college, department, major }) => (
  <div>
    <h3>{name}</h3>
    {'code = '+code+' '}
    {'name = '+name+' '}
    {'type = '+type+' '}
    {'field = '+field+' '}
    {'grade = '+grade+' '}
    {'credit = '+credit+' '}
    {'college = '+college+' '}
    {'department = '+department+' '}
    {'major = '+major+' '}
  </div>
)

export default Course
