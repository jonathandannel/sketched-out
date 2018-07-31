import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {  Button,
          AppBar,
          Toolbar
        }
  from '@material-ui/core';
import AuthService from "../AuthService.jsx";
import Register from "../Pages/Register.jsx"



export default class NavBar extends Component {
  constructor() {
    super()
    this.Auth = new AuthService();
    this.state = {
      currentUser : ''
    }
  }


  render() {
    let buttons
    if (this.props.currentUser){  
      buttons = 
      <div className='authButtons'>
        <Button onClick={()=>{
          this.props.clearUser()
          this.Auth.logout()
        }} 
                component={Link} to='/'>Logout</Button>
      </div>
    } else {
      buttons = 
      <div className='authButtons'>
        <Button component={Link} to='/login'>Login</Button>
        <Button component={Link} to='/register'>Register</Button>
      </div>
    }
    return (
      <AppBar>
        <Toolbar className='navbar'>
          <div>
          
              <Link component={Link} to='/' className='homeLink'>
                <h1 className='title'>SKETCHED OUT</h1>
              </Link> 
          </div>  
           {buttons}
        </Toolbar>

      </AppBar>
    )
  }
}


