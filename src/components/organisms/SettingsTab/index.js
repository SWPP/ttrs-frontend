import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const SettingsTab = (props) => {
  return (
    <Wrapper {...props}>content</Wrapper>
  )
}

SettingsTab.propTypes = {
  reverse: PropTypes.bool,
}

export default SettingsTab
