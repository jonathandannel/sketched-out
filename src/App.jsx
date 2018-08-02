import React, {Component} from 'react';
import Leaderboard from './Components/Leaderboard.jsx';
import Main        from './Main.jsx';
import NavBar      from './Components/NavBar.jsx';
import AuthService from "./AuthService.jsx";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latestLineData: [],
      chatMessages: [],
      currentUser: '',
      currentUsers: [],
      latestCanvas: [],
      gameStarted: true,
      currentClue: '',
      secondsLeft: 30
    }
  }

  componentDidMount() {
    this.Auth = new AuthService();
    this.socket = new WebSocket(`ws://localhost:8080`);

    this.socket.onopen = (e) => {
      console.log('==> Socket connection started!')
    }

    this.socket.onmessage = (e) => {
      const parsedMessage = JSON.parse(e.data)
      // console.log(parsedMessage);

      switch (parsedMessage.type) {
        case 'latestLineData':
          this.setState({
            latestLineData: parsedMessage.content
          });
        break;
        case 'chatMessages':
          let allMessages = this.state.chatMessages.slice();
          allMessages.push(parsedMessage.content)
          this.setState({
            chatMessages: allMessages
          })
        break;
        case 'userList':
          this.setState({
            currentUsers: parsedMessage.content
          })
        break;
        case 'latestCanvas':
          this.setState({
            latestLineData: parsedMessage.content
          })
        break;
        case 'roundStarted':
          this.setState({
            currentClue: parsedMessage.content.currentClue
          })
          this.setState({
            currentlyDrawing: parsedMessage.content.currentlyDrawing
          })
        break;
        case 'timer':
          this.setState({
            secondsLeft: parsedMessage.content
          })
        break;
      }
    }
  }

  setUser = (userName, cb) => {
    console.log('setuser user:',userName)
    this.setState({
      currentUser: userName
    }, cb())
  }

  clearUser = () =>{
    this.setState({
      currentUser: ''
    })
  }

  sendMessage = message => {
    this.socket.send(JSON.stringify(message));
  }

  render() {
    return (
      <div className='mainContainer'>
        <NavBar
          currentUser={this.state.currentUser}
          clearUser={this.clearUser}
          setUser={this.setUser}
        />
        <Main
          latestLineData={this.state.latestLineData}
          sendMessage={this.sendMessage}
          chatMessages={this.state.chatMessages}
          currentUser={this.state.currentUser}
          setUser={this.setUser}
          clearUser={this.clearUser}
          userList={this.state.currentUsers}
          currentClue={this.state.currentClue}
          gameStarted={this.state.gameStarted}
          secondsLeft={this.state.secondsLeft}
        />
      </div>
    )
  }
}


export default App;
