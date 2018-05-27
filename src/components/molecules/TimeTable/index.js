import React from 'react'
import Button from '../../atoms/Button'
import Lecture from '../../atoms/Lecture'


const TimeTable = ({ id, memo, title, lectures, canDeleteLecture, onModifyContent, onDeleteLecture, onBookmark, onSendTimeTable }) => {
  let titleContent = title
  let memoContent = memo
  let inputReceiverName

  const onSubmitMemo = () => {
    if (id === null) {
      console.log('There is no TimeTable')
      return
    }
    onModifyContent({ memo: memoContent.value })
  }
  const onSubmitTitle = () => {
    if (id === null) {
      console.log('There is no TimeTable')
      return
    }
    onModifyContent({ title: titleContent.value })
  }
  const onSubmitSend = () => {
    if (id === null) {
      console.log('There is no TimeTable')
      return
    }
    const sendInfo = {
      timeTableId: id,
      receiverName: inputReceiverName.value,
    }
    onSendTimeTable(sendInfo)
  }

  return (
    <div>
      <input ref={node => { titleContent = node }} placeholder={'title'} />
      <Button type="submit" onClick={onSubmitTitle}>Modify Title</Button> <br />
      <h2>{titleContent}</h2>
      <Button type="submit" onClick={() => onBookmark(id)}>Bookmark</Button> <br />
      <input ref={node => { inputReceiverName = node }} placeholder={'username'} />
      <Button type="submit" onClick={onSubmitSend}>Send TimeTable</Button> <br />
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
