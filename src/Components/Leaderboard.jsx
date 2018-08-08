import React, { Component } from "react";

const LeaderboardScoreRow = (props) => (
  <div className="card-leaderboard">
    <header className="username-leaderboard">
      <h2 className='username-header'>{props.username}</h2>
    </header>
    <div className='points-guesses-header'>
      <div>Total Points</div>
      <div>Correct Guesses</div>
    </div>
    <div className='points-guesses'>
      <div className="total-points-leaderboard">
        {props.totalPoints}
      </div>

      <div className="correct-guesses-points">
        {props.correctGuesses}
      </div>
    </div>
  </div>
)

const LeaderboardScores = props => (
  // <table className="home-leaderboard">
  //   <thead>
  //     <tr>
  //       <th>User</th>
  //       <th>Score</th>
  //       <th>Correct Guesses</th>
  //     </tr>
  //   </thead>
  //   <tbody>
       props.users.map( (user, i) => (
        <LeaderboardScoreRow 
          username={user.username} 
          totalPoints={user.totalPoints} 
          correctGuesses={user.correctGuesses}
          key={i}/>
        ))
  //   </tbody>
  // </table>
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
      <div className='leaderboard-title'>LEADERBOARD</div>
        <LeaderboardScores users={this.state.users}/>
      </div>
    )
  }
}
