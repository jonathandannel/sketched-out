import React, {Component} from 'react';
import {CirclePicker}     from 'react-color';

export default class Brushes extends Component {

  constructor(props) {
    super(props);
    this.lineColor = this.props.lineColor;
  }

  render() {
    return (
        <div>
          Brushes go here
          <CirclePicker
            onChange={(color) => {this.props.onChange(color)}}
          />
        </div>
    )
  }
}

