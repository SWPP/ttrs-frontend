import React from 'react'
import PropTypes from 'prop-types'
import { Dimmer, Dropdown, Grid, Loader } from 'semantic-ui-react'

const SemesterSwitcher = ({ semesters, onSwitchSemester, myTimeTableLoading, bookmarkedTimeTableLoading, receivedTimeTableLoading, recommendedTimeTableLoading }) => {
  const options = semesters.map((semester, index) => ({
    key: `${semester.year}-${semester.semester}`,
    text: `${semester.year}-${semester.semester}`,
    value: index,
  }))

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Dimmer active={myTimeTableLoading || bookmarkedTimeTableLoading || receivedTimeTableLoading || recommendedTimeTableLoading}>
            <Loader />
          </Dimmer>
          <Dropdown
            simple item scrolling
            options={options}
            defaultValue={options.length > 0 ? options[0].value : null}
            onChange={(e, { value }) => {
              onSwitchSemester(semesters[value].year, semesters[value].semester)
            }}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

SemesterSwitcher.propTypes = {
  semesters: PropTypes.array,
  myTimeTableLoading: PropTypes.bool,
  bookmarkedTimeTableLoading: PropTypes.bool,
  receivedTimeTableLoading: PropTypes.bool,
  recommendedTimeTableLoading: PropTypes.bool,
  onSwitchSemester: PropTypes.func,
}

export default SemesterSwitcher
