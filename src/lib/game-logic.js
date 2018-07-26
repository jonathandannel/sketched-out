import moment from 'moment'
import clues from './clues'
import Timer from '../Component/Timer.jsx'

const correctGuess = false;
const roomPlayers = ['a', 'b', 'c'];
let drawer = roomPlayers[0];
let now = new Date()
let deadline = moment().add(30, 'seconds').valueOf();
let secondsLeft = 0;


const gameFns = {

  setNextPlayer() {
    i = (roomPlayers.indexOf(currentlyDrawing) + 1) % roomPlayers.length
    currentlyDrawing = roomPlayers[i]
  },

  getTimeRemaining() {
    secondsLeft = deadline - moment().valueOf();
  },

  drawerPoints() {
    return 150 - ((30 - secondsLeft) * 4);
    //add points to db
    //display new points on screen
  },

  guesserPoints() {
    return 100 - ((30 - secondsLeft) * 3);
    //add points to db
    //display new points on screen
  },

  startRound() {
    currentClue = clues[Math.floor((Math.random() * clues.length) + 1)];
    circle.animate(1);
  },

  endRound() {
    getTimeRemaining();
    drawerPoints();
    guesserPoints();
    setNextPlayer();
    startRound();
  }

};

export gameFns;
