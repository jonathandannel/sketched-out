import React, {Component} from 'react';

export default class Chat extends Component {
  constructor(props) {
    super(props)
  }

  handleInput = (e) => {
    if (e.key === 'Enter' && e.target.value.length > 0) {
      this.props.sendMessage({
        type: 'chatMessages',
        content: e.target.value
      });
      e.target.value = '';
    }
  }

  render() {
    return (
        <input
          placeholder="guess"
          onKeyDown={this.handleInput}
        />
    )
  }
}
