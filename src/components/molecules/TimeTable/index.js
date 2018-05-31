import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Form, Menu, Popup, Segment, TextArea } from 'semantic-ui-react'
import LecturePopup from '../LecturePopup'

const overlap = (_time, _start, _end) => {
  let time = _time.split(':').map((i) => Number(i))
  time = (time[0] * 60) + time[1]

  let start = _start.split(':').map((i) => Number(i))
  start = (start[0] * 60) + start[1]

  let end = _end.split(':').map((i) => Number(i))
  end = (end[0] * 60) + end[1]

  return time < end && start < (time + 30)
}

const hasLecture = (lectures, day, time) => {
  let i
  let j
  for (i = 0; i < lectures.length; i += 1) {
    const timeSlots = lectures[i].timeSlots
    for (j = 0; j < timeSlots.length; j += 1) {
      const timeSlot = timeSlots[j]
      const d = timeSlot.dayOfWeek
      const s = timeSlot.startTime
      const e = timeSlot.endTime

      if (d === day && overlap(time, s, e)) {
        return i
      }
    }
  }

  return -1
}

const isStart = (_time, _start) => {
  let time = _time.split(':').map((i) => Number(i))
  time = (time[0] * 60) + time[1]

  let start = _start.split(':').map((i) => Number(i))
  start = (start[0] * 60) + start[1]

  return time <= start && start < (time + 30)
}

const getRowSpan = (lecture, day) => {
  let i

  const timeSlots = lecture.timeSlots

  for (i = 0; i < timeSlots.length; i += 1) {
    const timeSlot = timeSlots[i]

    if (timeSlot.dayOfWeek === day) {
      const s = timeSlot.startTime
      const e = timeSlot.endTime

      let start = s.split(':').map((i) => Number(i))
      start = (start[0] * 60) + start[1]

      let end = e.split(':').map((i) => Number(i))
      end = (end[0] * 60) + end[1]

      return Math.ceil((end - start) / 30)
    }
  }
  return 0
}

const isLectureStart = (lectures, day, time) => {
  let i
  let j
  for (i = 0; i < lectures.length; i += 1) {
    const timeSlots = lectures[i].timeSlots
    for (j = 0; j < timeSlots.length; j += 1) {
      const timeSlot = timeSlots[j]

      const d = timeSlot.dayOfWeek
      const s = timeSlot.startTime

      if (d === day && isStart(time, s)) {
        return i
      }
    }
  }

  return -1
}

class TimeTable extends React.Component {
  state = {
    memo: this.props.memo,
    title: this.props.title,
    memoInput: this.props.memo,
    titleInput: this.props.title,
    isModifyingTitle: false,
    receiverName: '',
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      memo: nextProps.memo,
      title: nextProps.title,
      memoInput: nextProps.memo,
      titleInput: nextProps.title,
    })
  }

  onSubmitMemo = () => {
    if (this.props.id === null) {
      console.log('There is no TimeTable')
      return
    }
    this.props.onModifyContent({ memo: this.state.memoInput })
    this.setState({
      memo: this.state.memoInput,
    })
  }

  onModifyTitle = () => {
    if (this.props.id === null) {
      console.log('There is no TimeTable')
      return
    }
    this.props.onModifyContent({ title: this.state.titleInput })
    this.setState({
      isModifyingTitle: false,
      title: this.state.titleInput,
    })
  }

  onSubmitSend = () => {
    if (this.props.id === null) {
      console.log('There is no TimeTable')
      return
    }
    if (this.props.username === this.state.receiverName) {
      console.log('Can not send TimeTable to you')
      return
    }
    const sendInfo = {
      timeTableId: this.props.id,
      receiverName: this.state.receiverName,
    }
    this.props.onSend(sendInfo)
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  createTimeSlot = (day, time) => {
    if (hasLecture(this.props.lectures, day, time) >= 0) {
      const lectureIndex = isLectureStart(this.props.lectures, day, time)
      if (lectureIndex >= 0) {
        const span = getRowSpan(this.props.lectures[lectureIndex], day)
        return (
          <td style={{ border: '1px solid black' }} rowSpan={span}>
            <LecturePopup
              props={{
                lecture: this.props.lectures[lectureIndex],
                height: span,
                deleteLecture: this.props.onDeleteLecture,
                addToNotRecommends: this.props.onAddToNotRecommends,
                notRecommends: this.props.notRecommends,
              }}
            />
          </td>
        )
      }
      return null
    }

    return (<td style={{ border: '1px solid black', width: '100px', height: '30px' }} />)
  }

  createRow = (time) => {
    return ['월', '화', '수', '목', '금', '토'].map((day) => this.createTimeSlot(day, time))
  }

  createTimeTable = () => {
    return (
      <table>
        <tbody>
          <tr>
            <th>Time</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thr</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
          {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
            '13:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
            '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'].map((time) => (
              <tr>
                <td>{time}</td>
                {this.createRow(time)}
              </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render() {
    const iconButtonStyle = {
      backgroundColor: 'white',
      padding: '5',
    }

    return (
      <div>
        {this.props.id !== null &&
        <Menu tabular attached="top">
          <Menu.Item active fitted>
            {!this.state.isModifyingTitle ?
              <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                <h4>{this.state.title}
                  {this.props.canModify &&
                  <Popup
                    trigger={<button
                      className="ui icon button"
                      onClick={() => this.setState({ isModifyingTitle: true })}
                      style={iconButtonStyle}
                    >
                      <Icon name="pencil" />
                    </button>}
                    content="Modify title"
                    inverted
                  />}
                </h4>
              </div> :
              <Form>
                <Form.Input
                  action={
                    <Popup
                      trigger={<Form.Button
                        attached="right"
                        type="submit"
                        icon="save"
                        color="teal"
                        onClick={this.onModifyTitle}
                      />}
                      content="Save title"
                      inverted
                    />}
                  value={this.state.titleInput}
                  name="titleInput"
                  placeholder="Input title..."
                  onChange={this.handleChange}
                />
              </Form>
            }
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item active fitted>
              <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                {this.props.canCopyToMy &&
                <Popup
                  trigger={<button
                    className="ui icon button"
                    onClick={() => this.props.onCopyToMy(this.props.id)}
                    style={iconButtonStyle}
                  >
                    <Icon name="copy" />
                  </button>}
                  content="Copy this timetable to mine"
                  inverted
                />
                }
                <Popup
                  trigger={<button
                    className="ui icon button"
                    onClick={() => this.props.onBookmark(this.props.id)}
                    style={iconButtonStyle}
                  >
                    <Icon name="bookmark" />
                  </button>}
                  content="Bookmark this timetable"
                  inverted
                />
                <Popup
                  trigger={<button
                    className="ui icon button"
                    onClick={() => this.props.onSend(this.props.id)}
                    style={iconButtonStyle}
                  >
                    <Icon name="send" />
                  </button>}
                  content="Send this timetable to other student"
                  inverted
                />
                {this.props.canDelete &&
                <Popup
                  trigger={<button
                    className="ui icon button"
                    onClick={() => this.props.onDeleteTimeTable(this.props.id)}
                    style={iconButtonStyle}
                  >
                    <Icon name="trash" color="red" />
                  </button>}
                  content="Delete this timetable"
                  inverted
                />}
              </div>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        }
        <Segment attached>
          {this.createTimeTable()}
          {this.props.id !== null &&
          <Form>
            <Form.Field
              control={TextArea}
              label="Memo"
              placeholder="Leave some descriptions..."
              value={this.state.memoInput}
              name="memoInput"
              onChange={this.handleChange}
            />
            <Popup
              trigger={<Form.Button
                color="teal"
                onClick={this.onSubmitMemo}
              >Save</Form.Button>}
              content="Save memo"
              inverted
            />
          </Form>}
        </Segment>
      </div>
    )
  }
}

TimeTable.propTypes = {
  username: PropTypes.string,
  id: PropTypes.number,
  memo: PropTypes.string,
  title: PropTypes.string,
  lectures: PropTypes.array,
  notRecommends: PropTypes.array,
  canModify: PropTypes.bool,
  canCopyToMy: PropTypes.bool,
  canDelete: PropTypes.bool,
  onModifyContent: PropTypes.func,
  onDeleteLecture: PropTypes.func,
  onAddToNotRecommends: PropTypes.func,
  onBookmark: PropTypes.func,
  onSend: PropTypes.func,
  onCopyToMy: PropTypes.func,
  onDeleteTimeTable: PropTypes.func,
}

export default TimeTable
