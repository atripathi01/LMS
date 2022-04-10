import React, { useState } from 'react';
import classes from './navbar.module.css';
import { Link } from 'react-router-dom';
import {
  ADMIN,
  DASH_BOARD,
  HOME_PATH,
  LOGIN_PATH,
  //   PROFILE,
} from '../../constants/pathContainer';
import { selectUser, logout } from '../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import ava from '../images/useravatar.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Drawer from '@mui/material/Drawer';

////////////////////////////////////////////////////////////////////////////////////////////
///               ------------------- NAVBAR PAGE----------------                        ///
////////////////////////////////////////////////////////////////////////////////////////////

const Navbar = () => {
  const dispatch = useDispatch();
  const [open, setOpen]=useState(false);
  // fetch user data from Redux
  const user = useSelector(selectUser);

  // Logout Function
  const handleLogout = (e) => {
    // e.preventDefault();
    dispatch(logout());
    // Navigate(HOME_PATH);
  };

  // set user data (name, role, roken) on windows.localstorage
  const userData = user
    ? {
        name: user.name,
        role: user.role,
        token: user.token,
      }
    : '';
  window.localStorage.setItem('user', userData);
  //   console.log(userData);

  return (
    <div>
      <nav className={classes.navbar}>
        <div className={classes.logoCont}>
          <ul className={classes.navLogo}>
            <li className={classes.logo}>
              {/* logo navigate condition */}
              {user.token ? (
                <Link to={DASH_BOARD} className={classes.RouterLink1}>
                  Dono LMS
                </Link>
              ) : (
                <Link to={HOME_PATH} className={classes.RouterLink1}>
                  Dono LMS
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className={classes.itemCon}>
          <ul className={classes.itemWrapper}>
            {/* login logout button condition */}
            {user.token ? (
              <li className={classes.items}>
                <Link
                  to={HOME_PATH}
                  onClick={(e) => handleLogout(e)}
                  className={classes.btnLogin}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <li className={classes.items}>
                <Link to={LOGIN_PATH} className={classes.btnLogin}>
                  Login
                </Link>
              </li>
            )}
             {user.token ? (
              <li className={classes.items}>
                  <Drawer>
                  <NotificationsIcon />
                      </Drawer>
                      <NotificationsIcon />
               
              </li>
            ) : (
              ''
            )}

            {/* user avatar and user name  */}
            {user.token ? (
              <li className={classes.items}>
                <div className={classes.profi}>
                  {' '}
                  <span className={classes.avat}>
                    {' '}
                    <Avatar src={ava} />
                  </span>
                  <span className={classes.userName}>
                    {user.token && user.role === 'Admin' ? (
                      <Link to={ADMIN} className={classes.adminProfile}>
                        {user.name}
                      </Link>
                    ) : (
                      user.name
                    )}
                  </span>
                </div>{' '}
              </li>
            ) : (
              ''
            )}
           
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
