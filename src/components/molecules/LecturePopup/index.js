import React from 'react'
import PropTypes from 'prop-types'
import { Button, Divider, Feed, Form, Grid, Header, Icon, List, Modal, Popup, Rating, Statistic, TextArea } from 'semantic-ui-react'
import TimeSlot from '../../atoms/TimeSlot'

class LecturePopup extends React.Component {
  static getDerivedStateFromProps(props) {
    return { isInNotRecommends: props.notRecommends.includes(props.lecture.course.id) }
  }

  constructor(props) {
    super(props)

    this.state = {
      editingId: null,
      rate: 10,
      comment: '',
      isIgnoringLecture: false,
      isDeletingLecture: false,
      isDeletingEvaluation: false,
      isInNotRecommends: props.notRecommends.includes(props.lecture.course.id),
    }

    props.onGetEvaluations(props.lecture.id)
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
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
      rate: 10,
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
    const miniIconButtonStyle = {
      backgroundColor: 'white',
      margin: 0,
      padding: 2,
    }

    return (
      <Modal
        open={this.props.open}
        style={{
          marginTop: '0px !important',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          {course.name}
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
                  <Header content="Evaluations" />
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
                            <Feed.Date>{evaluation.evaluatedAt.substring(0, 10)}&nbsp;</Feed.Date>
                            {this.props.username === evaluation.author &&
                            <span>
                              <Popup
                                trigger={
                                  <button
                                    className="mini ui icon button"
                                    style={miniIconButtonStyle}
                                    onClick={() => this.setState({
                                      editingId: this.state.editingId === null ? evaluation.id : null,
                                      rate: evaluation.rate,
                                      comment: evaluation.comment,
                                    })}
                                  >
                                    <Icon name={this.state.editingId === null ? 'edit' : 'undo'} />
                                  </button>
                                }
                                content={this.state.editingId === null ? 'Modify the evaluation' : 'Cancel modification'}
                                inverted
                              />
                              <Popup
                                trigger={<button
                                  className="mini ui icon button"
                                  style={miniIconButtonStyle}
                                  onClick={() => this.setState({ isDeletingEvaluation: true })}
                                >
                                  <Icon name="delete" />
                                </button>}
                                content={this.state.isDeletingEvaluation
                                ? <Button
                                  color="red"
                                  content="Delete"
                                  onClick={() => {
                                    this.handleDeleteEvaluation(evaluation.id)
                                  }}
                                />
                                : 'Delete the evaluation'}
                                onClose={() => this.setState({ isDeletingEvaluation: false })}
                                on={this.state.isDeletingEvaluation ? 'click' : 'hover'}
                                inverted={!this.state.isDeletingEvaluation}
                              />
                            </span>}
                          </Feed.Summary>
                          <Feed.Extra>
                            <span>
                              <Rating
                                icon="star"
                                name="rate"
                                maxRating={10}
                                rating={this.state.editingId === evaluation.id ? this.state.rate : evaluation.rate}
                                onRate={(event, data) => this.setState({ rate: data.rating })}
                                disabled={this.state.editingId !== evaluation.id}
                              />
                              {this.state.editingId === evaluation.id ? this.state.rate : evaluation.rate} / 10
                            </span>
                          </Feed.Extra>
                          <Feed.Extra text>
                            {this.state.editingId === evaluation.id ?
                              <Form id="form2" onSubmit={() => this.handleModifyEvaluation()}>
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
                                  type="submit"
                                >Save</Form.Button>
                              </Form> :
                              evaluation.comment}
                          </Feed.Extra>
                          <Feed.Meta>
                            <Feed.Like
                              onClick={
                                this.props.username === evaluation.author ? null : () => this.handleToggleLikeIt(evaluation)
                              }
                            >
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
                      <Header content="New Evaluation" />
                      <span>
                        <Rating
                          icon="star"
                          name="rate"
                          maxRating={10}
                          rating={this.state.rate}
                          onRate={(event, data) => this.setState({ rate: data.rating })}
                        />
                        {this.state.rate} / 10
                      </span>
                      <Form id="form" onSubmit={() => this.handleAddEvaluation()}>
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
                          type="submit"
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
          <Popup
            trigger={<Button
              icon={{
                name: this.state.isInNotRecommends ? 'check circle' : 'ban',
                color: this.state.isInNotRecommends ? 'green' : 'red',
              }}
              color={this.state.isInNotRecommends ? 'green' : 'red'}
              content={this.state.isInNotRecommends ? 'Allow Recommend' : 'Not Recommend'}
              inverted
              onClick={() => {
                if (this.state.isInNotRecommends) {
                  this.props.onDeleteFromNotRecommends(this.props.notRecommends, this.props.lecture.course.id)
                } else {
                  this.props.onAddToNotRecommends(this.props.notRecommends, this.props.lecture.course.id)
                }
              }}
            />}
            content={this.state.isInNotRecommends ? 'Allow to recommend this course from now' : 'Do not recommend this course from now'}
            inverted
          />
          {this.props.canDelete &&
          <Popup
            trigger={<Button
              icon={{ name: 'trash' }}
              color="red"
              content="Delete"
              onClick={() => this.setState({ isDeletingLecture: true })}
            />}
            content={this.state.isDeletingLecture ?
              <Button
                color="red"
                content="Confirm"
                onClick={() => {
                  this.props.onDeleteLecture()
                }}
              /> :
              'Delete this lecture from the timetable'}
            onClose={() => this.setState({ isDeletingLecture: false })}
            on={this.state.isDeletingLecture ? 'click' : 'hover'}
            inverted={!this.state.isDeletingLecture}
          />}
          <Button
            onClick={() => {
              this.props.onClose()
              this.setState({ editingId: null })
            }}
          >
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

LecturePopup.propTypes = {
  userId: PropTypes.number,
  username: PropTypes.string,
  evaluations: PropTypes.array,
  lectureDetail: PropTypes.object,
  notRecommends: PropTypes.array,
  lecture: PropTypes.object,
  open: PropTypes.bool,
  canDelete: PropTypes.bool,

  onGetEvaluations: PropTypes.func,
  onAddEvaluation: PropTypes.func,
  onDeleteEvaluation: PropTypes.func,
  onModifyEvaluation: PropTypes.func,
  onToggleLikeIt: PropTypes.func,
  onAddToNotRecommends: PropTypes.func,
  onDeleteFromNotRecommends: PropTypes.func,
  onClose: PropTypes.func,
  onDeleteLecture: PropTypes.func,
}

export default LecturePopup
