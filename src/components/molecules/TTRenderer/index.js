import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import LecturePopup from '../../../containers/LecturePopup'


const blockWidth = 130
const blockHeight = 29
const canvasWidth = (blockWidth + 2) * 7
const canvasHeight = (blockHeight + 2) * 25

class TTRenderer extends React.Component {
  constructor(props) {
    super(props)
    // console.log('props:', props)
    this.state = {
      lectures: props.lectures,
      startPoint: null,
      endPoint: null,
      blocks: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
    }
    // console.log(this.state)
  }

  componentDidMount() {
    this.updateCanvas()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lectures !== nextProps.lectures) {
      this.setState({ lectures: nextProps.lectures })
    }
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas = () => {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    this.drawGrid(ctx)
    this.setHeaders(ctx)
    this.drawSelections(ctx)

    for (let i = 0; i < this.state.lectures.length; i += 1) {
      this.drawLecture(ctx, this.state.lectures[i])
    }
  }

  drawGrid = (ctx) => {
    const gridColor = '#999999'
    ctx.strokeStyle = gridColor

    for (let i = 1; i < 25; i += 1) {
      ctx.moveTo(0, (blockHeight + 2) * i)
      ctx.lineTo(canvasWidth, (blockHeight + 2) * i)
      ctx.stroke()
    }

    for (let j = 0; j <= 7; j += 1) {
      ctx.moveTo((blockWidth + 2) * j, 0)
      ctx.lineTo((blockWidth + 2) * j, canvasHeight)
      ctx.stroke()
    }
  }

  setHeaders = (ctx) => {
    const days = ['none', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
    const textColor = 'rgb(0,0,0)'

    ctx.font = '18px Arial'
    ctx.fillStyle = textColor

    for (let i = 9; i <= 20; i += 1) {
      let time = `${i.toString()} : 00`
      const center = {
        x: ((blockWidth + 2) / 2) - (ctx.measureText(time).width / 2),
        y: (2 * (i - 8) * (blockHeight + 2)) - 9,
      }

      ctx.fillText(time, center.x, center.y)

      time = `${i.toString()} : 30`
      ctx.fillText(time, center.x, center.y + (blockHeight + 2))
    }

    for (let i = 1; i <= 6; i += 1) {
      const day = days[i]
      const center = {
        x: ((blockWidth + 2) * (i + 0.5)) - (ctx.measureText(day).width / 2),
        y: blockHeight - 8,
      }

      ctx.fillText(day, center.x, center.y)
    }
  }

  drawSelections = (ctx) => {
    const blocks = this.state.blocks
    const blockColor = 'rgb(0,200,0,0.5)'
    ctx.fillStyle = blockColor

    // console.log(blocks)
    for (let i = 0; i < blocks.length; i += 1) {
      const row = blocks[i]
      for (let j = 0; j < row.length; j += 1) {
        if (row[j] === 1) {
          const start = {
            x: ((j + 1) * (blockWidth + 2)) + 1,
            y: ((i + 1) * (blockHeight + 2)) + 1,
          }
          ctx.fillRect(start.x, start.y, blockWidth, blockHeight)
        }
      }
    }
  }

  drawLecture = (ctx, lecture) => {
    // console.log(lecture)

    const days = ['헤더', '월', '화', '수', '목', '금', '토']
    // const colors = ['rgb(0,116,217)', 'rgb(255,220,0)', 'rgb(46,204,64)']
    // const boxColor = colors[Math.floor(Math.random()*colors.length)]
    const boxColor = 'rgb(0,116,217,0.8)'
    const textColor = 'rgb(0,0,0)'
    const timeSlots = lecture.timeSlots
    for (let i = 0; i < timeSlots.length; i += 1) {
      const timeSlot = timeSlots[i]
      const dayIndex = days.indexOf(timeSlot.dayOfWeek)

      let startTime = timeSlots[i].startTime.split(':').map((i) => Number(i))
      startTime = (startTime[0] * 60) + startTime[1]

      let endTime = timeSlots[i].endTime.split(':').map((i) => Number(i))
      endTime = (endTime[0] * 60) + endTime[1]

      const start = { x: (dayIndex * (blockWidth + 2)) + 1, y: (((startTime - 540) / 30) + 1) * (blockHeight + 2) }
      const size = { width: blockWidth, height: ((endTime - startTime) / 30) * (blockHeight + 1) }

      ctx.fillStyle = boxColor
      ctx.fillRect(start.x, start.y, size.width, size.height)

      const center = { x: start.x + (size.width / 2), y: start.y + (size.height / 2) }

      const name = lecture.course.name
      const room = `${timeSlot.classroom.building}-${timeSlot.classroom.roomNo}`
      ctx.fillStyle = textColor
      ctx.font = '15px Courier'
      ctx.fillText(name, center.x - (ctx.measureText(name).width / 2), center.y)
      ctx.fillText(room, center.x - (ctx.measureText(room).width / 2), center.y + 20)
    }
  }

  onClickCanvas = (e) => {
    if (e.ctrlKey) { return }

    window.document.removeEventListener('mousemove', this.onMouseMove)

    const elt = ReactDOM.findDOMNode(this)
    const rect = elt.getBoundingClientRect()
    const eltLeft = rect.left
    const eltTop = rect.top

    const pos = { x: e.clientX - eltLeft, y: e.clientY - eltTop }
    console.log(pos)
    const lecture = this.getLectureAtPos(pos)
    console.log(lecture)

    if (lecture === null)
      return

    this.setState({ openId: lecture.id })
    this.props.getEvaluations(lecture.id)
  }

  getLectureAtPos = (pos) => {
    const days = ['헤더', '월', '화', '수', '목', '금', '토']
    const lectures = this.state.lectures
    for (let i = 0; i < lectures.length; i += 1) {
      const lecture = lectures[i]
      const timeSlots = lecture.timeSlots

      for (let j = 0; j < timeSlots.length; j += 1) {
        const timeSlot = timeSlots[j]
        const dayIndex = days.indexOf(timeSlot.dayOfWeek)

        let startTime = timeSlots[i].startTime.split(':').map((i) => Number(i))
        startTime = (startTime[0] * 60) + startTime[1]

        let endTime = timeSlots[i].endTime.split(':').map((i) => Number(i))
        endTime = (endTime[0] * 60) + endTime[1]

        const start = { x: (dayIndex * (blockWidth + 2)) + 1, y: (((startTime - 540) / 30) + 1) * (blockHeight + 2) }
        const size = { width: blockWidth, height: ((endTime - startTime) / 30) * (blockHeight + 1) }

        console.log(pos, start, size)

        if (start.x <= pos.x && pos.x <= start.x + size.width
          && start.y <= pos.y && pos.y <= start.y + size.height) {
          return lecture
        }
      }
    }
    return null
  }

  onMouseDown = (e) => {
    if (!e.ctrlKey) {
      const startPoint = null
      const endPoint = null
      this.setState({ startPoint, endPoint })
      return
    }

    const startPoint = { x: e.clientX, y: e.clientY }
    const endPoint = { x: e.clientX, y: e.clientY }
    this.setState({ startPoint, endPoint })
    window.document.addEventListener('mousemove', this.onMouseMove)
  }


  onMouseMove = (e) => {
    const endPoint = { x: e.clientX, y: e.clientY }
    this.setState({ endPoint })
  }

  onMouseUp = (e) => {
    if (!this.state.startPoint || !this.state.endPoint) { return }

    // console.log(this.state.lectures)

    window.document.removeEventListener('mousemove', this.onMouseMove)

    const elt = ReactDOM.findDOMNode(this)
    const rect = elt.getBoundingClientRect()
    const eltLeft = rect.left
    const eltTop = rect.top

    this.setState({ eltPoint: { x: eltLeft, y: eltTop } })

    const topLeft = {
      x: Math.min(this.state.startPoint.x, this.state.endPoint.x) - eltLeft,
      y: Math.min(this.state.startPoint.y, this.state.endPoint.y) - eltTop,
    }
    const botRight = {
      x: Math.max(this.state.startPoint.x, this.state.endPoint.x) - eltLeft,
      y: Math.max(this.state.startPoint.y, this.state.endPoint.y) - eltTop,
    }

    const blocks = this.state.blocks
    for (let i = 0; i < blocks.length; i += 1) {
      for (let j = 0; j < blocks[i].length; j += 1) {
        if (this.overlap(i, j, topLeft, botRight)) { blocks[i][j] = 1 - blocks[i][j] }
      }
    }

    this.setState({ blocks })

    this.props.onChange(blocks)
  }

  getName = (name) => {
    let acronym = ''

    name = name.split(' ')
    for (const n in name) {
      acronym += name[n].substr(0, 1)
    }

    return acronym
  }

  showStatus = () => {
    const state = this.state
    if (state.startPoint != null && state.endPoint != null) {
      return `start: (${state.startPoint.x},${state.startPoint.y})`
        + ' ' + `end: (${state.endPoint.x},${state.endPoint.y})`
    }
    return 'null'
  }

  overlap = (i, j, tl, br) => {
    const tl1 = { x: (blockWidth + 2) * (j + 1), y: (blockHeight + 2) * (i + 1) }
    const br1 = { x: (blockWidth + 2) * (j + 2), y: (blockHeight + 2) * (i + 2) }
    const tl2 = tl
    const br2 = br

    // console.log('block[',i,'][',j,']')
    // console.log(tl1, br1, tl2, br2)

    if (tl1.x > br2.x || tl2.x > br1.x) {
      return false
    }

    if (tl1.y > br2.y || tl2.y > br1.y) {
      return false
    }

    return true
  }

  timeOverlap = (_time, _start, _end) => {
    let time = _time.split(':').map((i) => Number(i))
    time = (time[0] * 60) + time[1]

    let start = _start.split(':').map((i) => Number(i))
    start = (start[0] * 60) + start[1]

    let end = _end.split(':').map((i) => Number(i))
    end = (end[0] * 60) + end[1]

    return time < end && start < (time + 30)
  }

  hasLecture = (day, time) => {
    const lectures = this.state.lectures

    for (const i in lectures) {
      const lecture = lectures[i]
      for (const j in lecture.timeSlots) {
        const timeSlot = lecture.timeSlots[j]
        if (day === timeSlot.dayOfWeek && this.timeOverlap(time, timeSlot.startTime, timeSlot.endTime)) {
          return i
        }
      }
    }
    return -1
  }

  renderBlock = (val, index, time) => {
    const day = ['월', '화', '수', '목', '금', '토'][index]
    const lid = this.hasLecture(day, time)

    const bckgrd = ((val === 1) ? '#FF0281' : '#FFFFFF')

    const lecture = this.state.lectures[lid]
    if (lid >= 0) {
      return (
        <td
          key={day + time}
          style={{
            border: '1px solid #999999',
            backgroundColor: bckgrd,
            width: `${blockWidth.toString()}px`,
            height: `${blockHeight.toString()}px`,
          }}
        >
          <button
            style={{
              fontSize: '10px',
              width: `${(blockWidth - 4).toString()}px`,
            }}
            onClick={
              () => {
                this.setState({ openId: lecture.id })
                this.props.getEvaluations(lecture.id)
                console.log(this.props)
              }
            }
          >{this.getName(lecture.course.name)}</button>
          <LecturePopup
            open={lecture.id === this.state.openId}
            lecture={lecture}
            onDeleteLecture={() => this.props.deleteLecture(lecture.id)}
            onAddToNotRecommends={() => this.props.addToNotRecommends(this.props.notRecommends, lecture.course.id)}
            canDelete={this.props.canModify}
            onClose={() => this.setState({ openId: null })}
          />
        </td>
      )
    }
    return (
      <td
        key={day + time}
        style={{
          border: '1px solid #999999',
          backgroundColor: bckgrd,
          width: `${blockWidth.toString()}px`,
          height: `${blockHeight.toString()}px`,
        }}
      />
    )
  }

  renderRow = (time, rowIndex) => {
    const row = this.state.blocks[rowIndex]
    return row.map((val, index) =>
      this.renderBlock(val, index, time)
    )
  }

  renderBlocks = () => {
    return (
      <canvas
        ref={'canvas'}
        width={canvasWidth}
        height={canvasHeight}
        style={{
          border: '1px solid black',
        }}
        onClick={(e) => this.onClickCanvas(e)}
      />
    )
    return (
      <table>
        <tbody>
          <tr>
            <th style={{ width: `${blockWidth.toString()}px`, height: `${blockHeight.toString()}px` }}>Time</th>
            <th style={{ width: `${blockWidth.toString()}px`, height: `${blockHeight.toString()}px` }}>Mon</th>
            <th style={{ width: `${blockWidth.toString()}px`, height: `${blockHeight.toString()}px` }}>Tue</th>
            <th style={{ width: `${blockWidth.toString()}px`, height: `${blockHeight.toString()}px` }}>Wed</th>
            <th style={{ width: `${blockWidth.toString()}px`, height: `${blockHeight.toString()}px` }}>Thr</th>
            <th style={{ width: `${blockWidth.toString()}px`, height: `${blockHeight.toString()}px` }}>Fri</th>
            <th style={{ width: `${blockWidth.toString()}px`, height: `${blockHeight.toString()}px` }}>Sat</th>
          </tr>
          {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
            '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
            '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'].map(
          (time, index) => (<tr key={time}><th>{time}</th>{this.renderRow(time, index)}</tr>))}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div draggable="false">
        <div
          draggable="false"
          style={{ width: '1000px', height: '800px' }}
          onMouseDown={(e) => this.onMouseDown(e)}
          onMouseUp={(e) => this.onMouseUp(e)}
        >
          {this.renderBlocks()}
          {this.state.lectures.map((lecture) =>
            <LecturePopup
              key={lecture.course.name}
              open={lecture.id === this.state.openId}
              lecture={lecture}
              onDeleteLecture={() => this.props.deleteLecture(lecture.id)}
              onAddToNotRecommends={() => this.props.addToNotRecommends(this.props.notRecommends, lecture.course.id)}
              canDelete={this.props.canModify}
              onClose={() => this.setState({ openId: null })}
            />)}
        </div>
        <div>
          { this.showStatus() }
        </div>
      </div>
    )
  }
}


TTRenderer.propTypes = {
  lectures: PropTypes.array,
  notRecommends: PropTypes.array,
  canModify: PropTypes.bool,
  canDelete: PropTypes.bool,
  deleteLecture: PropTypes.func,
  addToNotRecommends: PropTypes.func,
  getEvaluations: PropTypes.func,
  onChange: PropTypes.func,
}


export default TTRenderer