import React from 'react'
import Button from '../../atoms/Button'
import Lecture from '../../atoms/Lecture'


const TimeTable = ({ id, memo, title, lectures, onModifyMemo, onModifyTitle }) => {
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
    myTimeTable.memo = memoContent.value
    onModifyMemo(myTimeTable)
  }

  const onSubmitTitle = () => {
    if (myTimeTable.id === null) {
      console.log('There is no TimeTable')
      return
    }
    myTimeTable.title = titleContent.value
    onModifyTitle(myTimeTable)
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
        </div>
      )} <br />
      <input ref={node => { memoContent = node }} placeholder={'memo'} />
      <Button type="submit" onClick={onSubmitMemo}>Modify Memo</Button> <br />
      {memoContent}
    </div>
  )
}

export default TimeTable
