import React from 'react'

const SemesterSwitcher = ({ isMainPage, semesters, onSwitchSemester }) => {
  let input
  const option = []
  semesters.forEach(semester => {
    option.push(`${semester.year}-${semester.semester}`)
  })

  const onSubmit = () => {
    let newYear = input.value.substring(0, 4)
    let newSemester = input.value.substring(5, input.value.length)
    onSwitchSemester(newYear, newSemester)
  }

  if (isMainPage) {
    return (
      <div>
        <select ref={node => { input = node }} onChange={onSubmit}>
          {option.map(value =>
            <option
              key={value}
              value={value}
            >{value}</option>
          )}
        </select>
      </div>
    )
  }
  return null
}

export default SemesterSwitcher
