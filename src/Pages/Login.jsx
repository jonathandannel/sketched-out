import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
// import './Login.css';
import AuthService from "../AuthService.jsx";

class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
    this.state = {
      loggedIn: false
    }
  }

  componentWillMount() {
    console.log(this.props.history);
  }

  render() {
    if (this.state.loggedIn){
      return <Redirect to='/'/>
    }
    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <form onSubmit={this.handleFormSubmit}>
            <input
              className="form-item"
              name="username"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <input
              className="form-submit"
              value="SUBMIT"
              type="submit"
            />
          </form>
        </div>
      </div>
    );
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
        console.log('here?')
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

export default Login;
