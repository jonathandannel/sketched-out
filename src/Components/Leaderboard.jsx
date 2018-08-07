import React, { Component } from "react";

const LeaderboardScoreRow = (props) => (
  <tr>
    <td>{props.username}</td>
    <td>{props.totalPoints}</td>
    <td>{props.correctGuesses}</td>
  </tr>
)
const LeaderboardScores = props => (
  <table className="home-leaderboard">
    <thead>
      <tr>
        <th>User</th>
        <th>Score</th>
        <th>Correct Guesses</th>
      </tr>
    </thead>
    <tbody>
      { props.users.map( (user, i) => (
        <LeaderboardScoreRow 
          username={user.username} 
          totalPoints={user.totalPoints} 
          correctGuesses={user.correctGuesses}
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
      users: []
    }
  }
  componentDidMount() {
    fetch("http://localhost:8080/")
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw "Failed request"
      })
      .then( json => {
        this.setState({users: json})
      })
      .catch( error => {
        console.log(error)
      })
  }
  render() {
    return (
      <div className="leaderboard-div">
        <LeaderboardScores users={this.state.users}/>
      </div>
    )
  }
}
