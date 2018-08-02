<TimeBar timeRemaining={this.getTimeRemaining()} shouldAnimate={this.props.gameStarted} />
{this.props.userList}


<button id="undo-button" className="MuiButton-label-41" type="button" onClick={this._undo}>
  Undo
</button>

<div className="game-info">
  <h5 id="drawer-points-display"> {currentlyDrawing} won {newDrawPoints} points! </h5>
  <h5 id="guesser-points-display"> {correctGuesser} won {newGuessPoints} points! </h5>
</div>



  setNextPlayer = () => {
    let i = (roomPlayers.indexOf(this.state.currentlyDrawing) + 1) % roomPlayers.length
    this.setState({currentlyDrawing: roomPlayers[i]})
  }

  getTimeRemaining = () => {
    if (this.props.gameStarted) {
    secondsLeft = 30 - Math.floor(moment().diff(this.state.startTime) / 1000)
    console.log(secondsLeft, "sec left");
    } if (secondsLeft === 0) {
      this.endRound();
    } if (secondsLeft > 0) {
      setTimeout(() => {
        this.getTimeRemaining();
        }, 1000)
    }
    return secondsLeft
  }

  drawerPoints = (timeRemaining) => {
    newDrawPoints = 150 - ((timeRemaining) * 4);
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
    newGuessPoints = 100 - ((timeRemaining) * 3);
    $("#guesser-points-display").fadeIn("slow", function() {
        setTimeout(function() {
          $("#guesser-points-display").fadeOut('fast')
        }, 1000)
    });
    return newGuessPoints;
    // add points to db
    //user.correct_guesses ++
  }

  setClue = () => {
    let currentClue = clueArray[Math.floor((Math.random() * clueArray.length) + 1)];
    console.log("The clue is:", currentClue);
    return currentClue;
  }

  startRound = () => {
    console.log("starting round!")
    ;
    this.setState({gameStarted: true, startTime: moment()});
    setTimeout(() => {
      this.endRound();
    }, 30000)
    let roomState = {
      type: 'startingRound',
      content: {
        currentClue: this.setClue(),
        startTimer: true,
        currentlyDrawing: ''
      }
    }
    this.props.sendMessage(roomState);
    //tell the socket who is drawing, the clue, and time started
    /*
    message = {
      currentlyDrawing,
      currentClue,
      timeStarted,
    }
    */
  }

//correctGuess === true
  endRound = () => {
      secondsLeft = 0
      console.log("ending round!")
      // this.setState({gameStarted: false});
      // let timeRemaining = this.getTimeRemaining();
      this.drawerPoints(secondsLeft);
      this.guesserPoints(secondsLeft);
      this.setNextPlayer();
      this.startRound();
      //tell the socket

  }


  var newDrawPoints   = 0;
  var newGuessPoints  = 0;
  var correctGuess    = false;
  var roomPlayers     = ['PaintyGuy', 'Van Gogh', 'Yo Mama'];
  var correctGuesser  = roomPlayers[1];
  var currentlyDrawing = roomPlayers[0];
  var secondsLeft;
  var currentClue;

  this.props.sendMessage({
    type: 'roomJoin',
    content: this.props.currentUser
  })

  gameStarted: false,
  currentClue: null,
