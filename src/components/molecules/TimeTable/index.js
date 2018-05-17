import React from 'react'
import Button from '../../atoms/Button'
import Lecture from '../../atoms/Lecture'


const TimeTable = ({ id, memo, title, lectures, canDeleteLecture, onModifyMemo, onModifyTitle, onDeleteLecture, onBookmark }) => {
  let titleContent = title
  let memoContent = memo

  const onSubmitMemo = () => {
    if (id === null) {
      console.log('There is no TimeTable')
      return
    }
    onModifyMemo(memoContent.value)
  }

  const onSubmitTitle = () => {
    if (id === null) {
      console.log('There is no TimeTable')
      return
    }
    onModifyTitle(titleContent.value)
  }

  return (
    <div>
      <input ref={node => { titleContent = node }} placeholder={'title'} />
      <Button type="submit" onClick={onSubmitTitle}>Modify Title</Button> <br />
      <h2>{titleContent}</h2>
      <Button type="submit" onClick={() => onBookmark(id)}>Bookmark</Button> <br />
      {lectures.map(lecture =>
        <div key={lecture.id}>
          <hr />
          <Lecture
            {...lecture}
          />
          { canDeleteLecture &&
          <Button
            type="submit"
            onClick={() => onDeleteLecture(lecture.id)}
          >Delete</Button> }
        </div>
      )} <br />
      <input ref={node => { memoContent = node }} placeholder={'memo'} />
      <Button type="submit" onClick={onSubmitMemo}>Modify Memo</Button> <br />
      {memoContent}
    </div>
  )
}

export default TimeTable
