import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Form, Menu, Popup, Segment, TextArea } from 'semantic-ui-react'
import LecturePopup from '../LecturePopup'

import TTRenderer from '../TTRenderer'


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

  getBlocks = (blocks) => {
      // console.log(this)
      console.log('Change in selected blocks')
      console.log(blocks);
  }

  createTimeTable = () => {
    return (
        <div>
            <TTRenderer
                onChange={this.getBlocks}
                lectures={this.props.lectures} 
                deleteLecture={this.props.onDeleteLecture} 
                addToNotRecommends={this.props.onAddToNotRecommends}
                notRecommends={this.props.notRecommends}
            />
        </div>
    )
  }

  render() {
    const iconButtonStyle = {
      backgroundColor: 'white',
      padding: 5,
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
