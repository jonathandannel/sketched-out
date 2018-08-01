import React, {Component} from 'react';
import { Line, Circle } from 'rc-progress';



class TimeBar extends Component {

  //  constructor(props) {
  //   super(props);
  // }

  // line = new ProgressBar.Line('#progress', {
  //         color: '#79C7C5',
  //         duration: 30000,
  //     })

  containerStyle = {
            width: '800px',
            height: '300px'
        };

  startTimer = () => {
    if (this.props.shouldAnimate) {
      line.animate(1, {
        duration: 1000,
        easing: 'easeOut'
      }, function() {
          line.stop();
          line.set(0);
      });
    }
  }



  // componentDidMount() {
  //   if (this.props.shouldAnimate){
  //       // this.startTimer();
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //     if (this.props.shouldAnimate && this.props.shouldAnimate !== prevProps.shouldAnimate) {
  //       // this.startTimer();
      // } else {
      //   // this.timer.stop();
        // this.timer.set(0);
      // }
    // }

  render() {

    let percent = Math.floor(this.props.timeRemaining / 30 * 100)

    return (
        <div id="progress">
          <Line percent={percent} id="time-bar"  />
        </div>
    )
  }
};

export default TimeBar;

// Timer doesn't restart after the round ends ------------------------------------------------
//stop the timer when round ends?? or just restart it at new round