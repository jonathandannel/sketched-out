import React, { Component } from "react";

const arrayOfUsers = [
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
];
console.log(arrayOfUsers, "array of users");

arrayOfUsers.sort((a, b) => {
  return b.totalPoints - a.totalPoints;
});

console.log(arrayOfUsers, "after sort");

const LeaderboardScores = () => {
  const displayTopUsers = arrayOfUsers.map(user => (
    <tr>
      <td>{user.username}</td>
      <td>{user.totalPoints}</td>
    </tr>
  ));
  return <tbody>{displayTopUsers}</tbody>;
};
// console.log(leaderboardScores)
export default class Leaderboard extends Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>User</th>

              <th>Score</th>
            </tr>
          </thead>
          {/* <tbody> */}
          {/* {leaderboardScores} */}
          <LeaderboardScores />
          {/* </tbody> */}
        </table>
      </div>
    );
  }
}
