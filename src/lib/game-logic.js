import moment from 'moment'
import clues from './clues'

const correctGuess = false;
const roomPlayers = ['a', 'b', 'c'];
let drawer = roomPlayers[0];


// Set currentlyDrawing
const setNextPlayer = () => {
  i = (roomPlayers.indexOf(currentlyDrawing) + 1) % roomPlayers.length
  currentlyDrawing = roomPlayers[i]
};


// Timer
let now = new Date()
let deadline = moment().add(30, 'seconds').valueOf();
let secondsLeft = 0;

function getTimeRemaining() {
  secondsLeft = deadline - moment().valueOf();
};


// Calculate Points
const drawerPoints = () => {
  return 150 - ((30 - secondsLeft) * 4);
  //add points to db
  //display new points on screen
}

const guesserPoints = () => {
  return 100 - ((30 - secondsLeft) * 3);
  //add points to db
  //display new points on screen
}


// Start Round
const startRound = () => {
  currentClue = clues[Math.floor((Math.random() * clues.length) + 1)];
  circle.animate(1);
}


// End Round
const endRound = () => {
  getTimeRemaining();
  drawerPoints();
  guesserPoints();
  setNextPlayer();
  startRound();
}
