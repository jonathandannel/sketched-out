import React, {Component} from 'react';
import ProgressBar from 'progressbar.js';


// export default class Timer extends Component {

//   constructor(props) {
//     super(props);
//     this.timerRef = React.createRef();
//   }

//   componentDidMount() {
//     this.timer = new ProgressBar.Circle(this.timerRef.current, {
//       color: '#79C7C5',
//       duration: 30000,
//       trailWidth: 10,
//       strokeWidth: 10
//     })

//     if (this.props.shouldAnimate){
//       this.timer.animate(1);
//       console.log(this.timer.value())
//     }

//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.shouldAnimate !== prevProps.shouldAnimate && this.props.shouldAnimate) {
//       this.timer.animate(1);
//     } else {
//       this.timer.stop();
//       this.timer.set(0);
//     }
//   }

//   render() {
//     return (
//       <svg width="50" height="50" ref={this.timerRef} id="timer">
//       </svg>
//     )
//   }

// }

class Timer extends Component {

   constructor(props) {
    super(props);
    this.timerRef = React.createRef();
  }

 progress(timeleft, timetotal, $element) {
    let progressBarWidth = timeleft * $element.width() / timetotal;
    $element.find('div').animate({ width: progressBarWidth }, 30000).html(Math.floor(timeleft/60));
    if (timeleft > 0) {
        setTimeout(function() {
            progress(timeleft - 1, timetotal, $element);
        }, 1000);
    }
  }

  componentDidMount() {
    if (this.props.shouldAnimate){
        this.progress(3000, 3000, $('#progressBar'));
    }
  }

  componentDidUpdate(prevProps, prevState) {
      if (this.props.shouldAnimate && this.props.shouldAnimate !== prevProps.shouldAnimate) {
        this.progress(3000, 3000, $('#progressBar'));
      // } else {
      //   // this.timer.stop();
        // this.timer.set(0);
      }
    }

  render() {
    return (
      <div id="progressBar">
        <div id='timer' class="bar"></div>
      </div>
    )
  }
};

export default Timer;

// Timer doesn't restart after the round ends ------------------------------------------------
//stop the timer when round ends?? or just restart it at new round