import React, {Component} from 'react';

export default class Register extends Component {
  render() {
    return (
      <div>
        <form action="/register" method="post">
          <div>
            <label for="username">Username: </label>
            <input type="text" id="username" name="user-name" />
          </div>
          <br />
          <div>
            <label for="password">Password: </label>
            <input type="text" id="password" name="password" />
          </div>
          <div class="button">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    )
  }
}

