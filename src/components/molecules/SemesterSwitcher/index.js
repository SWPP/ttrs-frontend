import React from 'react'

const SemesterSwitcher = ({ isMainPage, semesters, onSwitchSemester }) => {
  let input
  const option = []
  semesters.forEach(semester => {
    option.push(`${semester.year}-${semester.semester}`)
  })

  const onSubmit = () => {
    const newYear = semesters[input.value].year
    const newSemester = semesters[input.value].semester
    onSwitchSemester(newYear, newSemester)
  }

  if (isMainPage) {
    return (
      <div>
        <select ref={node => { input = node }} onChange={onSubmit}>
          {option.map((value, index) =>
            <option
              key={value}
              value={index}
            >{value}</option>
          )}
        </select>
      </div>
    )
  }
  return null
}

export default SemesterSwitcher
