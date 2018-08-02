import React, {Component} from 'react';
import { Line, Circle }   from 'rc-progress';



class TimeBar extends Component {


  startTimer = () => {
    if (this.props.shouldAnimate) {
      line.animate(1, {
        duration: 1000,
        easing: 'easeOut'
      }, function() {
      });
    } else {
      line.stop();
      line.set(0);
    }
  }

  render() {

    let percent = Math.floor(this.props.timeRemaining / 30 * 100)
    console.log("percent", percent)

    return (
        <div id="progress">
          <Line percent={percent} id="time-bar"  />
        </div>
    )
  }
};

export default TimeBar;
