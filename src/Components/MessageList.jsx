import React, {Component} from 'react';
import { Paper }from '@material-ui/core';

export default class MessageList extends Component {
  constructor(props) {
    super(props)
  }

  getMessages = () => {

    let latestMessages = this.props.chatMessages.slice(-6);
    let checkStyle = {'padding-left': '3px'}

    return latestMessages.map((message) => {
      if (this.props.currentClue === message.text || message.username === 'Sketchbot') {
        return (
          <Paper>
            <div className='correct-guess single-message'>
              {message.username}: {message.text} <i class="fas fa-check" style={checkStyle}></i>
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
