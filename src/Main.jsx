import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx';
import Room from './Pages/Room.jsx';
import Button from '@material-ui/core/Button';
import Login from './Pages/Login.jsx'

class Main extends Component {

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/room' component={Room} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </main>
    )
  }

}

export default Main;

/* This is how you pass props through router, anon function */
