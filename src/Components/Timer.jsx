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
      trailWidth: 10,
      strokeWidth: 10
    })

    if (this.props.shouldAnimate){
      this.timer.animate(1);
      console.log(this.timer.value())
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.shouldAnimate !== prevProps.shouldAnimate && this.props.shouldAnimate) {
      this.timer.animate(1);
    } else {
      this.timer.stop();
      this.timer.set(0);
    }
  }

  render() {
    return (
      <svg width="50" height="50" ref={this.timerRef} id="timer">
      </svg>
    )
  }

}

