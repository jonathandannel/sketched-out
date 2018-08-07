import React, {Component} from 'react';
import SimpleModalWrapped from '../Components/NewRoomModal.jsx';
import Button    from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Leaderboard from '../Components/Leaderboard.jsx'


export default class Home extends Component {


  render() {
    return <div className="homepage-bg">
        
        <Leaderboard />
        <Button>
          <Link to="room">JOIN THE GAME</Link>
        </Button>
        
      </div>;
  }
}


