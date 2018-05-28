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

    this.lecture = props.props.lecture
    this.height = props.props.height
    this.deleteLecture = props.props.deleteLecture
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
        <button style={{ width: '200px', height: (this.height * 35).toString()+'px' }} onClick={this.handleOpenPopup}>{this.lecture.course.name}</button>
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
