import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

export default class StartButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shown: true
    }
  }

  handleGameStart = () => {
    this.props.startRound();
    this.setState({
      shown: false
    })
    this.props.sendMessage({
      type: 'showStartButton',
      content: ''
    })
  }

  showStartButton = () => {
    if (this.state.shown) {
      return (
        <Button onClick={this.handleGameStart}>Start</Button>
      )
    } else {
      return null;
    }
  }

  render() {
    if (!this.props.showStartButton){
      return null
    } else {
    return (
      <div className='start-button'>
        {this.showStartButton()}
      </div>
    )
  }
  }
}
