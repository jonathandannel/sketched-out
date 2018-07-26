import React, {Component} from 'react';
import {SketchField, Tools} from "react-sketch";
// import Chat from './Components/Chat.jsx';
import Button from '@material-ui/core/Button';


export default class Room extends Component {
  constructor(props) {
    super(props)
    this.sketchRef = React.createRef()
    this.renderMessages = this.renderMessages.bind(this)
  }

  renderMessages = () => {
    const messages = this.props.messages.map((message) => {
      return (
        <div>{message}</div>
      )
    })
    return messages;
  }

  render() {
    return (
      <div>
        <h1>This is a room.</h1>
        <h2>Messages:</h2>
        {this.renderMessages()}
        <button onClick={() => {this.props.sendMessage('hi')}}>click</button>
        <SketchField ref={this.sketchRef} />
      </div>
    )
  }
}
