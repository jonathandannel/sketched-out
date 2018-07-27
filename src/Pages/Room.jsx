import React, {Component} from 'react';
import {SketchField, Tools} from "react-sketch";

export default class Room extends Component {
  constructor(props) {
    super(props)
    this.sketchRef = React.createRef()
  }

  isPainting = false;

  getCoordinates = e => {
    if (this.isPainting) {
      let x = e.screenX;
      let y = e.screenY;
      console.log('X => ', x, 'Y => ', y);
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
        <h1>This is a room.</h1>
        <div id="canvas-container"
          onMouseDown={this.startPainting}
          onMouseMove={this.getCoordinates}
          onMouseUp={this.stopPainting}>
          <SketchField />
        </div>
      </div>
    )
  }
}
