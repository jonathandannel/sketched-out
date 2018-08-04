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
    return <LeaderboardScores users={this.state.users}/>
  }
}
