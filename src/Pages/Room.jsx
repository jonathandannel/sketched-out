import React, {Component} from 'react';
import {SketchField, Tools} from "react-sketch";
// import Chat from './Components/Chat.jsx';
import Button from '@material-ui/core/Button';


export default class Room extends Component {
  constructor(props) {
    super(props)
    this.sketchRef = React.createRef()
    this.renderMessages = this.renderMessages.bind(this)
    this.state = {
      isPainting: false
    }
  }

  renderMessages = () => {
    const messages = this.props.messages.map((message) => {
      return (
        <div>{message}</div>
      )
    })
    return messages;
  }

  getCoordinates = (e) => {
    if (this.state.isPainting) {
      console.log(e);
      console.log('X => ', e.screenX);
      console.log('Y => ', e.screenY);
    }
  }

  onPainting = () => {
    this.setState({
      isPainting: true
    })
  }

  stopPainting = () => {
    this.setState({
      isPainting: false
    })
  }

  render() {
    return (
      <div>
        <h1>This is a room.</h1>
        <h2>Messages:</h2>
        {this.renderMessages()}
        <button onClick={() => {this.props.sendMessage('hi')}}>click</button>
        <div id="canvas-container" onMouseDown={this.onPainting} onMouseMove={this.getCoordinates} onMouseUp={this.stopPainting}>
          <SketchField ref={this.sketchRef} />
        </div>
      </div>
    )
  }
}
