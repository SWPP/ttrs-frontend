import React from 'react'
import Button from '../../atoms/Button'
import LecturePopup from '../LecturePopup'


const TimeTable = ({ username, id, memo, title, lectures, notRecommends, canModify, canCopyToMy, canDelete, onModifyContent, onDeleteLecture, onAddToNotRecommends, onBookmark, onSend, onCopyToMy, onDeleteTimeTable }) => {
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
    if (username === inputReceiverName.value) {
      console.log('Can not send TimeTable to you')
      return
    }
    const sendInfo = {
      timeTableId: id,
      receiverName: inputReceiverName.value,
    }
    onSend(sendInfo)
  }

  function overlap(_time, _start, _end) {
    let time = _time.split(':').map((i) => Number(i))
    time = time[0] * 60 + time[1]

    let start = _start.split(':').map((i) => Number(i))
    start = start[0] * 60 + start[1]

    let end = _end.split(':').map((i) => Number(i))
    end = end[0] * 60 + end[1]

    return time < end && start < (time + 30)
  }

  function hasLecture(lectures, day, time) {
    let i
    let j
    for (i = 0; i < lectures.length; i += 1) {
      const timeSlots = lectures[i].timeSlots
      for (j = 0; j < timeSlots.length; j += 1) {
        const timeSlot = timeSlots[j]
        const d = timeSlot.dayOfWeek
        const s = timeSlot.startTime
        const e = timeSlot.endTime

        if (d === day && overlap(time, s, e)) {
          return i
        }
      }
    }

    return -1
  }

  function isStart(_time, _start) {
    let time = _time.split(':').map((i) => Number(i))
    time = time[0] * 60 + time[1]

    let start = _start.split(':').map((i) => Number(i))
    start = start[0] * 60 + start[1]

    return time <= start && start < (time + 30)
  }

  function isLectureStart(lectures, day, time) {
    let i
    let j
    for (i = 0; i < lectures.length; i += 1) {
      const timeSlots = lectures[i].timeSlots
      for (j = 0; j < timeSlots.length; j += 1) {
        const timeSlot = timeSlots[j]

        const d = timeSlot.dayOfWeek
        const s = timeSlot.startTime

        if (d === day && isStart(time, s)) {
          return i
        }
      }
    }

    return -1
  }

  function getRowSpan(lecture, day) {
    let i

    const timeSlots = lecture.timeSlots

    for (i = 0; i < timeSlots.length; i += 1) {
      const timeSlot = timeSlots[i]

      if (timeSlot.dayOfWeek === day) {
        const s = timeSlot.startTime
        const e = timeSlot.endTime

        let start = s.split(':').map((i) => Number(i))
        start = start[0] * 60 + start[1]

        let end = e.split(':').map((i) => Number(i))
        end = end[0] * 60 + end[1]

        return Math.ceil((end - start) / 30)
      }
    }
    return 0
  }

  function createTimeSlot(day, time) {
    if (hasLecture(lectures, day, time) >= 0) {
      const lectureIndex = isLectureStart(lectures, day, time)
      if (lectureIndex >= 0) {
        const span = getRowSpan(lectures[lectureIndex], day)
        return (
          <td style={{border: '1px solid black'}} rowSpan={span}>
            <LecturePopup props={{ lecture: lectures[lectureIndex], height: span, deleteLecture: onDeleteLecture, addToNotRecommends: onAddToNotRecommends, notRecommends: notRecommends }} />
          </td>
        )
      }
      return null
    }

    return (<td style={{ border: '1px solid black', width: '200px', height: '30px' }} />)
  }

  function createRow(time) {
    return ['월', '화', '수', '목', '금', '토'].map((day) => createTimeSlot(day, time))
  }

  function createTimeTable() {
    return (
      <table>
        <tbody>
          <tr><th>Time</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thr</th><th>Fri</th><th>Sat</th></tr>
          {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
            '13:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
            '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'].map((time) => (
              <tr><td>{time}</td>{createRow(time)}</tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      { canModify && <input ref={node => { titleContent = node }} placeholder={'title'} /> }
      { canModify && <Button type="submit" onClick={onSubmitTitle}>Modify Title</Button> } <br />
      <h2>{titleContent}</h2>
      { canDelete && <Button type="submit" onClick={() => onDeleteTimeTable(id)}>Delete</Button> } <br />
      <Button type="submit" onClick={() => onBookmark(id)}>Bookmark</Button> <br />
      { canCopyToMy && <Button type="submit" onClick={() => onCopyToMy(id)}>Copy to My</Button> } <br />
      <input ref={node => { inputReceiverName = node }} placeholder={'username'} />
      <Button type="submit" onClick={onSubmitSend}>Send TimeTable</Button> <br />
      {createTimeTable()}
      <br />
      { canModify && <input ref={node => { memoContent = node }} placeholder={'memo'} /> }
      { canModify && <Button type="submit" onClick={onSubmitMemo}>Modify Memo</Button> } <br />
      {memoContent}
    </div>
  )
}

export default TimeTable
