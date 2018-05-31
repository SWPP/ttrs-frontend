import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import TimeSlot from '../../atoms/TimeSlot'

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
          <h2>{this.props.lecture.course.name}</h2>
          <h3>instructor = {this.props.lecture.instructor}</h3>
          {this.props.lecture.timeSlots.map(timeSlot =>
            <TimeSlot
              key={timeSlot.id}
              {...timeSlot}
            />
          )}
          <h3>Rating = {this.props.lecture.rating}</h3>
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
