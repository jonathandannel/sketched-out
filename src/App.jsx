import React, {Component} from 'react';
import Main from './Main.jsx';
import NavBar from './Components/NavBar.jsx';

class App extends Component {

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
        <Main />
      </div>
    )
  }
}

export default App;
