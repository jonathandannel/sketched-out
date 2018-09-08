import React, {Component} from 'react';
import Button             from '@material-ui/core/Button';
import { Link }           from 'react-router-dom';
import Leaderboard        from '../Components/Leaderboard.jsx';
import SimpleModalWrapped from '../Components/Rules-modal.jsx';
import Card from '@material-ui/core/Card';


export default class Home extends Component {

  

  render() {
    return (
      <div className="homepage-bg">
        <div className="join-button-div">
          <Button className='join-button'>
            <Link className='join-text' to="room">JOIN THE GAME <img id="join-btn-img" src="./styles/inkpen.png" alt="inkpen"/></Link>
          </Button>
          <div className="rules-button-div">
            <SimpleModalWrapped />
          </div>
          <div className="create-room-div">
            <Button className="create-room-button">
              Create Room
            </Button>
          </div>
          </div>
        <Leaderboard />

      </div>
    )
  }
}
