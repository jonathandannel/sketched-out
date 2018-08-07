import React, {Component} from 'react';
import { Link }    from 'react-router-dom'
import clueArray   from '../lib/clues'
import moment      from 'moment'
import Button      from '@material-ui/core/Button';
import Brushes     from '../Components/Brushes.jsx';
import Chat        from '../Components/Chat.jsx';
import TimeBar     from '../Components/TimeBar.jsx';
import Modal       from '@material-ui/core/Modal';
import MainCanvas  from '../Components/MainCanvas.jsx';
import AuthService from "../AuthService.jsx";
import RoomScores from '../Components/RoomScores.jsx';

const startSound = new Audio();
startSound.src = "./src/Sounds/BoxingBellRing.mp3";
startSound.volume = 0.5;

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.socket = props.socket
    this.state = {
      lineColor: 'black'
    }
    this.Auth = new AuthService()
  }

  componentDidMount() {
    //Waits for websocket to load before trying to send a message
    //to avoid blank page
    let poller = setInterval(() => {
      if (this.socket) {
        this.props.sendMessage({
          type: 'roomJoin',
          content: this.props.currentUser
        })
        this.props.sendMessage({
          type: 'receiveLatestCanvasData',
          content: ''
        })
        clearInterval(poller);
      }
    }, 100);
  }

  displayClue = () => {
    if (this.props.currentUser === this.props.currentlyDrawing) {
      return (
          <div>Your clue is: <b>{this.props.currentClue}</b></div>
        )
    }
  }

  displayUsers = () => {
    if (this.props.currentUser === this.props.currentlyDrawing ) {
      return (
        <div>
          <span>It's your turn! </span>
          <span>Next up: {this.props.nextGuesser}</span>
        </div>
        )
    } else {
      return (
        <div>
        <span>Next up: {this.props.nextGuesser}</span>
        </div>
        )
    }
  }

  componentWillUnmount() {
    this.props.sendMessage({
          type: 'roomLeave',
          content: this.props.currentUser
        })
  }

// Drawing Functions

  changeColor = (color) => {
    this.setState({lineColor: color.hex})
  }

  startRound = () => {
    this.props.sendMessage({
      type: 'beginRound',
      content: ''
    })
    startSound.play();
  }

  showCountdown = () => {
    if (this.props.countdownTicks > 0) {
      return this.props.countdownTicks
    }
  }

// Game Logic Functions


  render() {
    return (
      <div id="room-container">
        <div className='userDisplay'>
        <div className='userTurnDisplay'>
          <span className="clue-for-drawer">{this.displayClue()}</span>
          <span className="display-drawers">{this.displayUsers()}</span>
        </div>
        <div className='chatDummy'>
        </div>
        </div>

      <div id="canvas-container">
          <h1>{this.showCountdown()}</h1>
          <div className='brush-canvas'>

          <div>
          <TimeBar
            shouldAnimate={this.props.gameStarted}
            timeRemaining={this.props.secondsLeft}
          />
          <MainCanvas
            className="canvas-area"
            sendMessage={this.props.sendMessage}
            lineColor={this.state.lineColor}
            latestLineData={this.props.latestLineData}
            latestCanvas={this.props.latestCanvas}
            brushSize={this.props.brushSize}
            currentlyDrawing={this.props.currentlyDrawing}
            currentUser={this.props.currentUser}
          />
          </div>
          </div>
          <div className='chat-and-start'>
          <span id="chat-area">
            <Chat
              className="chat-area"
              sendMessage={this.props.sendMessage}
              chatMessages={this.props.chatMessages}
              currentUser={this.props.currentUser}
              currentClue={this.props.currentClue}
              guesserPoints={this.props.guesserPoints}
              currentlyDrawing={this.props.currentlyDrawing}
            />
            <div id="chat-title"> CHAT
            </div>
          </span>
          <div className='start-button-container'>
            <Button className='start-button' onClick={this.startRound}>Start</Button>
            </div>
        </div>
        <span id="room-scores">
          <RoomScores
            players={this.props.players}
          />
        </span>
      </div>
      <div id="brush-container">
        <Brushes
          className="brush-area color-picker"
          lineColor={this.state.lineColor}
          onChange={this.changeColor}
        />
      </div>
    </div>
    )
  }
}
