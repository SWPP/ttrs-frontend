import React from 'react'
import PropTypes from 'prop-types'
import Lecture from '../../atoms/Lecture'
import Button from '../../atoms/Button'
import LecturePopup from '../../../containers/LecturePopup'

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
          <LecturePopup
            lecture={lecture}
            height={1}
            onAddToNotRecommends={(notRecommends, courseId) => onAddToNotRecommends(notRecommends, courseId)}
            notRecommends={notRecommends}
            canDelete={false}
          />
        </div>
      )}
    </div>
  )
}

SearchLecture.propTypes = {
  searchLectures: PropTypes.array,
  onSearchLecture: PropTypes.func,
  onAddLecture: PropTypes.func,
  notRecommends: PropTypes.array,
  onAddToNotRecommends: PropTypes.func,
}

export default SearchLecture
