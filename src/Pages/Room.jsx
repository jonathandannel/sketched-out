import React, {Component} from 'react';
import {SketchField, Tools} from "react-sketch";
// import Chat from './Components/Chat.jsx';
import Button from '@material-ui/core/Button';


export default class Room extends Component {



  render() {
    return (
      <div>
        <h1>This is a room.</h1>
        <button onClick={() => {this.props.sendMessage('hi')}}>click</button>
        <SketchField />
      </div>
    )
  }
}
