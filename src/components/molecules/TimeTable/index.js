import React from 'react'
import Button from '../../atoms/Button'
import Lecture from '../../atoms/Lecture'


export const TimeTable = ({ isMainPage, isSettingTab, memo, title, lectures, onModifyMemo, onModifyTitle }) => {
  let titleContent = title
  let memoContent = memo

  const onSubmitMemo = () => {
    onModifyMemo(memoContent.value)
  }

  const onSubmitTitle = () => {
    onModifyTitle(titleContent.value)
  }

  if (isMainPage && !isSettingTab) {
    return (
      <div>
        <input ref={node => { titleContent = node }} placeholder={'title'} />
        <Button type='submit' onClick={onSubmitTitle}>Modify Title</Button> <br />
        {titleContent}
        <br /> <br />
        TimeTable
        {lectures.map(lecture =>
          <Lecture
            key={lecture.id}
            {...lecture}
          />
        )} <br />
        <input ref={node => { memoContent = node }} placeholder={'memo'} />
        <Button type='submit' onClick={onSubmitMemo}>Modify Memo</Button> <br />
        {memoContent}
      </div>
    )
  }
  return null
}

export default TimeTable
