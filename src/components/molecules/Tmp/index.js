import React from 'react'
import ReactDOM from 'react-dom'


class Tmp extends React.Component {
   constructor(props) {
        super(props)
        this.state = {
            startPoint: null,
            endPoint: null,
            blocks: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
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
            y: Math.max(this.state.startPoint.y, this.state.endPoint.y)-eltTop
        }
        const botRight = {
            x: Math.max(this.state.startPoint.x, this.state.endPoint.x)-eltLeft,
            y: Math.min(this.state.startPoint.y, this.state.endPoint.y)-eltTop
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
        const tl1 = {x: 100*j, y: 100*i}
        const br1 = {x: 100*(j+1), y: 100*(i+1)}
        const tl2 = tl
        const br2 = br

        // console.log(tl1, br1, tl2, br2)

        if (tl1.x > br2.x || tl2.x > br1.x)
            return false

        if (tl1.y < br2.y || tl2.y < br1.y)
            return false

        return true
    }

    included = (i, j, tl, br) => {
        console.log(br.y, '<=', 100*i, '<=', tl.y, ':', (br.y <= 100*i) && (100*i <= tl.y))
        if ((br.y <= 100*i+50) && (100*i+50 <= tl.y) && (tl.x <= 100*j+50) && (100*j+50 <= br.x))
            return true
        return false
    }

    renderRow = (row) => {
        return row.map((elt) => (<td style={{ border: '1px solid black', width: '100px', height: '100px' }}>{elt}</td>))
    }

    renderBlocks = () => {
        const blocks = this.state.blocks
        return (blocks.map((row) => (<tr>{this.renderRow(row)}</tr>)))
    }

    render() {
        return (
            <div draggable="false">
            <div 
                draggable="false"
                style={{width: '500px', height: '500px'}} 
                onMouseDown={(e) => this._onMouseDown(e)}
                onMouseUp={(e) => this._onMouseUp(e)}
                onDragStart={false}
                onDrag={false}
                onDrop={false}
            >
                <table>
                    <tbody>
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
