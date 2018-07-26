import React, {Component} from 'react';
import Leaderboard from './Components/Leaderboard.jsx';
import Main        from './Main.jsx';
import NavBar      from './Components/NavBar.jsx';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'this is app state'
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://0.0.0.0:3001");
    this.socket.onopen = (e) => {
      console.log('==> Socket connection started!')
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Main socket={this.socket} />
      </div>
    )
  }
}

export default App;
