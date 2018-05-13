import React from 'react'
import Lecture from '../../atoms/Lecture'
import Button from '../../atoms/Button'


export const SearchLecture = ({ isSignedIn, isRecommendTab, lectures, onSearchLecture, onAddLectureToMyTimeTable }) => {
  let inputCourseName

  const onSubmitCourseName = () => {
    onSearchLecture(inputCourseName.value)
  }

  if (isSignedIn && isRecommendTab) {
    return (
      <div>
        <input ref={node => { inputCourseName = node }} placeholder={'type course name'} /> <br />
        <Button type='submit' onClick={onSubmitCourseName}>Search</Button>
        <br />
        Lectures
        {lectures.map(lecture =>
          <div>
            key={lecture.id}
            <Lecture
            {...lecture}
            />
            <Button
              type='submit'
              onClick={() => onAddLectureToMyTimeTable(lecture.id)}
            >Add To TimeTable</Button>
          </div>
        )}
      </div>
    )
  }
  return null
}

export default SearchLecture
