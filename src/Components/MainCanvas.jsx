import React, {Component} from 'react';

export default class MainCanvas extends Component {
  constructor(props) {
    super(props)
    this.getCoordinates = this.getCoordinates.bind(this)
    this.startPainting = this.startPainting.bind(this)
    this.stopPainting = this.stopPainting.bind(this)
  }

  isPainting = false;

  getCoordinates = e => {
    if (this.isPainting) {
      let x = e.screenX;
      let y = e.screenY;
      let messageObject = {
        x: x,
        y: y
      }

      console.log('X => ', x, 'Y => ', y);
      this.props.sendMessage(messageObject)
    }
  }

  startPainting = e => {
    this.isPainting = true;
  }

  stopPainting = e => {
    this.isPainting = false;
  }

  render() {
    return (
        <div>
          <canvas
            style={ {background: 'black'} }
            onMouseDown={this.startPainting}
            onMouseUp={this.stopPainting}
            onMouseLeave={this.stopPainting}
            onMouseMove={this.getCoordinates}
          />
        </div>
    )
  }
}
