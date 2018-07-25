import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx';
import Room from './Pages/Room.jsx';
import Button from '@material-ui/core/Button';

class Main extends Component {

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/room' render={(props) => (
            <Room message={this.props.message} />
          )} />
        </Switch>
      </main>
    )
  }

}

export default Main;
