import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import MessageInput from './MessageInput.jsx';

export default class Chat extends Component {

  render() {
    return (
      <div id="chat-list-and-input">
        <div id="chat-messages">
          <MessageList
            chatMessages={this.props.chatMessages}
          />
        </div>
        <div id="message-input">
          <MessageInput
            currentUser={this.props.currentUser}
            sendMessage={this.props.sendMessage} />
        </div>
      </div>
    )
  }
}
