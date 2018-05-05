import React, { PropTypes } from 'react'
import Memo from '../../atoms/Memo'
import TimeSlot from '../../atoms/TimeSlot'
import Title from '../../atoms/Title'
import Button from '../../atoms/Button'


export const TimeTable = ({ isSignedIn, memo, title, timeSlotList, onModifyMemo, onModifyTitle }) => {
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
        TimeTable
        {timeSlotList.map(timeSlot =>
          <TimeSlot
            key={timeSlot.id}
            dayOfWeek={timeSlot.dayOfWeek}
            startTime={timeSlot.startTime}
            endTime={timeSlot.endTime}
            classroom={timeSlot.classroom}
          />
        )}
        <input ref={node => { memoContent = node }} placeholder={'memo'} /> <br />
        <Memo content={memoContent} />
        <Button type="submit" onClick={onSubmitMemo}>Modify Memo</Button>
      </div>
    )
  }
  return null
}

/* Maybe will not use this*/
// TimeTable.propTypes = {
//   isSignedIn: PropTypes.bool,
//   memo: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   timeSlotList: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     dayOfWeek: PropTypes.string,
//     startTime: PropTypes.string,
//     endTime: PropTypes.string,
//     classroom: PropTypes.string,
//   })),
//   onModifyMemo: PropTypes.func.isRequired,
//   onModifyTitle: PropTypes.func.isRequired,
// }

export default TimeTable
