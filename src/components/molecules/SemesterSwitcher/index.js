import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Menu } from 'semantic-ui-react'

const SemesterSwitcher = ({ isMainPage, semesters, onSwitchSemester }) => {
  const options = semesters.map((semester) => ({
    key: `${semester.year}-${semester.semester}`,
    text: `${semester.year}-${semester.semester}`,
    value: semester,
  }))

  if (isMainPage) {
    return (
      <Menu compact>
        <Dropdown
          item
          options={options}
          defaultValue={options[0].value}
          onChange={(e, { value }) => {
            onSwitchSemester(value.year, value.semester)
          }}
        />
      </Menu>
    )
  }
  return null
}

SemesterSwitcher.propTypes = {
  isMainPage: PropTypes.bool,
  semesters: PropTypes.array,
  onSwitchSemester: PropTypes.func,
}

export default SemesterSwitcher
