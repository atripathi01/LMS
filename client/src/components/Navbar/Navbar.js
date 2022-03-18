import React from "react";
import classes from "./navbar.module.css";
import { Link, Navigate } from "react-router-dom";
import { DASH_BOARD, HOME_PATH, LOGIN_PATH, PROFILE, } from "../../constants/pathContainer";
import {selectUser , logout} from '../../features/userSlice'
import {useDispatch, useSelector } from 'react-redux'
import { Avatar } from "../images/useravatar.png";
const Navbar = () => {
  const token = window.localStorage.getItem("token");
  console.log(token, "navbar");
  // useEffect(() => {

  // }, [])

  // const logout = () => {
  //   localStorage.clear();
  //   Navigate(HOME_PATH);
  // };
  const user=useSelector(selectUser);
  const dispatch=useDispatch();
  const handleLogout=(e)=>{
    e.prevemtDefault();
    dispatch(logout());

  }
  return (
    <div>
      <nav className={classes.navbar}>
        <div className={classes.logoCont}>
          <ul className={classes.navLogo}>
            <li className={classes.logo}>
              {window.localStorage.getItem("token") ? (
                <Link to={DASH_BOARD} className={classes.RouterLink1}>
                  Dono LMS
                </Link>
              ) : (
                <Link to={HOME_PATH} className={classes.RouterLink1}>
                  Dono LMS
                </Link>
              )}
              {/* <Link to={HOME_PATH} className={classes.RouterLink1}>
                Dono LMS
              </Link> */}
            </li>
          </ul>
        </div>
        <div className={classes.itemCon}>
          <ul className={classes.itemWrapper}>
            {/* <li className={classes.items}>
              <Link to="/dashboard" className={classes.RouterLink}>
                Dashboard
                <KeyboardArrowDownIcon />
              </Link>
            </li> */}
        {/* ------------------condition of userlogin or not------------ */}
            {/* {user?<button onClick={handleLogout()}>logout</button>:<button >login</button>} */}

            {localStorage.getItem("token") ? (
              <li className={classes.items}>
                <Link
                  to={HOME_PATH}
                  onClick={logout}
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

            {/* <li className={classes.items}>
                <Link to={REGISTER_PATH}>
                  <button className={classes.btnRegi}>Register</button>
                </Link>
              </li> */}
            {user?(
              <li className={classes.items}>
              <Link to={PROFILE}>
                {" "}
                <img
                  src={Avatar}
                  style={{ width: "40px", height: "auto" }}
                  alt="user"
                />
                <span>{user.name}</span>
              </Link>{" "}
            </li>
            ):("")}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
