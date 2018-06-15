import React from 'react'
import PropTypes from 'prop-types'

import LecturePopup from '../../../containers/LecturePopup'

const blockHeight = 30
const canvasHeight = blockHeight * 25
class TTRenderer extends React.Component {
  constructor(props) {
    super(props)

    this.div = React.createRef()
    this.blockWidth = 0
    this.lineWidth = 2
    this.blocks = []
    for (let i = 0; i < 24; i += 1) {
      this.blocks.push([])
      for (let j = 0; j < 6; j += 1) {
        this.blocks[i].push(false)
      }
    }
    this.canvas = null
    this.canvasContext = null
    this.startPoint = null
    this.endPoint = null
    this.mouseMode = null
    this.selectionMode = null

    this.state = {
      openId: null,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.forceUpdate()
    })

    this.forceUpdate()
    this.updateCanvas()
  }

  componentWillReceiveProps() {
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  onMouseDown = (e) => {
    if (this.mouseMode === null) {
      this.startPoint = this.getPointByEvent(e)
      this.mouseMode = 'down'
      this.setSelectionMode(e)
    }
  }

  onMouseMove = (e) => {
    if (this.mouseMode === 'down' || this.mouseMode === 'move') {
      const newPoint = this.getPointByEvent(e)
      const oldSlot = this.getSlotByPoint(this.endPoint)
      const newSlot = this.getSlotByPoint(newPoint)
      this.endPoint = newPoint
      this.mouseMode = 'move'
      const oldSpecial = this.selectionMode
      this.setSelectionMode(e)

      if (oldSlot === null || oldSlot.x !== newSlot.x || oldSlot.y !== newSlot.y || oldSpecial !== this.selectionMode) {
        this.updateCanvas()
      }
    }
  }

  onMouseUp = (e) => {
    this.endPoint = this.getPointByEvent(e)
    this.setSelectionMode(e)
    const lecture = this.getLectureByPoint(this.endPoint)
    if (this.mouseMode === 'down' && this.selectionMode === null && lecture !== null) {
      this.setState({ openId: lecture.id })
    } else {
      const newSelection = this.getNewSelection()
      for (let i = 0; i < this.blocks.length; i += 1) {
        for (let j = 0; j < this.blocks[i].length; j += 1) {
          this.blocks[i][j] = this.isSelected(this.blocks[i][j], j, i, newSelection)
        }
      }
    }
    this.mouseMode = null
    this.startPoint = null
    this.endPoint = null
    this.selectionMode = null

    this.updateCanvas()
    this.props.onChange(this.blocks)
  }

  setSelectionMode = (e) => {
    if (e.ctrlKey) {
      this.selectionMode = 'unselect'
    } else if (e.shiftKey) {
      this.selectionMode = 'toggle'
    } else {
      this.selectionMode = null
    }
  }

  getCanvas = () => {
    if (this.canvas === null) {
      this.canvas = document.getElementById(`table${this.props.id}`)
    }
    return this.canvas
  }

  getCanvasContext = () => {
    const canvas = this.getCanvas()
    if (canvas !== null) {
      if (this.canvasContext === null) {
        this.canvasContext = canvas.getContext('2d')
      }
      return this.canvasContext
    }
    return null
  }

  getCanvasRect = () => {
    const canvas = this.getCanvas()
    if (canvas !== null) {
      return canvas.getBoundingClientRect()
    }
    return null
  }

  getPointByEvent = (e) => {
    const rect = this.getCanvasRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  getSlotByPoint = (point) => {
    if (point === null) {
      return null
    }
    const x = Math.floor(point.x / this.blockWidth) - 1
    const y = Math.floor(point.y / blockHeight) - 1
    return { x, y }
  }

  getLectureByPoint = (point) => {
    const days = ['', '월', '화', '수', '목', '금', '토']
    for (let i = 0; i < this.props.lectures.length; i += 1) {
      const lecture = this.props.lectures[i]
      const timeSlots = lecture.timeSlots

      for (let j = 0; j < timeSlots.length; j += 1) {
        const timeSlot = timeSlots[j]
        const dayIndex = days.indexOf(timeSlot.dayOfWeek)

        let startTime = timeSlot.startTime.split(':').map((i) => Number(i))
        startTime = (startTime[0] * 60) + startTime[1]

        let endTime = timeSlot.endTime.split(':').map((i) => Number(i))
        endTime = (endTime[0] * 60) + endTime[1]

        const start = { x: (dayIndex * this.blockWidth) + (this.lineWidth / 2), y: ((((startTime - 540) / 30) + 1) * blockHeight) + (this.lineWidth / 2) }
        const size = { width: this.blockWidth - this.lineWidth, height: (((endTime - startTime) / 30) * blockHeight) - this.lineWidth }

        if (start.x <= point.x && point.x <= start.x + size.width
          && start.y <= point.y && point.y <= start.y + size.height) {
          return lecture
        }
      }
    }
    return null
  }

  getNewSelection = () => {
    if (this.startPoint == null || this.endPoint == null) {
      return null
    }
    const slot1 = this.getSlotByPoint(this.startPoint)
    const slot2 = this.getSlotByPoint(this.endPoint)
    const startSlot = {
      x: Math.min(slot1.x, slot2.x),
      y: Math.min(slot1.y, slot2.y),
    }
    const endSlot = {
      x: Math.max(slot1.x, slot2.x),
      y: Math.max(slot1.y, slot2.y),
    }
    if (startSlot.x === -1 && endSlot.x === -1) {
      startSlot.x = 0
      endSlot.x = 5
    }
    if (startSlot.y === -1 && endSlot.y === -1) {
      startSlot.y = 0
      endSlot.y = 23
    }

    return {
      start: startSlot,
      end: endSlot,
    }
  }

  isSelected = (raw, x, y, select) => {
    if (select === null) {
      return raw
    }
    if (this.selectionMode == null) {
      return raw || (select.start.x <= x && x <= select.end.x && select.start.y <= y && y <= select.end.y)
    } else if (this.selectionMode === 'unselect') {
      return raw && !(select.start.x <= x && x <= select.end.x && select.start.y <= y && y <= select.end.y)
    } else if (this.selectionMode === 'toggle') {
      return (select.start.x <= x && x <= select.end.x && select.start.y <= y && y <= select.end.y) ? !raw : raw
    }
    return false
  }

  drawGrid = (ctx) => {
    ctx.strokeStyle = '#BBB'
    ctx.lineWidth = this.lineWidth

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(this.blockWidth * 7, 0)
    for (let i = 1; i <= 25; i += 1) {
      ctx.moveTo((i % 2) === 1 ? 0 : this.blockWidth, blockHeight * i)
      ctx.lineTo(this.blockWidth * 7, blockHeight * i)
    }

    for (let j = 0; j <= 7; j += 1) {
      ctx.moveTo(this.blockWidth * j, 0)
      ctx.lineTo(this.blockWidth * j, blockHeight * 25)
    }
    ctx.stroke()
  }

  drawHeaders = (ctx) => {
    const days = ['none', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']
    const textColor = 'rgb(0, 0, 0)'

    ctx.font = '18px Arial'
    ctx.fillStyle = textColor

    for (let i = 9; i <= 20; i += 1) {
      const time = `${i.toString()} : 00`
      const center = {
        x: (this.blockWidth / 2) - (ctx.measureText(time).width / 2),
        y: (2 * (i - 8) * blockHeight) - 9,
      }
      ctx.fillText(time, center.x, center.y)
    }

    for (let i = 1; i <= 6; i += 1) {
      const day = days[i]
      const center = {
        x: (this.blockWidth * (i + 0.5)) - (ctx.measureText(day).width / 2),
        y: blockHeight - 9,
      }

      ctx.fillText(day, center.x, center.y)
    }
  }

  drawLecture = (ctx, lecture) => {
    const days = ['헤더', '월', '화', '수', '목', '금', '토']
    const boxColor = `hsl(${this.hash(lecture)}, 100%, 75%)`
    const textColor = 'rgb(0, 0, 0)'
    const timeSlots = lecture.timeSlots
    for (let i = 0; i < timeSlots.length; i += 1) {
      const timeSlot = timeSlots[i]
      const dayIndex = days.indexOf(timeSlot.dayOfWeek)

      let startTime = timeSlot.startTime.split(':').map((i) => Number(i))
      startTime = (startTime[0] * 60) + startTime[1]

      let endTime = timeSlot.endTime.split(':').map((i) => Number(i))
      endTime = (endTime[0] * 60) + endTime[1]

      const start = { x: (dayIndex * this.blockWidth) + (this.lineWidth / 2), y: ((((startTime - 540) / 30) + 1) * blockHeight) + (this.lineWidth / 2) }
      const size = { width: this.blockWidth - this.lineWidth, height: (((endTime - startTime) / 30) * blockHeight) - this.lineWidth }

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

  drawSelections = (ctx) => {
    ctx.fillStyle = 'rgba(55, 255, 55, 0.4)'

    const newSelection = this.getNewSelection()

    for (let i = 0; i < this.blocks.length; i += 1) {
      for (let j = 0; j < this.blocks[i].length; j += 1) {
        if (this.isSelected(this.blocks[i][j], j, i, newSelection)) {
          const start = {
            x: (j + 1) * this.blockWidth,
            y: (i + 1) * blockHeight,
          }
          ctx.fillRect(start.x, start.y, this.blockWidth, blockHeight)
        }
      }
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

  updateCanvas = () => {
    const context = this.getCanvasContext()
    const rect = this.getCanvasRect()
    if (!context || !rect || rect.width === 0) {
      return
    }
    this.blockWidth = Math.floor(rect.width / 7)

    context.clearRect(0, 0, window.innerWidth, window.innerHeight)

    context.fillStyle = 'rgb(255,255,255)'
    context.fillRect(0, 0, rect.width, rect.height)

    this.drawGrid(context)
    this.drawHeaders(context)
    for (let i = 0; i < this.props.lectures.length; i += 1) {
      this.drawLecture(context, this.props.lectures[i])
    }
    this.drawSelections(context)
    requestAnimationFrame(this.updateCanvas)
  }

  render() {
    return (
      <div
        ref={this.div}
        draggable="false"
        style={{ width: '100%', height: canvasHeight }}
      >
        <canvas
          id={`table${this.props.id}`}
          width={this.div.current ? this.div.current.offsetWidth : 0}
          height={canvasHeight}
          onMouseDown={(e) => this.onMouseDown(e)}
          onMouseMove={(e) => this.onMouseMove(e)}
          onMouseUp={(e) => this.onMouseUp(e)}
        />
        {this.props.lectures.map((lecture) => {
          if (lecture.id === this.state.openId) {
            return (<LecturePopup
              key={lecture.id}
              open={lecture.id === this.state.openId}
              lecture={lecture}
              onDeleteLecture={() => this.props.onDeleteLecture(lecture.id)}
              canDelete={this.props.canDeleteLecture}
              onClose={() => this.setState({ openId: null })}
            />)
          }
          return null
        })}
      </div>
    )
  }
}

TTRenderer.propTypes = {
  id: PropTypes.number,
  lectures: PropTypes.array,
  canDeleteLecture: PropTypes.bool,
  onDeleteLecture: PropTypes.func,
  onChange: PropTypes.func,
}

export default TTRenderer
