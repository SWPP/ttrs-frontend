import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import TimeSlot from '../../atoms/TimeSlot'

let inputRate = { value: 1 }
let inputComment = ''

class LecturePopup extends React.Component {
  state = {
    pop: false,
  }

  handleOpenPopup = () => {
    this.props.onGetEvaluations(this.props.lecture.id)
    this.setState({ pop: true })
  }

  handleClosePopup = () => {
    this.setState({ pop: false })
  }

  handleAddEvaluation = () => {
    if (inputComment.value.trim()) {
      const evaluation = {
        rate: inputRate.value,
        comment: inputComment.value,
        lecture: this.props.lecture.id,
      }
      this.props.onAddEvaluation(this.props.lecture.id, evaluation)
    } else {
      console.log('There is no comment')
    }
  }

  handleModifyEvaluation = (evaluation) => {
    if (inputComment.value.trim()) {
      evaluation.rate = inputRate.value
      evaluation.comment = inputComment.value
      this.props.onModifyEvaluation(this.props.lecture.id, evaluation)
    } else {
      console.log('There is no comment')
    }
  }

  render() {
    const rateOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
          <h3>Rating = {Math.round(this.props.lectureDetail.rating * 10) / 10}</h3>
          {this.props.canDelete && <button onClick={() => this.props.deleteLecture(this.props.lecture.id)}>Delete</button>}
          <button onClick={() => this.props.addToNotRecommends(this.props.notRecommends, this.props.lecture.course.id)}>Not Recommend</button>
          <button onClick={this.handleClosePopup}>Close</button> <br />
          <select ref={node => { inputRate = node }}>
            {rateOption.map((value) =>
              <option
                key={value}
                value={value}
              >{value}</option>
            )}
          </select>
          <input ref={node => { inputComment = node }} placeholder={'Comment'} /> <br />
          <button onClick={this.handleAddEvaluation}>Evaluate</button>
          {this.props.evaluations.map(evaluation =>
            <div key={evaluation.id}>
              <hr />
              <h3>Rating = {evaluation.rate}</h3>
              <h2>{evaluation.author}</h2>
              {evaluation.comment}
              {this.props.username === evaluation.author &&
                <div>
                  <select ref={node => { inputRate = node }}>
                    {rateOption.map((value) =>
                      <option
                        key={value}
                        value={value}
                      >{value}</option>
                    )}
                  </select>
                  <input ref={node => { inputComment = node }} placeholder={'Comment'} /> <br />
                  <button onClick={() => this.handleModifyEvaluation(evaluation)}>Modify</button>
                  <button onClick={() => this.props.onDeleteEvaluation(this.props.lecture.id, evaluation.id)}>Delete</button>
                </div>
              }
            </div>
          )}
        </ReactModal>
      </div>
    )
  }
}

LecturePopup.propTypes = {
  username: PropTypes.string,
  evaluations: PropTypes.array,
  lecture: PropTypes.object,
  height: PropTypes.number,
  deleteLecture: PropTypes.func,
  addToNotRecommends: PropTypes.func,
  notRecommends: PropTypes.array,
  canDelete: PropTypes.bool,
  onGetEvaluations: PropTypes.func,
  onAddEvaluation: PropTypes.func,
  onDeleteEvaluation: PropTypes.func,
  onModifyEvaluation: PropTypes.func,
  lectureDetail: PropTypes.object,
}

export default LecturePopup
