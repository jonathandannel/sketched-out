import React, {Component} from 'react';
import {SketchField, Tools} from "react-sketch";
// import Chat from './Components/Chat.jsx';
import Button from '@material-ui/core/Button';


export default class Room extends Component {
  constructor(props) {
    super(props);
    this.socket = props.socket
  }

  sendMessage = (sock) => {
    const message = {
      type: 'text',
      content: 'hi!'
    }
    sock.send(message)
    console.log('sending', sock)
  }

  render() {
    return (
      <div>
        <h1>This is a room.</h1>
        <button onClick={() => {this.sendMessage(this.socket)}}>click</button>
        <SketchField />
      </div>
    )
  }
}
