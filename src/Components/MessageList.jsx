import React, {Component} from 'react';
import { Paper }from '@material-ui/core';

export default class MessageList extends Component {
  constructor(props) {
    super(props)
  }

  getMessages = () => {
    return this.props.chatMessages.map((message) => {
      return (
        <div id="single-message">
          <Paper>{message}</Paper>
        </div>
      )
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
