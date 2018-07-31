import React, {Component} from 'react';
import { Line, Circle } from 'rc-progress';



class Timer extends Component {

   constructor(props) {
    super(props);


  }


  componentDidMount() {
    if (this.props.shouldAnimate){
        // this.progress(3000, 3000, $('#progressBar'));
    }
  }

  componentDidUpdate(prevProps, prevState) {
      if (this.props.shouldAnimate && this.props.shouldAnimate !== prevProps.shouldAnimate) {

      // } else {
      //   // this.timer.stop();
        // this.timer.set(0);
      }
    }

  render() {
    return (
        <div>
          <Line percent="0" strokeWidth="4" strokeColor="#D3D3D3" />
        </div>
    )
  }
};

export default Timer;

// Timer doesn't restart after the round ends ------------------------------------------------
//stop the timer when round ends?? or just restart it at new round