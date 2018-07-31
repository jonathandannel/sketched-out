import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import AuthService from "../AuthService.jsx";

export default class Register extends Component {
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.Auth = new AuthService()
    this.state = {
      loggedIn: false
    }
  }

  render() {
    if (this.state.loggedIn){
      return <Redirect to='/'/>
    }
    return (
      <div>
        <form action="/register" method="post" onSubmit={this.handleFormSubmit}>
          <div>
            <label for="username">Username: </label>
            <input 
            className="username"
            name="username"
            type="text"
            onChange={this.handleChange}
            />
            <label for="password">Password: </label>
            <input 
            className="password" 
            name="password"
            type="password" 
            onChange={this.handleChange}
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

    this.Auth.register(this.state.username, this.state.password)
      .then(res => {
        this.props.setUser(this.Auth.getProfile().username)
        this.setState({
          loggedIn: true
        })
      })
      .catch(err => {
        alert(err);
      })
  }
}

