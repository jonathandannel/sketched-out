import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx';
import Room from './Pages/Room.jsx';
import Button from '@material-ui/core/Button';
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx';

class Main extends Component {

  render() {
    return <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/room' render={(props) => (
            <Room
              messages={this.props.messages}
              sendMessage={this.props.sendMessage}
            />
          )} />
          <Route exact path="/login" component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </main>;
  }

}

export default Main;

/* This is how you pass props through router, anon function */
