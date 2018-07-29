import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import MessageInput from './MessageInput.jsx';

export default class Chat extends Component {

  render() {
    return (
      <div>
        <MessageList chatMessages={this.props.chatMessages}/>
        <MessageInput sendMessage={this.props.sendMessage} />
      </div>
    )
  }
}
