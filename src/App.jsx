import React, {Component} from 'react';
import Main from './Main.jsx';
import NavBar from './Components/NavBar.jsx';

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
