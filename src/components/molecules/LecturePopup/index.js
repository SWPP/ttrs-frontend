import React from 'react'
import ReactModal from 'react-modal'

class LecturePopup extends React.Component {
  constructor(props) {
    super()
    this.state = {
      pop: false,
    }

    this.handleOpenPopup = this.handleOpenPopup.bind(this)
    this.handleClosePopup = this.handleClosePopup.bind(this)
    this.deleteLecture = props.props.deleteLecture
    this.lecture = props.props.lecture
  }

  handleOpenPopup() {
    this.setState({ pop: true })
  }

  handleClosePopup() {
    this.setState({ pop: false })
  }

  render() {
    return (
      <div>
        <button style={{ width: '200' }} onClick={this.handleOpenPopup}>{this.lecture.course.name}</button>
        <ReactModal isOpen={this.state.pop} contentLabel={'Modal'}>
          <p>{this.lecture.course.name}</p>
          <button onClick={() => this.deleteLecture(this.lecture.id)}>Delete</button>
          <button onClick={this.handleClosePopup}>Close</button>
        </ReactModal>
      </div>
    )
  }
}

export default LecturePopup
