import React from 'react'
import styled from 'styled-components'
import { font } from 'styled-theme'
import Classroom from '../Classroom'

const Styledli = styled.li`
  font-family: ${font('primary')};
`

const TimeSlot = ({ day_of_week, start_time, end_time, classroom }) => (
  <Styledli>
    {"dayOfWeek = "+day_of_week+" "}
    {"startTime = "+start_time+" "}
    {"endTime = "+end_time+" "}
    <Classroom {...classroom} />
  </Styledli>
)

export default TimeSlot
