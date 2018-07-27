import React, {Component} from 'react';

import AuthService from "../AuthService.jsx";

export default class Register extends Component {
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.Auth = new AuthService()
  }

  componentWillMount(){
    if (this.Auth.loggedIn()){
     this.props.history.replace('/') 
    }
  }
  
  render() {
    return (
      <div>
        <form action="/register" method="post" onSubmit={this.handleFormSubmit}>
          <div>
            <label for="username">Username: </label>
            <input 
            className="username"
            name="username"
            type="text"
            />
            <label for="password">Password: </label>
            <input 
            className="password" 
            name="password"
            type="password" 
            />
            <button 
            className="submit"
            type="submit" 
            value="SUBMIT" 
            >Register</button>
          </div>
        </form>
      </div>
    )
  }
  handleChange(e) {

    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace('/');
      })
      .catch(err => {
        alert(err);
      })
  }
}

