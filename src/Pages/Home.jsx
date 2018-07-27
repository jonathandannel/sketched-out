import React, {Component} from 'react';
import SimpleModalWrapped from '../Components/NewRoomModal.jsx';

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
    return (
      <div>
        <h1>This is the home page!</h1>
        <div>Div 1</div>
        <div>Div 2</div>
        <span className="room-thumbnail-container">
          <h3>Active Games</h3>
          {this.displayRooms()}
        </span>
        <div>
        </div>
        <SimpleModalWrapped />
      </div>
    )
  }
}


