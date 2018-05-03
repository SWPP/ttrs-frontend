import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font } from 'styled-theme'
import Memo from '../../../components/atoms/Memo'


const Styledul = styled.ul`
  font-family: ${font('primary')};
`

export const TimeTable = ({ memoList , isSignedIn }) => {
  if (isSignedIn) {
    return (
      <Styledul>
        Memo
        {memoList.map(content =>
          <Memo
            key={content.id}
            content={content}
          />
        )}
      </Styledul>
    )
  }
  return null
}

TimeTable.propTypes = {
  memoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string
  })),
  isSignedIn: PropTypes.bool,
}

export default TimeTable
