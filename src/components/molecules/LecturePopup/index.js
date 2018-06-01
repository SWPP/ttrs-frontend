import React from 'react'
import PropTypes from 'prop-types'
import { Button, Divider, Feed, Form, Grid, Header, Icon, List, Modal, Popup, Rating, Statistic, TextArea } from 'semantic-ui-react'
import TimeSlot from '../../atoms/TimeSlot'

class LecturePopup extends React.Component {
  state = {
    pop: false,
    editingId: null,
    rate: '',
    comment: '',
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleOpenPopup = () => {
    this.props.onGetEvaluations(this.props.lecture.id)
    this.setState({ pop: true })
  }

  handleAddEvaluation = () => {
    if (this.state.comment.trim()) {
      const evaluation = {
        rate: this.state.rate,
        comment: this.state.comment,
        lecture: this.props.lecture.id,
      }
      this.props.onAddEvaluation(this.props.lecture.id, evaluation)
    } else {
      console.log('There is no comment')
    }
  }

  handleModifyEvaluation = () => {
    if (this.state.comment.trim()) {
      const evaluation = {
        id: this.state.editingId,
        rate: this.state.rate,
        comment: this.state.comment,
      }
      this.props.onModifyEvaluation(this.props.lecture.id, evaluation)
    } else {
      console.log('There is no comment')
    }
    this.setState({ editingId: null })
  }

  handleDeleteEvaluation = (evaluationId) => {
    this.props.onDeleteEvaluation(this.props.lecture.id, evaluationId)
    this.setState({
      editingId: null,
      rate: 0,
      comment: '',
    })
  }

  handleToggleLikeIt = (evaluation) => {
    const isAdd = !evaluation.likeIt.includes(this.props.userId)
    this.props.onToggleLikeIt(this.props.lecture.id, isAdd, evaluation.id)
  }

  render() {
    const lecture = this.props.lecture
    const course = lecture.course
    const evaluations = this.props.evaluations
    const MiniIconButtonStyle = {
      backgroundColor: 'white',
      margin: 0,
      padding: 2,
    }
    const iconButtonStyle = {
      backgroundColor: 'white',
      margin: 0,
      padding: 5,
    }

    return (
      <div>
        <button style={{ padding: 0, width: 100, height: this.props.height * 35 }} onClick={this.handleOpenPopup}>{this.props.lecture.course.name}</button>
        <Modal
          open={this.state.pop}
          onClose={() => this.setState({ pop: false, editingId: null })}
          style={{
            marginTop: '0px !important',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Modal.Header>
            {course.name}
            <Popup
              trigger={<button
                className="large ui icon button"
                onClick={() => this.setState({ isIgnoringLecture: true })}
                style={iconButtonStyle}
              >
                <Icon name="remove" color="red" />
              </button>}
              content={this.state.isIgnoringLecture ?
                <Button color="red" content="Not Recommend" onClick={() => this.props.onAddToNotRecommends(this.props.notRecommends, this.props.lecture.course.id)} /> :
                'Do not recommend this course from now'}
              onClose={() => this.setState({ isIgnoringLecture: false })}
              on={this.state.isIgnoringLecture ? 'click' : 'hover'}
              inverted={!this.state.isIgnoringLecture}
            />
            {this.props.canDelete &&
            <Popup
              trigger={<button
                className="large ui icon button"
                onClick={() => this.setState({ isDeletingLecture: true })}
                style={iconButtonStyle}
              >
                <Icon name="trash" color="red" />
              </button>}
              content={this.state.isDeletingLecture ?
                <Button color="red" content="Delete" onClick={() => this.props.onDeleteLecture(this.props.lecture.id)} /> :
                'Delete this lecture from the timetable'}
              onClose={() => this.setState({ isDeletingLecture: false })}
              on={this.state.isDeletingLecture ? 'click' : 'hover'}
              inverted={!this.state.isDeletingLecture}
            />}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Grid columns={2} divided relaxed>
                <Grid.Column width={7}>
                  <List>
                    <List.Item>
                      <h3>
                        <div>{`${course.college}${course.department ? ` ${course.department}` : ''}${course.major ? `(${course.major})` : ''}`}</div>
                        <div>{`${course.type}${course.field ? `(${course.field})` : ''}`}</div>
                      </h3>
                    </List.Item>
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
                        {this.props.lecture.timeSlots.map(timeSlot =>
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
                  </List>
                  <Statistic horizontal>
                    <Statistic.Label>Rating</Statistic.Label>
                    <Statistic.Label />
                    <Statistic.Value>{Math.round(this.props.lectureDetail.rating * 10) / 10} / 10</Statistic.Value>
                  </Statistic>
                </Grid.Column>

                <Grid.Column width={9}>
                  <div className="scrolling content">
                    <Header icon="comments">Evaluations</Header>
                    {evaluations.length === 0 && 'No evaluations'}
                    <Feed>
                      {evaluations.map(evaluation =>
                        <Feed.Event key={evaluation.id}>
                          <Feed.Label>
                            <Icon name="pencil" circular />
                          </Feed.Label>
                          <Feed.Content>
                            <Feed.Summary>
                              <Feed.User>{evaluation.author}</Feed.User>
                              <Feed.Date>Evaluated at ~</Feed.Date>
                              {this.props.username === evaluation.author &&
                              <span>
                                <button
                                  className="mini ui icon button"
                                  style={MiniIconButtonStyle}
                                  onClick={() => this.setState({
                                    editingId: this.state.editingId === null ? evaluation.id : null,
                                    rate: evaluation.rate,
                                    comment: evaluation.comment,
                                  })}
                                >
                                  <Icon name={this.state.editingId === null ? 'edit' : 'undo'} />
                                </button>
                                <Popup
                                  trigger={<button
                                    className="mini ui icon button"
                                    style={MiniIconButtonStyle}
                                  >
                                    <Icon name="delete" />
                                  </button>}
                                  content={<Button
                                    color="red"
                                    content="Delete"
                                    onClick={() => {
                                      this.handleDeleteEvaluation(evaluation.id)
                                    }}
                                  />}
                                  on="click"
                                />
                              </span>}
                            </Feed.Summary>
                            <Feed.Extra>
                              <Rating
                                icon="star"
                                name="rate"
                                maxRating={10}
                                rating={this.state.editingId === evaluation.id ? this.state.rate : evaluation.rate}
                                onRate={(event, data) => this.setState({ rate: data.rating })}
                                disabled={this.state.editingId !== evaluation.id}
                              />
                            </Feed.Extra>
                            <Feed.Extra text>
                              {this.state.editingId === evaluation.id ?
                                <Form>
                                  <Form.Field
                                    required
                                    control={TextArea}
                                    placeholder="Leave a comment..."
                                    value={this.state.comment}
                                    name="comment"
                                    onChange={this.handleChange}
                                  />
                                  <Form.Button
                                    color="teal"
                                    onClick={() => this.handleModifyEvaluation()}
                                  >Save</Form.Button>
                                </Form> :
                                evaluation.comment}
                            </Feed.Extra>
                            <Feed.Meta>
                              <Feed.Like onClick={() => this.handleToggleLikeIt(evaluation)}>
                                <Icon
                                  disabled={this.props.username === evaluation.author}
                                  color={evaluation.likeIt.includes(this.props.userId) ? 'red' : null}
                                  name="like"
                                />
                                {evaluation.likeIt.length} Likes
                              </Feed.Like>
                            </Feed.Meta>
                          </Feed.Content>
                        </Feed.Event>
                      )}
                      {!evaluations.map(evaluation => evaluation.author).includes(this.props.username) &&
                      <div>
                        <Divider />
                        <Header>New Evaluation</Header>
                        <Rating
                          icon="star"
                          name="rate"
                          maxRating={10}
                          rating={this.state.rate}
                          onRate={(event, data) => this.setState({ rate: data.rating })}
                        />
                        <Form>
                          <Form.Field
                            required
                            label="Comment"
                            control={TextArea}
                            placeholder="Leave a comment..."
                            value={this.state.comment}
                            name="comment"
                            onChange={this.handleChange}
                          />
                          <Form.Button
                            color="teal"
                            onClick={() => this.handleAddEvaluation()}
                          >Submit</Form.Button>
                        </Form>
                      </div>}
                    </Feed>
                  </div>
                </Grid.Column>
              </Grid>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => this.setState({ pop: false })}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

LecturePopup.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.number,
  evaluations: PropTypes.array,
  lecture: PropTypes.object,
  height: PropTypes.number,
  onDeleteLecture: PropTypes.func,
  onAddToNotRecommends: PropTypes.func,
  notRecommends: PropTypes.array,
  canDelete: PropTypes.bool,
  onGetEvaluations: PropTypes.func,
  onAddEvaluation: PropTypes.func,
  onDeleteEvaluation: PropTypes.func,
  onModifyEvaluation: PropTypes.func,
  lectureDetail: PropTypes.object,
  onToggleLikeIt: PropTypes.func,
}

export default LecturePopup
