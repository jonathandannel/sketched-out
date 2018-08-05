import React, {Component} from 'react';
import { Paper }from '@material-ui/core';

export default class MessageList extends Component {
  constructor(props) {
    super(props)
  }

  getMessages = () => {

    return this.props.chatMessages.map((message) => {

      if (this.props.currentClue === message.text) {
        return (
          <Paper>
            <div className='correct-guess single-message'>
              {message.username}: {message.text + `(+${this.props.guesserPoints}pts)`} <i class="fas fa-check"></i>
            </div>
          </Paper>
        )
      } else {
        return (
          <Paper>
            <div className='message single-message'>
              {message.username}: {message.text}
            </div>
          </Paper>
        )
      }

    })
  }

  render() {
    return (
      <div>
        {this.getMessages()}
      </div>
    )
  }
}
