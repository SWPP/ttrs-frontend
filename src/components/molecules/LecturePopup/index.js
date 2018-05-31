import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

class LecturePopup extends React.Component {
  state = {
    pop: false,
  }

  handleOpenPopup = () => {
    this.setState({ pop: true })
  }

  handleClosePopup = () => {
    this.setState({ pop: false })
  }

  render() {
    return (
      <div>
        <button style={{ width: '200px', height: (this.props.height * 35).toString() + 'px' }} onClick={this.handleOpenPopup}>{this.props.lecture.course.name}</button>
        <ReactModal isOpen={this.state.pop} contentLabel={'Modal'}>
          <p>{this.props.lecture.course.name}</p>
          {this.props.canDelete && <button onClick={() => this.props.deleteLecture(this.props.lecture.id)}>Delete</button>}
          <button onClick={() => this.props.addToNotRecommends(this.props.notRecommends, this.props.lecture.course.id)}>Not Recommend</button>
          <button onClick={this.handleClosePopup}>Close</button>
        </ReactModal>
      </div>
    )
  }
}

LecturePopup.propTypes = {
  lecture: PropTypes.object,
  height: PropTypes.number,
  deleteLecture: PropTypes.func,
  addToNotRecommends: PropTypes.func,
  notRecommends: PropTypes.array,
  canDelete: PropTypes.bool,
}

export default LecturePopup
