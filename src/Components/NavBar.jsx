import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {  Button,
          AppBar,
          Toolbar
        }
  from '@material-ui/core';


export default class NavBar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar className='navbar'>
          <div>
          
              <Link component={Link} to='/' className='homeLink'>
                <h1 className='title'>SKETCHED OUT</h1>
              </Link> 
          </div>
          <div className='authButtons'>
            <Button component={Link} to='/login'>Login</Button>
            <Button component={Link} to='/register'>Register</Button>
          </div>
        </Toolbar>

      </AppBar>
    )
  }
}


