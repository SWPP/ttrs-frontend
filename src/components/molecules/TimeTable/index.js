import React, { PropTypes } from 'react'
import Memo from '../../atoms/Memo'
import Title from '../../atoms/Title'
import Button from '../../atoms/Button'

export const TimeTable = ({ isSignedIn, memo, title, onModifyMemo, onModifyTitle }) => {
  let titleContent = title
  let memoContent = memo
  const onSubmitMemo = () => {
    onModifyMemo(memoContent.value)
  }

  const onSubmitTitle = () => {
    onModifyTitle(titleContent.value)
  }

  if (isSignedIn) {
    return (
      <div>
        <input ref={node => { titleContent = node }} placeholder={'title'} /> <br />
        <Title content={titleContent} />
        <Button type="submit" onClick={onSubmitTitle}>Modify Title</Button>
        <br />
        <input ref={node => { memoContent = node }} placeholder={'memo'} /> <br />
        <Memo content={memoContent} />
        <Button type="submit" onClick={onSubmitMemo}>Modify Memo</Button>
      </div>
    )
  }
  return null
}

TimeTable.propTypes = {
  isSignedIn: PropTypes.bool,
  memo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onModifyMemo: PropTypes.func.isRequired,
}

export default TimeTable
