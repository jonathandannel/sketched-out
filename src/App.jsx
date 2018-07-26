import React, {Component} from 'react';
import Leaderboard from './Components/Leaderboard.jsx';
import moment      from 'moment'
import Main        from './Main.jsx';
import NavBar      from './Components/NavBar.jsx';
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
