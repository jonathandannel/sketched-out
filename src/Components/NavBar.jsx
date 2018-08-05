import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {  Button,
          AppBar,
          Toolbar
        }
  from '@material-ui/core';
import AuthService from "../AuthService.jsx";
import Register from "../Pages/Register.jsx"
import Login from "../Pages/Login.jsx"



export default class NavBar extends Component {
  constructor() {
    super()
    this.Auth = new AuthService();
  }

  render() {
    let buttons
    let user
    if (this.Auth.loggedIn()){
      user = 
        <div className='userName'>Hi, {this.Auth.getProfile().username}!</div>
      buttons =
      <div className='authButtons'>
        <Button className="nav-button"
        onClick={()=>{this.Auth.logout()}}
        component={Link} to='/'>Logout</Button>
      </div>;

    } else {
      buttons =
      <div className='authButtons'>
        <Login setUser={this.props.setUser}/>
        <Register setUser={this.props.setUser}/>
      </div>
    }
    return (
      <AppBar>
        <Toolbar className='navbar'>
          <div>
            <Link to='/' className='homeLink'>
              <h1 className='title'>SKETCHED OUT</h1>
            </Link>
          </div>
          {user} 
          {buttons}
        </Toolbar>

      </AppBar>
    )
  }
}


