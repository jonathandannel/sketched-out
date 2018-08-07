import React, {Component} from 'react';
import { Link }    from 'react-router-dom'
import clueArray   from '../lib/clues'
import moment      from 'moment'
import Button      from '@material-ui/core/Button';
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
      lineColor: 'black',
      seconds: 3
    }
    this.Auth = new AuthService()
  }

  startTimer = () => {
    if (this.props.countdown === true){
      this.countThree()
    }
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

  componentWillReceiveProps(nextProps) {
    if (!this.props.countdown && nextProps.countdown) {
      console.log('here')
      this.startTimer();
    }
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

  countThree = () => {
    console.log('cd,', this.props.countdown)
    let timer = setInterval(() => {
      console.log('cd after set interval,', this.props.countdown)
      this.setState(prevState => {
        return {seconds: prevState.seconds - 1}
      }, (() => {
        console.log('in interval')
        if(this.state.seconds <= 0){

          this.props.resetCountdown()
          console.log(this.props.countdown, 'false?')
          this.setState({
            seconds: 3
          }, () => clearInterval(timer))
        }
      }));
    }, 1000)
  }
  

  componentWillUnmount() {
    this.props.sendMessage({
          type: 'roomLeave',
          content: this.props.currentUser
        })
  }

// Drawing Functions

  startRound = () => {
    this.props.sendMessage({
      type: 'beginRound',
      content: ''
    })
    startSound.play();
    this.props.resetCountdown(true);
    this.countThree()
  }


// Game Logic Functions


  render() {

    return (
      <div id="room-container">
        <div className='userDisplay'>
        <div className='userTurnDisplay'>
          <span className="clue-for-drawer">{this.displayClue()}</span>
          <span className="display-drawers">{this.displayUsers()}</span>
          <div>Time {this.state.seconds}</div>
        </div>
        <div className='chatDummy'>
        </div>
        </div>

      <div id="canvas-container">
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
            lineColor={this.state.lineColor}
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
    </div>
    )
  }
}
