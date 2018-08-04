import React, {Component} from 'react';
import {CirclePicker}     from 'react-color';

export default class Brushes extends Component {

circleSize = 28;
circleSpacing = 2;
colors = ["#f44336", "#fc9ca9", "#9c27b0", "#3f51b5", "#2196f3", "#4caf50", "#fffc72", "#ffc107", "#795548", "#607d8b", "#000000",]

  constructor(props) {
    super(props);
    this.lineColor = this.props.lineColor;
  }

  render() {
    return (
        <div>
          <CirclePicker
            id="circle-picker"
            class="waves-effect waves-button" 
            width="min-content"
            circleSize={this.circleSize}
            colors={this.colors}
            onChange={(color) => {this.props.onChange(color)}}
          />
        </div>
    )
  }
}

