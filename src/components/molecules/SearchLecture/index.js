import React from 'react'
import Lecture from '../../atoms/Lecture'
import Button from '../../atoms/Button'


const SearchLecture = ({ searchLectures, onSearchLecture, onAddLecture }) => {
  let inputCourseName

  const onSubmitCourseName = () => {
    onSearchLecture(inputCourseName.value)
  }

  return (
    <div>
      <input ref={node => { inputCourseName = node }} placeholder={'type course name'} /> <br />
      <Button type='submit' onClick={onSubmitCourseName}>Search</Button>
      <br />
      Lectures
      {searchLectures.map(lecture =>
        <div key={lecture.id}>
          <Lecture
            {...lecture}
          />
          <Button
            type='submit'
            onClick={() => onAddLecture(lecture.id)}
          >Add To TimeTable</Button>
        </div>
      )}
    </div>
  )
}

export default SearchLecture
