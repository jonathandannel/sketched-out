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
      roomUsers: []
    }
  }

  componentDidMount() {
    this.Auth = new AuthService();
    // const user = this.Auth.getProfile()
    // console.log(user)
    this.socket = new WebSocket(`ws://localhost:8080`);
    this.socket.onopen = (e) => {
      console.log('==> Socket connection started!')
    }

    this.socket.onmessage = (e) => {
      const parsedMessage = JSON.parse(e.data)

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
        case 'roomUpdate':
          this.setState({
            roomUsers: parsedMessage.content.roomUsers
          })
        break;
      }
    }
  }

  setUser = userName => {
    console.log('setuser user:',userName)
    this.setState({
      currentUser: userName
    })
  }

  clearUser = () =>{
    this.setState({
      currentUser: ''
    })
  }

  sendMessage = message => {
    this.socket.send(JSON.stringify(message))
  }

  render() {
    return (
      <div>
        <NavBar
          currentUser={this.state.currentUser}
          clearUser={this.clearUser}/>
        <Main
          latestLineData={this.state.latestLineData}
          sendMessage={this.sendMessage}
          chatMessages={this.state.chatMessages}
          currentUser={this.state.currentUser}
          setUser={this.setUser}
          clearUser={this.clearUser}
          roomUsers={this.state.roomUsers}
        />
      </div>
    )
  }
}

export default App;
