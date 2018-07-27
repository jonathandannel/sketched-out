import React, {Component} from 'react';

export default class Login extends Component {

  render() {
    return (
      <div>
        <form action="/login" method="post">
          <div>
            <label for="username">Username: </label>
            <input type="text" id="username" name="user-name" />
          </div>
          <br />
          <div>
            <label for="password">Password: </label>
            <input type="text" id="password" name="password" />
          </div>
          <div className="button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    )
  }

}

