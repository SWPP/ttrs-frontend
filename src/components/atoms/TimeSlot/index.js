import React from 'react'
import styled from 'styled-components'
import { font } from 'styled-theme'
import Classroom from '../Classroom'


const Styledli = styled.li`
  font-family: ${font('primary')};
`

const TimeSlot = ({ dayOfWeek, startTime, endTime, classroom }) => (
  <Styledli>
    {`${dayOfWeek}요일 ${startTime}-${endTime}`}
    <Classroom {...classroom} />
  </Styledli>
)

export default TimeSlot
