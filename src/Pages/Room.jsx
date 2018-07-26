import React, {Component} from 'react';
import {SketchField, Tools} from "react-sketch";

export default class Room extends Component {
  render() {
    return (
      <div>
        <h1>This is a room.</h1>
        <SketchField />
      </div>
    )
  }
}


