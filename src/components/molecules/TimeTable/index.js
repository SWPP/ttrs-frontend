import React from 'react'
import Button from '../../atoms/Button'
import Lecture from '../../atoms/Lecture'


const TimeTable = ({ id, memo, title, lectures, onModifyMemo, onModifyTitle, onDeleteLecture }) => {
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

  function overlap(time, start, end) {
    let t = time.split(':').map((i) => Number(i))
    t = t[0] * 100 + 5*(t[1]/3)
    let s = start.split(':').map((i) => Number(i))
    s = s[0] * 100 + 5*(s[1]/3)
    let e = end.split(':').map((i) => Number(i))
    e = e[0] * 100 + 5*(e[1]/3)

    if ((t <= s && s < t + 50) || (s < t && t < e) ||(t <= e && e <= t + 50)) {
      console.log(t, s, e)
      return true
    }
    return false
  }

  function hasLecture(lectures, day, time) {
    let i, j
    for (i = 0; i < lectures.length; ++i) {
      const timeSlots = lectures[i].timeSlots
      for (j = 0; j < timeSlots.length; ++j) {
        const timeSlot = timeSlots[j]
        const d = timeSlot.dayOfWeek
        const s = timeSlot.startTime
        const e = timeSlot.endTime

        if (d === day && overlap(time, s, e)) { return i }
      }
    }

    return -1
  }


  function popLectureInfo(idx) {
    const lecture = lectures[idx]
    console.log(lecture)
    const info = `<${lecture.course.name}>의 정보...`
    alert(info)
  }

  function createTimeSlot(day, time) {
    const lecture = hasLecture(lectures, day, time)
    if (lecture >= 0) {
      return (
        <td>
          <button onClick={() => popLectureInfo(lecture)}>{lectures[lecture].course.name}</button>
        </td>
      )
    }

    return (<td><button /></td>)
  }


  function createRow(time) {
    return ['월', '화', '수', '목', '금', '토'].map((day) => createTimeSlot(day, time))
  }

  function createTimeTable() {
    const tableHeader = (
      <table>
        <tr><th>Time</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thr</th><th>Fri</th><th>Sat</th></tr>
        {['9:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
          '13:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
          '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'].map((time) => (
            <tr><td>{time}</td>{createRow(time)}</tr>
        ))}
      </table>
    )

    return tableHeader
  }

  return (
    <div>
      <input ref={node => { titleContent = node }} placeholder={'title'} />
      <Button type="submit" onClick={onSubmitTitle}>Modify Title</Button> <br />
      <h2>{titleContent}</h2>
      {createTimeTable()}
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
