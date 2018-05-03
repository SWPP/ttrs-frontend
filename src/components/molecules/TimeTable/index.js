import React, { PropTypes } from 'react'
import Memo from '../../atoms/Memo'
import Button from '../../atoms/Button'

export const TimeTable = ({ isSignedIn, memo, onModifyMemo }) => {
  let content = memo
  const onSubmit = () => {
    onModifyMemo(content.value)
  }

  if (isSignedIn) {
    return (
      <div>
        Memo
        <input ref={node => { content = node }} placeholder={'memo'} /> <br />
        <Memo content={content} />
        <Button type="submit" onClick={onSubmit}>Modify Memo</Button>
      </div>
    )
  }
  return null
}

TimeTable.propTypes = {
  isSignedIn: PropTypes.bool,
  memo: PropTypes.string.isRequired,
  onModifyMemo: PropTypes.func.isRequired,
}

export default TimeTable
