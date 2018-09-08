import React, {Component} from 'react';
import { Switch, Route }  from 'react-router-dom'
import Home         from './Pages/Home.jsx';
import Room         from './Pages/Room.jsx';
import { Button }   from '@material-ui/core/';
import Login        from './Pages/Login.jsx';
import Register     from './Pages/Register.jsx';
import CreateRoomForm from './Components/CreateRoomForm.jsx';


class Main extends Component {

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' 
            render=
              {(props) => (
                <Home 
                  sendMessage={this.props.sendMessage}
                />
              )}
          />
          <Route exact path='/create' 
            render=
              {(props) => (
                <CreateRoomForm 
                  sendMessage={this.props.sendMessage}
                  currentUser={this.props.currentUser}
                />
              )}
          />
          <Route exact path='/home' component={Home} />
          <Route exact path='/login' 
            render=
              {(props) => (
                <Login
                  sendMessage={this.props.sendMessage}
                  setUser={this.props.setUser}
                />
              )} 
          />
          <Route exact path='/register' render=
            {(props) => (
              <Register
                sendMessage={this.props.sendMessage}
                setUser={this.props.setUser}
              />
            )} />
          <Route exact path='/room' render=
            {(props) => (
              <Room
                latestLineData={this.props.latestLineData}
                sendMessage={this.props.sendMessage}
                chatMessages={this.props.chatMessages}
                currentUser={this.props.currentUser}
                userList={this.props.userList}
                latestCanvas={this.props.latestCanvas}
                currentClue={this.props.currentClue}
                gameStarted={this.props.gameStarted}
                socket={this.props.socket}
                secondsLeft={this.props.secondsLeft}
                brushSize={this.props.brushSize}
                currentlyDrawing={this.props.currentlyDrawing}
                nextGuesser={this.props.nextGuesser}
                players={this.props.players}
                guesserPoints={this.props.guesserPoints}
                countdownTicks={this.props.countdownTicks}
                showStartButton={this.props.showStartButton}
              />
            )}
          />
        </Switch>
      </main>
    )
  }

}

export default Main;

