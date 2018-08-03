import React, {Component} from 'react';
import { Line, Circle }   from 'rc-progress';



class TimeBar extends Component {




  render() {

    let percent = Math.floor(this.props.timeRemaining / 30 * 100)


    return (
        <div id="progress">
          <Line percent={percent} id="time-bar"  />
        </div>
    )
  }
}

export default TimeBar;

