import React, {Component} from 'react';
import MainCanvas from '../Components/MainCanvas.jsx';

export default class Room extends Component {
  constructor(props) {
    super(props)
    this.sketchRef = React.createRef()
  }

  render() {
    return (
      <div>
        <h1>This is a room.</h1>
        <div id="canvas-container">
          <MainCanvas
            sendMessage={this.props.sendMessage}
            userLines={this.props.messages}/>
        </div>
      </div>
    )
  }
}
