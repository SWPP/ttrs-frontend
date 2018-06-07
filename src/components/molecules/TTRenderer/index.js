import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import LecturePopup from '../../../containers/LecturePopup'


let blockWidth = 154
let blockHeight = 29
let canvasWidth = (blockWidth + 2) * 7
let canvasHeight = (blockHeight + 2) * 25

class TTRenderer extends React.Component {
  constructor(props) {
    super(props)

    const blocks = []
    for (let i = 0; i < 24; i += 1) {
      blocks.push([0, 0, 0, 0, 0, 0])
    }

    this.state = {
      lectures: props.lectures,
      startPoint: null,
      endPoint: null,
      blocks: [...blocks],
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions)

    this.updateWindowDimensions()
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

  onClickCanvas = (e) => {
    if (e.ctrlKey) { return }

    window.document.removeEventListener('mousemove', this.onMouseMove)

    const elt = ReactDOM.findDOMNode(this)
    const rect = elt.getBoundingClientRect()
    const eltLeft = rect.left
    const eltTop = rect.top

    const pos = { x: e.clientX - eltLeft, y: e.clientY - eltTop }
    const lecture = this.getLectureAtPos(pos)

    if (lecture === null) {
      return
    }

    this.setState({ openId: lecture.id })
    this.props.onGetEvaluations(lecture.id)
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

  onMouseUp = () => {
    if (!this.state.startPoint || !this.state.endPoint) { return }

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

  getLectureAtPos = (pos) => {
    const days = ['헤더', '월', '화', '수', '목', '금', '토']
    const lectures = this.state.lectures
    for (let i = 0; i < lectures.length; i += 1) {
      const lecture = lectures[i]
      const timeSlots = lecture.timeSlots

      for (let j = 0; j < timeSlots.length; j += 1) {
        const timeSlot = timeSlots[j]
        const dayIndex = days.indexOf(timeSlot.dayOfWeek)

        let startTime = timeSlot.startTime.split(':').map((i) => Number(i))
        startTime = (startTime[0] * 60) + startTime[1]

        let endTime = timeSlot.endTime.split(':').map((i) => Number(i))
        endTime = (endTime[0] * 60) + endTime[1]

        const start = { x: (dayIndex * (blockWidth + 2)) + 1, y: (((startTime - 540) / 30) + 1) * (blockHeight + 2) }
        const size = { width: blockWidth, height: ((endTime - startTime) / 30) * (blockHeight + 1) }

        if (start.x <= pos.x && pos.x <= start.x + size.width
          && start.y <= pos.y && pos.y <= start.y + size.height) {
          return lecture
        }
      }
    }
    return null
  }

  updateWindowDimensions = () => {
    if (window.innerWidth >= 1200) {
      blockWidth = 154
    } else if (window.innerWidth >= 990) {
      blockWidth = 127
    } else if (window.innerWidth >= 770) {
      blockWidth = 97
    } else {
      blockWidth = (window.innerWidth - 85) / 7
    }

    canvasWidth = (blockWidth + 2) * 7
    canvasHeight = (blockHeight + 2) * 25

    this.forceUpdate()
  }

  drawSelections = (ctx) => {
    const blocks = this.state.blocks
    const blockColor = 'rgb(0,200,0,0.5)'
    ctx.fillStyle = blockColor

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
    const days = ['헤더', '월', '화', '수', '목', '금', '토']
    const boxColor = `hsl(${this.hash(lecture)},60%,60%)`
    const textColor = 'rgb(0,0,0)'
    const timeSlots = lecture.timeSlots
    for (let i = 0; i < timeSlots.length; i += 1) {
      const timeSlot = timeSlots[i]
      const dayIndex = days.indexOf(timeSlot.dayOfWeek)

      let startTime = timeSlot.startTime.split(':').map((i) => Number(i))
      startTime = (startTime[0] * 60) + startTime[1]

      let endTime = timeSlot.endTime.split(':').map((i) => Number(i))
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

  hash = (lecture) => {
    const name = lecture.course.name
    let sum = 0
    for (let i = 0; i < name.length; i += 1) {
      sum += name.charCodeAt(i)
    }

    return sum % 360
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

  updateCanvas = () => {
    const canvas = this.refs.canvas
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    ctx.fillStyle = 'rgb(255,255,255)'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    this.drawGrid(ctx)
    this.setHeaders(ctx)
    this.drawSelections(ctx)

    for (let i = 0; i < this.state.lectures.length; i += 1) {
      this.drawLecture(ctx, this.state.lectures[i])
    }
  }

  overlap = (i, j, tl, br) => {
    const tl1 = { x: (blockWidth + 2) * (j + 1), y: (blockHeight + 2) * (i + 1) }
    const br1 = { x: (blockWidth + 2) * (j + 2), y: (blockHeight + 2) * (i + 2) }
    const tl2 = tl
    const br2 = br

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
  }

  render() {
    return (
      <div
        draggable="false"
        style={{ width: { canvasWidth }, height: { canvasHeight } }}
        onMouseDown={(e) => this.onMouseDown(e)}
        onMouseUp={(e) => this.onMouseUp(e)}
      >
        {this.renderBlocks()}
        {this.state.lectures.map((lecture) =>
          <LecturePopup
            key={lecture.course.name}
            open={lecture.id === this.state.openId}
            lecture={lecture}
            onDeleteLecture={() => this.props.onDeleteLecture(lecture.id)}
            onAddToNotRecommends={() => this.props.onAddToNotRecommends(this.props.notRecommends, lecture.course.id)}
            canDelete={this.props.canModify}
            onClose={() => this.setState({ openId: null })}
          />)}
      </div>
    )
  }
}


TTRenderer.propTypes = {
  lectures: PropTypes.array,
  notRecommends: PropTypes.array,
  canModify: PropTypes.bool,
  canDelete: PropTypes.bool,
  onDeleteLecture: PropTypes.func,
  onAddToNotRecommends: PropTypes.func,
  onGetEvaluations: PropTypes.func,
  onChange: PropTypes.func,
}


export default TTRenderer
