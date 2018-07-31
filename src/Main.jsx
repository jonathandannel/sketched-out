import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import Home     from './Pages/Home.jsx';
import Room     from './Pages/Room.jsx';
import { Button }   from '@material-ui/core/';
import Login    from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';


class Main extends Component {

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/login' render=
            {(props) => (
              <Login
                sendMessage={this.props.sendMessage}
                setUser={this.props.setUser}
              />
            )} />
          <Route exact path='/register' render=
            {(props) => (
              <Register
                sendMessage={this.props.sendMessage}
                setUser={this.props.setUser}
              />
            )} />
          <Route exact path='/room' render=
            {(props) => (
              <Room
                latestLineData={this.props.latestLineData}
                sendMessage={this.props.sendMessage}
                chatMessages={this.props.chatMessages}
                currentUser={this.props.currentUser}
              />
            )}
          />
        </Switch>
      </main>
    )
  }

}

export default Main;

/* This is how you pass props through router, anon function */
