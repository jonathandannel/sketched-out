import React, {Component} from 'react';
import Button             from '@material-ui/core/Button';
import { Link }           from 'react-router-dom';
import TextField from '@material-ui/core/TextField';


class CreateRoomForm extends Component {

  constructor(props) {
    super(props);

    this.form = React.createRef();  
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    this.props.sendMessage({
      type: 'roomCreate',
      content: {
        roomName: '',
        roomCreator: this.props.currentUser,
        maxPlayers: 0,
        passwordProtected: true,
        password: ''
      }
    })

  }

  render() {
    return (
      <form
        className="createRoomForm" 
        ref={this.form}
        onSubmit={this.handleFormSubmit}
      >

        <TextField>asdasdsad</TextField >

      </form>
    )
  }

}

export default CreateRoomForm;