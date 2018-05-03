import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font } from 'styled-theme'

const Styledli = styled.li`
  font-family: ${font('primary')};
`

const Title = ({ content }) => (
  <Styledli>
    { content }
  </Styledli>
)


Promise.propTypes = {
  content: PropTypes.string.isRequired,
}

export default Title
