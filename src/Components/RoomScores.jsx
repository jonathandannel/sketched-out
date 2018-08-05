import React, {Component} from 'react';

export default class RoomScores extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props.players)
  }


  render() {
    const players = this.props.players.map((player) => {
      return (
        <div>{player.username} - {player.points}</div>
      )
    })

    return (
      <div>
        {players}
      </div>
    )
  }
}
