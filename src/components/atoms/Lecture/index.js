import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, List } from 'semantic-ui-react'
import TimeSlot from '../TimeSlot'
import LecturePopup from '../../../containers/LecturePopup'

class Lecture extends React.Component {
  state = {
    open: false,
  }

  render() {
    const lecture = this.props.lecture
    const course = lecture.course
    return (
      <Card>
        <Card.Content>
          <Card.Header>{course.name}</Card.Header>
          <Card.Meta>{`${course.college}${course.department ? ` ${course.department}` : ''}${course.major ? `(${course.major})` : ''}`}</Card.Meta>
          <Card.Meta>{`${course.type}${course.field ? `(${course.field})` : ''}`}</Card.Meta>
          <Card.Description>
            <List>
              <List.Item>
                <List.Icon name="arrow circle up" />
                <List.Content>
                  <List.Header>Credit</List.Header>
                  {course.credit} credit
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="user" />
                <List.Content>
                  <List.Header>Instructor</List.Header>
                  {lecture.instructor}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="time" />
                <List.Content>
                  <List.Header>Time Slots</List.Header>
                  {lecture.timeSlots.map(timeSlot =>
                    <div key={timeSlot.id}>
                      <TimeSlot
                        {...timeSlot}
                      />
                    </div>
                  )}
                </List.Content>
              </List.Item>
              {lecture.note &&
              <List.Item>
                <List.Icon name="sticky note" />
                <List.Content>
                  <List.Header>Note</List.Header>
                  {lecture.note}
                </List.Content>
              </List.Item>}
              <List.Item>
                <List.Icon name="star" />
                <List.Content>
                  <List.Header>Rating</List.Header>
                  {Math.round(lecture.rating * 10) / 10} / 10
                </List.Content>
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              basic
              color="green"
              content="Details"
              onClick={() => {
                this.setState({ open: true })
                this.props.onGetEvaluations(lecture.id)
              }}
            />
            <Button basic color="blue" content="Add" onClick={this.props.onAddLecture} />
            <LecturePopup
              open={this.state.open}
              lecture={lecture}
              canDelete={false}
              onAddToNotRecommends={this.props.onAddToNotRecommends}
              onClose={() => this.setState({ open: false })}
            />
          </div>
        </Card.Content>
      </Card>
    )
  }
}

Lecture.propTypes = {
  lecture: PropTypes.object,
  onAddLecture: PropTypes.func,
  onAddToNotRecommends: PropTypes.func,
  onGetEvaluations: PropTypes.func,
}

export default Lecture
