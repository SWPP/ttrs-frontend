import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

const SemesterSwitcher = ({ semesters, onSwitchSemester }) => {
  const options = semesters.map((semester, index) => ({
    key: `${semester.year}-${semester.semester}`,
    text: `${semester.year}-${semester.semester}`,
    value: index,
  }))

  return (
    <Dropdown
      simple item scrolling
      options={options}
      defaultValue={options.length > 0 ? options[0].value : null}
      onChange={(e, { value }) => {
        onSwitchSemester(semesters[value].year, semesters[value].semester)
      }}
    />
  )
}

SemesterSwitcher.propTypes = {
  semesters: PropTypes.array,
  onSwitchSemester: PropTypes.func,
}

export default SemesterSwitcher
