import React, {Component} from 'react';
import ProgressBar from 'progressbar.js';


export default class Timer extends Component {

  timer = new ProgressBar.Circle('#timer', {
    color: '#FCB03C',
    duration: 3000,
    easing: 'easeInOut'
  }

  render() {
    return (
        <div id="timer">
        </div>
    )
  }
}

