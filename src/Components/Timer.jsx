import React, {Component} from 'react';
import ProgressBar from 'progressbar.js';



export default class Timer extends Component {

  constructor(props) {
    super(props);
    this.timerRef = React.createRef();
  }

  componentDidMount() {
    this.timer = new ProgressBar.Circle(this.timerRef.current, {
      color: 'purple',
      duration: 30000,
      // easing: 'easeOut'
    })

    setTimeout(() => {
      this.timer.animate(1);
    }, 1000);

  }

  render() {
    return (
      <svg width="100" height="100" ref={this.timerRef} id="timer">
      </svg>
    )
  }
}

