import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx';
import Room from './Pages/Room.jsx';


class Main extends Component {

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/room' component={Room} />
        </Switch>
      </main>
    )
  }

}

export default Main;
