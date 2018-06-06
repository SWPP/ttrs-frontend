import React from 'react'

const Classroom = ({ building, roomNo }) => (
  <span>
    {`${building}-${roomNo}`}
  </span>
)

export default Classroom
