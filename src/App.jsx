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
      currentUser: ''
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
      console.log(parsedMessage);

      switch (parsedMessage.type) {
        case 'latestLineData':
          this.setState({
            latestLineData: parsedMessage.content
          });
        case 'userName':
          this.setState({
            currentUser: parsedMessage.content
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

  sendMessage = message => {
    this.socket.send(JSON.stringify(message))
  }

  render() {
    return (
      <div>
        <NavBar currentUser={this.state.currentUser}/>
        <Main
          latestLineData={this.state.latestLineData} 
          sendMessage={this.sendMessage}
          setUser={this.setUser}
        />
      </div>
    )
  }
}

export default App;
