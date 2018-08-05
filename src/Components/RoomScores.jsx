import React, {Component} from 'react';
import { Paper }from '@material-ui/core';

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
        <Paper><div>{player.username}: {player.points}</div></Paper>
      )
    })

    return (
      <div id="score-area">
        {players}
      </div>
    )
  }
}
