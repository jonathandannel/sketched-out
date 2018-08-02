import React, {Component} from 'react';
import SimpleModalWrapped from '../Components/NewRoomModal.jsx';
import Button    from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Leaderboard from '../Components/Leaderboard.jsx'



//For testing purposes only
const rooms = [
  {id: 1, name: "DrawingRoom", playerTotal: 5, type: "public"},
  {id: 2, name: "Cool Peeps", playerTotal: 6, type: "public"},
  {id: 3, name: "Sketchy", playerTotal: 3, type: "public"}
]

export default class Home extends Component {

  displayRooms = () => {
    const roomDivs = rooms.map(room => {
      return (
        <div className="room-thumbnail">
          <b>{room.name}</b>
        <br />
          {room.playerTotal} players
        </div>
      )
    })
    return roomDivs;
  }

  render() {
    return <div>
        <h1>This is the home page!</h1>
        <Button>
          <Link to="room">Room</Link>
        </Button>
        <h3>Active Games</h3>
        <span className="room-thumbnail-container">
          {this.displayRooms()}
        </span>
        <SimpleModalWrapped />
        <Leaderboard />
      </div>;
  }
}


