import React from 'react'
import ReactDOM from 'react-dom'


const block_width = 100
const block_height = 26

class Tmp extends React.Component {
   constructor(props) {
        super(props)
        this.state = {
            startPoint: null,
            endPoint: null,
            blocks: [
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
            ]
        }
    }

    showStatus = () => {
        const state = this.state
        if (state.startPoint != null && state.endPoint != null) {
            return 'start: (' + state.startPoint.x + ',' + state.startPoint.y + ')' + ' ' + 'end: (' + state.endPoint.x + ',' + state.endPoint.y + ')'
        } else {
            return 'null'
        }
    }

    _onMouseDown = (e) => {
        const startPoint = {x: e.clientX, y: e.clientY}
        const endPoint = {x: e.clientX, y: e.clientY}
        this.setState({startPoint, endPoint})
        window.document.addEventListener('mousemove', this._onMouseMove)
    }

    _onMouseMove = (e) => {
        const endPoint = {x: e.clientX, y:e.clientY}
        this.setState({endPoint})
    }

    _onMouseUp = (e) => {
        window.document.removeEventListener('mousemove', this._onMouseMove)

        const elt = ReactDOM.findDOMNode(this)
        const rect = elt.getBoundingClientRect()
        const eltLeft = rect.left
        const eltTop = rect.top

        const topLeft = {
            x: Math.min(this.state.startPoint.x, this.state.endPoint.x)-eltLeft,
            y: Math.min(this.state.startPoint.y, this.state.endPoint.y)-eltTop
        }
        const botRight = {
            x: Math.max(this.state.startPoint.x, this.state.endPoint.x)-eltLeft,
            y: Math.max(this.state.startPoint.y, this.state.endPoint.y)-eltTop
        }
        console.log(topLeft, botRight)

        var i, j
        var blocks = this.state.blocks
        for (i = 0; i < blocks.length; ++i) {
            for (j = 0; j < blocks[i].length; ++j) {
                if (this.overlap(i, j, topLeft, botRight))
                    blocks[i][j] = 1 - blocks[i][j]
            }
        }

        this.setState({blocks})
        console.log(this.state.blocks)
    }

    overlap = (i, j, tl, br) => {
        const tl1 = {x: (block_width+2)*(j+1), y: (block_height+2)*(i+1)}
        const br1 = {x: (block_width+2)*(j+2), y: (block_height+2)*(i+2)}
        const tl2 = tl
        const br2 = br

        // console.log('block[',i,'][',j,']')
        // console.log(tl1, br1, tl2, br2)

        if (tl1.x > br2.x || tl2.x > br1.x) {
            console.log('false 1')
            return false
        }

        if (tl1.y > br2.y || tl2.y > br1.y) {
            console.log('false 2')
            return false
        }

        console.log('true')
        return true
    }

    renderRow = (row) => {
        return row.map((elt) => (
            <td 
                selectable="false"
                ondragstart="return false;"
                draggable="false"
                style={{ 
                    backgroundColor: (elt==1?'#000000': '#FFFF00'), 
                    width: block_width.toString(), 
                    height: block_height.toString() 
                }}>
            </td>)
        )

    }

    renderBlocks = () => {
        const blocks = this.state.blocks
        return (blocks.map((row) => (<tr><th>as</th>{this.renderRow(row)}</tr>)))
    }

    render() {
        return (
            <div draggable="false" ondragstart="return false;">
            <div 
                selectable="false"
                draggable="false"
                ondragstart="return false;"
                style={{width: '1000px', height: '700px'}} 
                onMouseDown={(e) => this._onMouseDown(e)}
                onMouseUp={(e) => this._onMouseUp(e)}
                onDragStart={false}
                onDrag={false}
                onDrop={false}
            >
                <table>
                    <tbody>
                        <tr>
                            <th style={{width: block_width.toString(), height:block_height.toString()}}>Time</th>
                            <th style={{width: block_width.toString(), height:block_height.toString()}}>Mon</th>
                            <th style={{width: block_width.toString(), height:block_height.toString()}}>Tue</th>
                            <th style={{width: block_width.toString(), height:block_height.toString()}}>Wed</th>
                            <th style={{width: block_width.toString(), height:block_height.toString()}}>Thr</th>
                            <th style={{width: block_width.toString(), height:block_height.toString()}}>Fri</th>
                            <th style={{width: block_width.toString(), height:block_height.toString()}}>Sat</th>
                        </tr>
                        {this.renderBlocks()}
                    </tbody>
                </table>
            </div>
            <div>
                {this.showStatus()}
            </div>
            </div>
        )
    }
}


export default Tmp
