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
    this.addToNotRecommends = props.props.addToNotRecommends
    this.notRecommends = props.props.notRecommends
  }

  handleOpenPopup() {
    this.setState({ pop: true })
  }

  handleClosePopup() {
    this.setState({ pop: false })
  }

  callBack = (datafromchild) => {
      console.log(datafromchild)
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOpenPopup}>{/*this.lecture.course.name*/}</button>
        <ReactModal isOpen={this.state.pop} contentLabel={'Modal'}>
          <p>{this.lecture.course.name}</p>
          <button onClick={() => this.deleteLecture(this.lecture.id)}>Delete</button>
          <button onClick={() => this.addToNotRecommends(this.notRecommends, this.lecture.course.id)}>Not Recommend</button>
          <button onClick={this.handleClosePopup}>Close</button>
        </ReactModal>
      </div>
    )
  }
}

export default LecturePopup
