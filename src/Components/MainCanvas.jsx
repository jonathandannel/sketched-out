import React, {Component} from 'react';

export default class MainCanvas extends Component {
  constructor(props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.stopPainting = this.stopPainting.bind(this)
  }

    isPainting = false;
    line = null;

    userLines = []
    latestLineIndex = 0

    prevPos = { offsetX: 0, offsetY: 0}
    userStrokeStyle = '#EE92C2';

  componentDidMount() {
    this.canvas.width = 1000;
    this.canvas.height = 800;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 10
  }


  handleMouseDown = ({ nativeEvent })=> {
    const { offsetX, offsetY } = nativeEvent;
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };
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

  paint = (prevPos, currPos, strokeStyle) => {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

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

  //make message into an object with options
  sendPaintData = () => {
    this.userLines.push(this.line)
    this.props.sendMessage(this.userLines)

    this.latestLineIndex = this.userLines.length - 1
  }

  stopPainting = (e) => {
    this.isPainting = false;
  }

  render() {
    if (this.props.userLines.length > 0) {
      console.log(this.props.userLines)

      this.props.userLines
      .slice(this.latestLineIndex)
      .forEach((line) => {
        this.paint(line.prevPos, line.currPos, line.strokeStyle)
      });

      this.latestLineIndex = this.userLines.length - 1
    }

    return (
        <div>
          <canvas
            ref={(ref) => (this.canvas = ref)}
            style={ {background: 'black'} }
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.stopPainting}
            onMouseLeave={this.stopPainting}
          />
        </div>
    )
  }
}
