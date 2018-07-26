import React, {Component} from 'react';

export default class Chat extends Component {
  render() {
    return (
        <div>
          <table>
          <thead colspan="2">Take a guess!</thead>
            <th></th>
            <th></th>
          <tbody>
            // {chatMessages}
          </tbody>
          </table>
        </div>
    )
  }
}

export Chat;
