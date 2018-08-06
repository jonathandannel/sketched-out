import React, {Component} from 'react';
import { Paper }from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class RoomScores extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props.players)
  }

  render() {

    const sorted = this.props.players.slice().sort((a, b) => {
      return b.points - a.points
    })

    const players = sorted.map((player) => {
      return (
          <div id='score-item'>
            <div>{player.username}</div>
            <div>{player.points}</div>
          </div>
      )
    })

    return (
      <div id="score-area">
        <div id='score-title'>
          LEADERBOARD
        </div>
          {players}
      </div>
    )
  }
}
