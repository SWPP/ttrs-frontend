import React from 'react'
import Button from '../../atoms/Button'
import LecturePopup from '../LecturePopup'


const TimeTable = ({ id, memo, title, lectures, canDeleteLecture, onModifyContent, onDeleteLecture, onBookmark }) => {
  let titleContent = title
  let memoContent = memo

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

  function overlap(_time, _start, _end) {
    let time = _time.split(':').map((i) => Number(i))
    time = time[0] * 60 + time[1]

    let start = _start.split(':').map((i) => Number(i))
    start = start[0] * 60 + start[1]

    let end = _end.split(':').map((i) => Number(i))
    end = end[0] * 60 + end[1]

    if (time < end && start < time + 30) {
      return true
    }
    return false
  }

  function hasLecture(lectures, day, time) {
    let i
    let j
    for (i = 0; i < lectures.length; ++i) {
      const timeSlots = lectures[i].timeSlots
      for (j = 0; j < timeSlots.length; ++j) {
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

    if (time <= start && start < time + 30) {
      return true
    }
    return false
  }

  function isLectureStart(lectures, day, time) {
    let i
    let j
    for (i = 0; i < lectures.length; ++i) {
      const timeSlots = lectures[i].timeSlots
      for (j = 0; j < timeSlots.length; ++j) {
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
    console.log(timeSlots)

    for (i = 0; i < timeSlots.length; ++i) {
      const timeSlot = timeSlots[i]
      console.log('timeSlot', timeSlot)

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
            <LecturePopup props={{lecture: lectures[lectureIndex], height: span, deleteLecture: onDeleteLecture}}/>
          </td>
        )
      } else {
        return
      }
    }

    return (<td style={{ border: '1px solid black', width: '200', height: '30' }} />)
  }


  function createRow(time) {
    return ['월', '화', '수', '목', '금', '토'].map((day) => createTimeSlot(day, time))
  }

  function createTimeTable() {
    const tableHeader = (
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

    return tableHeader
  }

  return (
    <div>
      <input ref={node => { titleContent = node }} placeholder={'title'} />
      <Button type="submit" onClick={onSubmitTitle}>Modify Title</Button> <br />
      <h2>{titleContent}</h2>
      <Button type="submit" onClick={() => onBookmark(id)}>Bookmark</Button> <br />
      {createTimeTable()}
      <br />
      <input ref={node => { memoContent = node }} placeholder={'memo'} />
      <Button type="submit" onClick={onSubmitMemo}>Modify Memo</Button> <br />
      {memoContent}
    </div>
  )
}


export default TimeTable
