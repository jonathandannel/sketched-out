import React, {Component} from 'react';
import Main from './Main.jsx';
import NavBar from './Components/NavBar.jsx';
import moment from 'moment'

class App extends Component {
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
