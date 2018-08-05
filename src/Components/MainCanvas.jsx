import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';



export default class MainCanvas extends Component {
  constructor(props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.stopPainting = this.stopPainting.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.something = this.something.bind(this)
  }

  isPainting = false;
  line = null;

  userLines = []
  latestLineIndex = 0

  prevPos = { offsetX: 0, offsetY: 0}
  userStrokeStyle = this.props.lineColor;

  componentDidMount() {
    this.canvas.width = 900;
    this.canvas.height = 450;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = this.props.brushSize
  }

  handleMouseDown = ({ nativeEvent })=> {
    // console.log({nativeEvent})
    if (this.props.currentlyDrawing === this.props.currentUser) {
      this.isPainting = true;
      const { offsetX, offsetY } = nativeEvent;
      const offsetData = { offsetX, offsetY };
      this.prevPos = { offsetX, offsetY };
      this.paint(offsetData, offsetData, this.userStrokeStyle);
    }
  }

  handleMouseMove = ({ nativeEvent }) => {
    if (this.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offsetData = { offsetX, offsetY };

      const positionData = {
        start: { ...this.prevPos },
        stop: {...offsetData}
      };

      this.line = {
        prevPos: this.prevPos,
        currPos: offsetData,
        strokeStyle: this.userStrokeStyle
      }

      this.paint(this.prevPos, offsetData, this.userStrokeStyle);
      this.sendPaintData()
    }
  }
  onTouchStart = ({ nativeEvent })=> {
    // console.log({nativeEvent})
    // nativeEvent.preventDefault()
    if (this.props.currentlyDrawing === this.props.currentUser) {
      const { clientX, clientY } = nativeEvent.targetTouches[0];
      this.isPainting = true;
      this.prevPos = { clientX, clientY };
    }
  }

  onTouchMove = ({ nativeEvent }) => {
    if (this.props.currentlyDrawing === this.props.currentUser) {
      // nativeEvent.preventDefault()
      if (this.isPainting) {
        const { clientX, clientY } = nativeEvent.targetTouches[0];
        const offsetData = { clientX, clientY };
        const positionData = {
          start: { ...this.prevPos },
          stop: {...offsetData}
        };

        this.line = {
          prevPos: this.prevPos,
          currPos: offsetData,
          strokeStyle: this.userStrokeStyle
        }

        this.touchPaint(this.prevPos, offsetData, this.userStrokeStyle);
        this.sendPaintData()
      }
    }
}

  touchPaint = (prevPos, currPos, strokeStyle) => {
    if (this.props.currentlyDrawing === this.props.currentUser) {
      // console.log('PAINT EXECUTING')
      const { clientX, clientY } = currPos;
      const { clientX: x, clientY: y } = prevPos;

      this.ctx.beginPath();
      this.ctx.strokeStyle = strokeStyle;
      // Move the the prevPosition of the mouse
      this.ctx.moveTo(x, y);
      // Draw a line to the current position of the mouse
      this.ctx.lineTo(clientX, clientY);
      // Visualize the line using the strokeStyle
      this.ctx.stroke();
      this.prevPos = { clientX, clientY };
    }
  }

  paint = (prevPos, currPos, strokeStyle) => {
      const { offsetX, offsetY } = currPos;
      const { offsetX: x, offsetY: y } = prevPos;
      this.ctx.lineWidth = this.props.brushSize;

      this.ctx.beginPath();
      this.ctx.strokeStyle = strokeStyle;
      // Move the the prevPosition of the mouse
      this.ctx.moveTo(x, y);
      // Draw a line to the current position of the mouse
      this.ctx.lineTo(offsetX, offsetY);
      // Visualize the line using the strokeStyle
      this.ctx.stroke();
      this.prevPos = { offsetX, offsetY };
  }

  setBrushSize = (size) => {
    this.ctx.lineWidth = size;

    this.props.sendMessage({
      type: 'changeBrushSize',
      content: size
    })
  }

  userClearCanvas = () => {
    this.userLines = [];
    this.isPainting = false;
    this.ctx.beginPath();
    this.ctx.rect(0, 0, 900, 450);
    this.ctx.fillStyle = 'white';
    this.ctx.fill()

    this.props.sendMessage({
      type: 'userClearCanvas',
      content: ''
    })
  }

  //make message into an object with options
  sendPaintData = () => {
    this.props.sendMessage({
      type: 'latestLineData',
      content: [this.line]
    })
    this.latestLineIndex = this.userLines.length - 1
  }

  stopPainting = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    this.prevPos = { offsetX, offsetY };
    this.userLines = []
    this.isPainting = false;
  }

  something = () => {
    let stuff = (
      <div>aaaaaaaaaaa</div>
    )
    return stuff
  }
  render() {
    if (this.props.latestLineData.length < 1 && this.ctx) {
      // console.log('empty array', this.ctx.fillStyle);
      this.ctx.beginPath();
      this.ctx.rect(0, 0, 900, 450);
      this.ctx.fillStyle = 'white';
      this.ctx.fill()

    }

    if (this.props.latestLineData.length > 0) {

      this.props.latestLineData
      .slice(this.latestLineIndex)
      .forEach((line) => {
        this.paint(line.prevPos, line.currPos, line.strokeStyle)
      });

      this.latestLineIndex = this.userLines.length - 1
    }

    this.userStrokeStyle = this.props.lineColor

    return (
        <div>
          <div>
          <canvas
            id='canvas'
            ref={(ref) => (this.canvas = ref)}
            style={ {background: 'white'} }
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.stopPainting}
            onMouseLeave={this.stopPainting}
            onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.stopPainting}
          />
          </div>
          <div id='brush-sizes'>
            <div>
            <Button
              id="small-brush"
              variant="fab" aria-label="S"
              onClick={() => this.setBrushSize(5)}>
              <img src="./styles/inkpen.png" alt="inkpen" height="10" width="10" /> 
            </Button>
            <Button
              variant="fab" aria-label="M"
              onClick={() => this.setBrushSize(10)}>
              <img src="./styles/inkpen.png" alt="inkpen" height="22" width="22" /> 
            </Button>
            <Button
              variant="fab" aria-label="L"
              onClick={() => this.setBrushSize(15)}>
              <img src="./styles/inkpen.png" alt="inkpen" height="34" width="34" /> 
            </Button>
            </div>
            <div>
            <Button variant="fab" onClick={() => this.userClearCanvas()}>
              <p className='fas fa-trash'></p></Button>
            </div>
          </div>
        </div>
    )
  }
}
