import React from 'react'
import Memo from '../../atoms/Memo'
import Title from '../../atoms/Title'
import Button from '../../atoms/Button'
import Lecture from '../../atoms/Lecture'


export const TimeTable = ({ isSignedIn, memo, title, lecturesOfMyTimeTable, onModifyMemo, onModifyTitle }) => {
  let titleContent = title
  let memoContent = memo

  const onSubmitMemo = () => {
    onModifyMemo(memoContent.value)
  }

  const onSubmitTitle = () => {
    onModifyTitle(titleContent.value)
  }

  if (isSignedIn) {
    console.log(lecturesOfMyTimeTable)
    return (
      <div>
        <input ref={node => { titleContent = node }} placeholder={'title'} /> <br />
        <Title content={titleContent} />
        <Button type='submit' onClick={onSubmitTitle}>Modify Title</Button>
        <br />
        TimeTable
        {lecturesOfMyTimeTable.map(lecture =>
          <Lecture
            key={lecture.id}
            {...lecture}
          />
        )} <br />
        <input ref={node => { memoContent = node }} placeholder={'memo'} /> <br />
        <Memo content={memoContent} />
        <Button type='submit' onClick={onSubmitMemo}>Modify Memo</Button>
      </div>
    )
  }
  return null
}

export default TimeTable
