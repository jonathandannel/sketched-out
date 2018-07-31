import React, {Component} from 'react';
import {SketchField, Tools} from "react-sketch";
import clueArray from '../lib/clues'
import moment    from 'moment'
import Button    from '@material-ui/core/Button';
import Brushes   from '../Components/Brushes.jsx';
import Chat      from '../Components/Chat.jsx';
// import Timer     from '../Components/Timer.jsx';
import Modal     from '@material-ui/core/Modal';
import MainCanvas from '../Components/MainCanvas.jsx';

// Not good practice to have variables assigned here ----------------------------
// Mo will try to fix it
var newDrawPoints   = 0;
var newGuessPoints  = 0;
var correctGuess    = false;
var roomPlayers     = ['PaintyGuy', 'Van Gogh', 'Yo Mama'];
var correctGuesser  = roomPlayers[1];
var currentlyDrawing = roomPlayers[0];

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.socket = props.socket
    this.state = {
      gameStarted: false,
      currentClue: null,
      currentlyDrawing: roomPlayers[0],
      lineColor: 'white',
      currentUsers: []
    }
  }


  componentDidMount() {
    let allUsers = this.state.currentUsers.slice();
    allUsers.push(this.props.currentUser)
    this.setState({
      currentUsers: allUsers
    }, () => {
      this.startRound()
      console.log(allUsers)
    })
  }

// Drawing Functions

  changeColor = (color) => {
    console.log("old colour", this.state.lineColor)
    this.setState({lineColor: color.hex})
  }


// Game Logic Functions

  setNextPlayer = () => {
    let i = (roomPlayers.indexOf(this.state.currentlyDrawing) + 1) % roomPlayers.length
    this.setState({currentlyDrawing: roomPlayers[i]})
  }

  getTimeRemaining = () => {
    let secondsLeft = Math.floor(moment().diff(this.state.startTime) / 1000)
    console.log("seconds", secondsLeft);
    return secondsLeft
  }

  drawerPoints = (timeRemaining) => {
    newDrawPoints = 150 - ((30 - timeRemaining) * 4);
    console.log("Drawer points", newDrawPoints);
    setTimeout(function() {
      $("#drawer-points-display").fadeIn("slow", function() {
        setTimeout(function() {
          $("#drawer-points-display").fadeOut('fast')
        }, 1000)
      })
    }, 500)
    return newDrawPoints;
    //add points to db
  }

  // make the message display guesser's name ------------------------------
  guesserPoints = (timeRemaining) => {
    newGuessPoints = 100 - ((30 - timeRemaining) * 3);
    console.log("Guesser points", newGuessPoints);
    $("#guesser-points-display").fadeIn("slow", function() {
        setTimeout(function() {
          $("#guesser-points-display").fadeOut('fast')
        }, 1000)
    });
    return newGuessPoints;
    // add points to db
  }

  setClue = () => {
    let currentClue = clueArray[Math.floor((Math.random() * clueArray.length) + 1)];
    console.log("The clue is:", currentClue)
    this.setState({currentClue: currentClue});
  }

  startRound = () => {
    console.log("starting round!")
    this.setClue();
    this.setState({gameStarted: true, startTime: moment()});
    setTimeout(() => {
      this.endRound();
    }, 30000)
    //tell the socket who is drawing
  }

  // When correctGuess === true || secondsLeft === 0
  endRound = () => {
    console.log("ending round!")
    this.setState({gameStarted: false});
    let timeRemaining = this.getTimeRemaining();
    this.drawerPoints(timeRemaining);
    this.guesserPoints(timeRemaining);
    this.setNextPlayer();
    this.startRound();
    //tell the socket
  }
  
  render() {
    return (
      <div id="room-container">
        <span>Your clue is: <b>{this.state.currentClue}</b>
       
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
          />
          <span id="chat-area">
            <Chat
              className="chat-area"
              sendMessage={this.props.sendMessage}
              chatMessages={this.props.chatMessages}
              currentUser={this.props.currentUser}
            />
          </span>
            <div className="game-info">
              <h5 id="drawer-points-display"> {currentlyDrawing} won {newDrawPoints} points! </h5>
              <h5 id="guesser-points-display"> {correctGuesser} won {newGuessPoints} points! </h5>
            </div>
          </div>
          <button id="undo-button" className="MuiButton-label-41" type="button" onClick={this._undo}>
            Undo
          </button>
        </div>

    )
  }
}
;
