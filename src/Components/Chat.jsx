import React, {Component} from 'react';

export default class Chat extends Component {

  render() {
    return (
        <div>
          <table>
          <thead colSpan="2"></thead>
          <tbody>
            <tr>
              <td>There are chat messages here!</td>
            </tr>
            <tr>
              <td>There are chat messages here!</td>
            </tr>
          </tbody>
          </table>
              <input type="text"
                id="chat-input"
                name="chat-input-bar"
                placeholder="Take a guess!"
              />

        </div>
    )
  }
}

