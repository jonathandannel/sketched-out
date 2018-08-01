import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import AuthService from "../AuthService.jsx";
import {  Button,
          TextField,
          Dialog,
          DialogActions,
          DialogContent,
          DialogContentText,
          DialogTitle } from '@material-ui/core'


export default class Register extends Component {
  constructor(){
    super();
    this.handleUser = this.handleUser.bind(this)
    this.handlePass = this.handlePass.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.Auth = new AuthService()
    this.state = {
      loggedIn: false,
      open: false,
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    if (this.state.loggedIn){
      return <Redirect to='/'/>
    }
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Register</Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Register</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Username"
                type="text"
                fullWidth
                value={this.state.username}
                onChange={this.handleUser}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                value={this.state.password}
                onChange={this.handlePass}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button         
                      onClick={this.handleFormSubmit} color="primary">
                Register
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    )
  }
  handleUser(e) {

    this.setState(
      {
        username: e.target.value
      }
    )
  }

  handlePass(e) {

    this.setState(
      {
        password: e.target.value
      }
    )
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.register(this.state.username, this.state.password)
      .then(res => {
        this.props.setUser(this.Auth.getProfile().username, () => {
          this.setState({loggedIn: true})
        })
      })
      .catch(err => {
        alert(err);
      })
  }
}
