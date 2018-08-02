import React, {Component} from 'react';
import {SketchField, Tools} from "react-sketch";
import clueArray from '../lib/clues'
import moment    from 'moment'
import Button    from '@material-ui/core/Button';
import Brushes   from '../Components/Brushes.jsx';
import Chat      from '../Components/Chat.jsx';
import TimeBar     from '../Components/TimeBar.jsx';
import Modal     from '@material-ui/core/Modal';
import MainCanvas from '../Components/MainCanvas.jsx';

// Not good practice to have variables assigned here ----------------------------
// Mo will try to fix it


export default class Room extends Component {
  constructor(props) {
    super(props);
    this.socket = props.socket
    this.state = {
      lineColor: 'white'
    }
  }

  componentDidMount() {

    this.props.sendMessage({
      type: 'receiveLatestCanvasData',
      content: ''
    })
  }

// Drawing Functions

  changeColor = (color) => {
    console.log("old colour", this.state.lineColor)
    this.setState({lineColor: color.hex})
  }


// Game Logic Functions


  render() {
    return (
      <div id="room-container">
        <TimeBar shouldAnimate={this.props.gameStarted} />
        <span>Your clue is: <b>{this.props.currentClue}</b>
        </span>
      <div id="canvas-container">
        <div id="brush-container">
          <Brushes
            className="brush-area color-picker"
            lineColor={this.state.lineColor}
            onChange={this.changeColor}
          />
        </div>
          <MainCanvas
            className="canvas-area"
            sendMessage={this.props.sendMessage}
            lineColor={this.state.lineColor}
            latestLineData={this.props.latestLineData}
            latestCanvas={this.props.latestCanvas}
          />
          <span id="chat-area">
            <Chat
              className="chat-area"
              sendMessage={this.props.sendMessage}
              chatMessages={this.props.chatMessages}
              currentUser={this.props.currentUser}
            />
          </span>
        </div>
      </div>

    )
  }
}
