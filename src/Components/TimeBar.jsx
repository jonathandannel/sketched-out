import React, {Component} from 'react';
import { Line, Circle }   from 'rc-progress';



class TimeBar extends Component {

  startTimer = () => {
      line.animate(1, {
        duration: 1000,
        easing: 'easeOut'
      }, function() {
      })
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
}

export default TimeBar;
