import React, { Component } from "react";

const LeaderboardScoreRow = (props) => (
  <tr>
    <td>{props.username}</td>
    <td>{props.totalPoints}</td>
  </tr>
)
const LeaderboardScores = props => (
  <table>
    <thead>
      <tr>
        <th>User</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      { props.users.map( (user, i) => (
        <LeaderboardScoreRow 
          username={user.username} 
          totalPoints={user.totalPoints} 
          key={i}/>
        ))
      }
    </tbody>
  </table>
);


// console.log(leaderboardScores)
export default class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [
        {
          username: "farid",
          totalPoints: 12
        },
        {
          username: "anar",
          totalPoints: 16
        },
        {
          username: "idana",
          totalPoints: 22
        },
        {
          username: "mom",
          totalPoints: 9
        }
      ]
    }
  }

  render() {
    return <LeaderboardScores users={this.state.users}/>
  }
}
