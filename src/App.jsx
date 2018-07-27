import React, {Component} from 'react';
import Leaderboard from './Components/Leaderboard.jsx';
// import moment      from 'moment'
import Main        from './Main.jsx';
import NavBar      from './Components/NavBar.jsx';
import AuthService from "./AuthService.jsx";
// import Brushes  from './Components/Brushes.jsx';
// import Chat     from './Components/Chat.jsx';
// import Footer   from './Components/Footer.jsx';
// import Brushes  from './Components/Brushes.jsx';
// import Home     from './Pages/Home.jsx';
// import Login    from './Pages/Login.jsx';
// import Room     from './Pages/Room.jsx';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.Auth = new AuthService();
    // const user = this.Auth.getProfile()
    // console.log(user)
    this.socket = new WebSocket("ws://localhost:8080");
    this.socket.onopen = (e) => {
      console.log('==> Socket connection started!')
    }

    this.socket.onmessage = (e) => {
      let incomingMessage = e.data

      let parsedMessage = JSON.parse(incomingMessage);

      this.setState({
        messages: parsedMessage
      });

    }
  }

  sendMessage = message => {
    this.socket.send(JSON.stringify(message))
  }

  render() {
    return (
      <div>
        <NavBar />
        <Main
          messages={this.state.messages} sendMessage={this.sendMessage}
        />
      </div>
    )
  }
}

export default App;
