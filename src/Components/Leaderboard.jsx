import React, {Component} from 'react';

const leaderboardScores = () => {
  users.map(user => {
    <tr>
      <td>user.username</td>
      <td>user.score</td>
    </tr>
  })
}

export default class Leaderboard extends Component {
  render() {
    return (
      <div>
        <table>
        <thead colspan="2">High Scores</thead>
          <th>User</th>
          <th>Score</th>
        <tbody>
          {leaderboardScores}
        </tbody>
      </table>
      </div>
    )
  }
}

