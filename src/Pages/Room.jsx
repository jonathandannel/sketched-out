import React, {Component} from 'react';
import {SketchField, Tools} from "react-sketch";
import clueArray from '../lib/clues'
import moment    from 'moment'
import Button    from '@material-ui/core/Button';
import Brushes   from '../Components/Brushes.jsx';
import Chat      from '../Components/Chat.jsx';
import Timer     from '../Components/Timer.jsx';
import Modal     from '@material-ui/core/Modal';
// import Chat   from './Components/Chat.jsx';


const correctGuess = false;
const roomPlayers = ['a', 'b', 'c'];

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.socket = props.socket
    this.state = {
      gameStarted: false,
      currentClue: null,
      currentlyDrawing: roomPlayers[0],
      drawingState: {
            lineColor: 'black',
            lineWidth: 7,
            fillColor: 'green',
            backgroundColor: 'transparent',
            background: 'blue',
            shadowWidth: 0,
            shadowOffset: 0,
            tool: Tools.Pencil,
            canUndo: true,
            controlledSize: false,
            stretched: true,
            stretchedX: false,
            stretchedY: false,
            originX: 'left',
            originY: 'top'
          }
      }
    }


  sendMessage = (sock) => {
    const message = {
      type: 'text',
      content: 'hi!'
    }
    sock.send(message)
    console.log('sending', sock)
  }

// Drawing Functions

  changeColor = (color) => {
    let newDrawState = this.state.drawingState;
    newDrawState.lineColor = color.hex;
    this.setState({drawingState: newDrawState})
  }

  _undo = () => {
    this._sketch.undo();
    this.setState({
        canUndo: this._sketch.canUndo(),
        canRedo: this._sketch.canRedo()
    })
  };

  _onSketchChange = () => {
    let prev = this.state.canUndo;
    let now = this._sketch.canUndo();
    if (prev !== now) {
        this.setState({canUndo: now});
    }
  };


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
    let newDrawPoints = 150 - ((30 - timeRemaining) * 4);
    console.log("Drawer points", newDrawPoints);
    return newDrawPoints;
    //add points to db
    //display new points on screen
  }

  guesserPoints = (timeRemaining) => {
    let newGuessPoints = 100 - ((30 - timeRemaining) * 3);
    console.log("Guesser points", newGuessPoints);
    return newGuessPoints;
    // add points to db
    // display new points on screen
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
    // setTimeout(function() {
    //   console.log("running time remaining", this.getTimeRemaining)
    // }, 3000)
    setTimeout(() => {
      this.endRound();
    }, 30000)
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
  }

  componentDidMount() {
    this.startRound()
  }

  render() {
    return (
      <div className="room-container">
        <h1>This is a room.</h1>
          <h3 className="drawer-points"> </h3>
          <h3 className="guesser-points"> </h3>
        <Timer shouldAnimate={this.state.gameStarted} />
        <button onClick={() => {this.sendMessage(this.socket)}}>click</button>
        <br />
        <p>Your clue is: <b>{this.state.currentClue}</b></p>
        <SketchField {...this.state.drawingState}
        ref={(c) => this._sketch = c}
        onChange={this._onSketchChange}
         />
          <button type="button"
              onClick={this._undo}>
          Undo
          </button>
        <Chat className="chat-container" />
        <Brushes className="brushes" lineColor={this.state.lineColor} onChange={this.changeColor} />
      </div>
    )
  }
};


