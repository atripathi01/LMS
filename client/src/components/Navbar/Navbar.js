import React, { Component } from 'react'
import classes from './navbar.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
export default class Navbar extends Component {
  render() {
    return (
      <div>
          <nav className={classes.navbar}>
           <div className={classes.logoCont}>
              <ul className={classes.navLogo}>
                  <li className={classes.logo}>
                    <Link to="/">LMS</Link>
                    </li>
              </ul>
           </div>
           <div className={classes.itemCon}>
              <ul className={classes.itemWrapper}>
                  <li className={classes.items}>
                    <Link to="/dashboard">
                    Dashboard<KeyboardArrowDownIcon />
                    </Link>
                    </li>
                  <li className={classes.items}>
                    <Link to="/login">
                    <button className={classes.btnLogin}>Login</button>
                    </Link>
                    </li>
              </ul>
           </div>
         
          </nav>
      </div>
    )
  }
}
