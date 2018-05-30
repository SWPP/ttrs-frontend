import React from 'react'
import Lecture from '../../atoms/Lecture'
import Button from '../../atoms/Button'


const SearchLecture = ({ searchLectures, onSearchLecture, onAddLecture, notRecommends, onAddToNotRecommends }) => {
  let inputCourseName

  const onSubmitCourseName = () => {
    onSearchLecture(inputCourseName.value)
  }

  return (
    <div>
      <input ref={node => { inputCourseName = node }} placeholder={'type course name'} /> <br />
      <Button type="submit" onClick={onSubmitCourseName}>Search</Button>
      <br />
      <h2>Lectures</h2>
      {searchLectures.map(lecture =>
        <div key={lecture.id}>
          <hr />
          <Lecture
            {...lecture}
          />
          <Button
            type="submit"
            onClick={() => onAddLecture(lecture.id)}
          >Add To TimeTable</Button>
          <Button
            type="submit"
            onClick={() => onAddToNotRecommends(notRecommends, lecture.course.id)}
          >Not Recommend</Button>
        </div>
      )}
    </div>
  )
}

export default SearchLecture
