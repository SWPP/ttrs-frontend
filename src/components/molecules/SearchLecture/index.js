import React from 'react'
import Course from '../../atoms/Course'
import TimeSlot from '../../atoms/TimeSlot'
import Button from '../../atoms/Button'
import Lecture from '../../atoms/Lecture'


export const SearchLecture = ({ isSignedIn, lectureList, onSearchLecture }) => {
  let inputCourseName

  const onSubmitCourseName = () => {
    onSearchLecture(inputCourseName.value)
  }

  if (isSignedIn) {
    return (
      <div>
        <input ref={node => { inputCourseName = node }} placeholder={'type course name'} /> <br />
        <Button type="submit" onClick={onSubmitCourseName}>Search</Button>
        <br />
        Lectures
        {lectureList.map(lecture =>
          <Course
            key={lecture.course.id}
            {...lecture.course}
          />,
          <TimeSlot
            key={lecture.time_slots.id}
            {...lecture.time_slots}
          />,
          <Lecture
            key={lecture.id}
            {...lecture}
          />
        )}
      </div>
    )
  }
  return null
}

export default SearchLecture
