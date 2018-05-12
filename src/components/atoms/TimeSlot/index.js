import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font } from 'styled-theme'

const Styledli = styled.li`
  font-family: ${font('primary')};
`

const TimeSlot = ({ dayOfWeek, startTime, endTime, classroom }) => (
  <Styledli>
    {`dayOfWeek = ${dayOfWeek} `}
    {`startTime = ${startTime} `}
    {`endTime = ${endTime} `}
    {`classroom = ${classroom} `}
  </Styledli>
)


TimeSlot.propTypes = {
  dayOfWeek: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  classroom: PropTypes.string.isRequired,
}

export default TimeSlot
