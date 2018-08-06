import React, {Component} from 'react';
import { TextField, DialogContent } from '@material-ui/core';

export default class Chat extends Component {
  constructor(props) {
    super(props)
  }

  handleInput = (e) => {
    if (this.props.currentUser !== this.props.currentlyDrawing) {
      if (e.key === 'Enter' && e.target.value.length > 0) {
        this.props.sendMessage({
          type: 'chatMessages',
          content: {
            username: this.props.currentUser,
            text: e.target.value
          }
        })
        e.target.value = '';
      }
    }
  }

  render() {
    return (
        <TextField
          autoFocus
          className={'message-input'}
          margin="dense"
          placeholder='Guess!'
          onKeyDown={this.handleInput} />
    )
  }
}
