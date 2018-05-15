import React from 'react'
import Button from '../../atoms/Button'
import Lecture from '../../atoms/Lecture'


const TimeTable = ({ id, memo, title, lectures, onModifyMemo, onModifyTitle, onDeleteLecture }) => {
  let titleContent = title
  let memoContent = memo
  let myTimeTable = {
    id,
    memo,
    title,
    lectures,
  }

  const onSubmitMemo = () => {
    if (myTimeTable.id === null) {
      console.log('There is no TimeTable')
      return
    }
    onModifyMemo(memoContent.value)
  }

  const onSubmitTitle = () => {
    if (myTimeTable.id === null) {
      console.log('There is no TimeTable')
      return
    }
    onModifyTitle(titleContent.value)
  }

  return (
    <div>
      <input ref={node => { titleContent = node }} placeholder={'title'} />
      <Button type="submit" onClick={onSubmitTitle}>Modify Title</Button> <br />
      {titleContent}
      <br /> <br />
      TimeTable
      {lectures.map(lecture =>
        <div key={lecture.id}>
          <hr />
          <Lecture
            {...lecture}
          />
          <Button
            type="submit"
            onClick={() => onDeleteLecture(lecture.id)}
          >Delete</Button>
        </div>
      )} <br />
      <input ref={node => { memoContent = node }} placeholder={'memo'} />
      <Button type="submit" onClick={onSubmitMemo}>Modify Memo</Button> <br />
      {memoContent}
    </div>
  )
}

export default TimeTable
