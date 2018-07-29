import React, {Component} from 'react';

export default class MessageList extends Component {
  constructor(props) {
    super(props)
  }

  getMessages = () => {
    return this.props.chatMessages.map((message) => {
      return (
        <div> {message} </div>
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
