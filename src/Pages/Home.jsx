import React, {Component} from 'react';

//For testing purposes only
const rooms = [
  {id: 1, name: "DrawingRoom", playerTotal: 5, type: "public"},
  {id: 2, name: "Cool Peeps", playerTotal: 6, type: "public"},
  {id: 3, name: "Sketchy", playerTotal: 3, type: "public"}
]

export default class Home extends Component {

  componentDidMount() {
    rooms.map(room => {
      return (
        <div>
        {room.name}, {room.playerTotal} players
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>This is the home page!</h1>
        <div>Div 1</div>
        <div>Div 2</div>
      </div>
    )
  }
}


