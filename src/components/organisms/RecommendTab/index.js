import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Form, Grid, Progress } from 'semantic-ui-react'
import TimeTable from '../../../containers/TimeTable'

export const getLectureIds = (timeTable) => {
  const lectureIds = []
  timeTable.lectures.forEach((lecture) => {
    lectureIds.push(lecture.id)
  })
  return lectureIds
}

export const getLectureIdsWithout = (lectureId, timeTable) => {
  const lectureIds = []
  timeTable.lectures.forEach((lecture) => {
    if (lecture.id !== lectureId) {
      lectureIds.push(lecture.id)
    }
  })
  return lectureIds
}

class RecommendTab extends React.Component {
  state = {
    recommendedTimeTableIndex: 0,
    avoidSuccessiveLecture: false,
    avoidVoidLecture: false,
    avoidFirstLecture: false,
    jeonpilWeight: '250',
    jeonseonWeight: '250',
    gyoyangWeight: '250',
    creditUserWant: '15',
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const weightSum = (this.state.jeonpilWeight * 1) + (this.state.jeonseonWeight * 1) + (this.state.gyoyangWeight * 1)

    return (
      <div>
        <h1>My TimeTable</h1>
        <TimeTable
          {...this.props.myTimeTable}
          isRecommended={false}
          haveSidebar={false}
          canModify
          canDelete
          canCreate
          canCopyToMy={false}
          onAddLecture={(newLectureId) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, { lectures: getLectureIds(this.props.myTimeTable) }, newLectureId)}
          onDeleteLecture={(lectureId) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, { lectures: getLectureIdsWithout(lectureId, this.props.myTimeTable) }, -lectureId)}
          onModifyContent={(content) => this.props.onUpdateMyTimeTable(this.props.myTimeTable.id, content, null)}
          onDeleteTimeTable={(timeTableId) => timeTableId !== null ? this.props.onDeleteTimeTable(timeTableId, 'my', null) : console.log('There is no timetable')}
        />
        <Divider />
        <h1>Recommended TimeTable</h1>
        <Form>
          <Grid>
            <Grid.Row columns={5}>
              <Grid.Column>
                <Form.Radio
                  label="연강 회피"
                  toggle
                  onChange={() => this.setState({ avoidSuccessiveLecture: !this.state.avoidSuccessiveLecture })}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Radio
                  label="공강 회피"
                  toggle
                  onChange={() => this.setState({ avoidVoidLecture: !this.state.avoidVoidLecture })}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Radio
                  label="1교시 회피"
                  toggle
                  onChange={() => this.setState({ avoidFirstLecture: !this.state.avoidFirstLecture })}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={4}>
              <Grid.Column>
                <Progress
                  label="전필 가중치"
                  percent={Math.round((this.state.jeonpilWeight * 100) / weightSum)}
                  progress
                  color="orange"
                />
                <Form.Input
                  style={{ marginTop: -10 }}
                  type="range"
                  name="jeonpilWeight"
                  min={1}
                  max={500}
                  step={1}
                  value={this.state.jeonpilWeight}
                  onChange={this.handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Progress
                  label="전선 가중치"
                  percent={Math.round((this.state.jeonseonWeight * 100) / weightSum)}
                  progress
                  color="blue"
                />
                <Form.Input
                  style={{ marginTop: -10 }}
                  type="range"
                  name="jeonseonWeight"
                  min={1}
                  max={500}
                  step={1}
                  value={this.state.jeonseonWeight}
                  onChange={this.handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Progress
                  label="교양 가중치"
                  percent={Math.round((this.state.gyoyangWeight * 100) / weightSum)}
                  progress
                  color="green"
                />
                <Form.Input
                  style={{ marginTop: -10 }}
                  type="range"
                  name="gyoyangWeight"
                  min={1}
                  max={500}
                  step={1}
                  value={this.state.gyoyangWeight}
                  onChange={this.handleChange}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={4} style={{ marginTop: -15 }}>
              <Grid.Column>
                <Form.Input
                  label={`희망 학점: ${this.state.creditUserWant}`}
                  type="range"
                  name="creditUserWant"
                  min={1}
                  max={21}
                  step={1}
                  value={this.state.creditUserWant}
                  onChange={this.handleChange}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={8} style={{ marginTop: -15 }}>
              <Grid.Column /><Grid.Column /><Grid.Column /><Grid.Column /><Grid.Column />
              <Grid.Column>
                <Form.Button
                  color="teal"
                  content="Recommend"
                  loading={false}
                  onClick={this.props.onGetRecommendation}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
        <Divider />
        <TimeTable
          {...this.props.recommendedTimeTable}
          isRecommended
          onShowPrevRecommend={() => {
            this.props.onSelectRecommendedTimeTable(this.props.recommendedTimeTables[(this.props.recommendedTimeTables.length + this.state.recommendedTimeTableIndex - 1) % this.props.recommendedTimeTables.length])
            this.setState({ recommendedTimeTableIndex: (this.props.recommendedTimeTables.length + this.state.recommendedTimeTableIndex - 1) % this.props.recommendedTimeTables.length })
          }}
          onShowNextRecommend={() => {
            this.props.onSelectRecommendedTimeTable(this.props.recommendedTimeTables[(this.props.recommendedTimeTables.length + this.state.recommendedTimeTableIndex + 1) % this.props.recommendedTimeTables.length])
            this.setState({ recommendedTimeTableIndex: (this.props.recommendedTimeTables.length + this.state.recommendedTimeTableIndex + 1) % this.props.recommendedTimeTables.length })
          }}
          haveSidebar={false}
          canModify={false}
          canDelete={false}
          canCopyToMy
        />
      </div>
    )
  }
}

RecommendTab.propTypes = {
  myTimeTable: PropTypes.object,
  recommendedTimeTables: PropTypes.array,
  recommendedTimeTable: PropTypes.object,
  onSelectRecommendedTimeTable: PropTypes.func,
  onUpdateMyTimeTable: PropTypes.func,
  onDeleteTimeTable: PropTypes.func,
  onGetRecommendation: PropTypes.func,
}

export default RecommendTab
