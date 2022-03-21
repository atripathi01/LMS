import React from "react";
import classes from "./navbar.module.css";
import { Link, Navigate } from "react-router-dom";
import { DASH_BOARD, HOME_PATH, LOGIN_PATH, PROFILE, } from "../../constants/pathContainer";
import {selectUser , logout} from '../../features/userSlice'
import {useDispatch, useSelector } from 'react-redux'
// import { Avatar } from "../images/useravatar.png";
const Navbar = () => {
  
  // useEffect(() => {

  // }, [])

  // const logout = () => {
  //   localStorage.clear();
  //   Navigate(HOME_PATH);
  // };
  const dispatch=useDispatch();
  const user=useSelector(selectUser);
  const handleLogout=(e)=>{
    e.preventDefault();
    dispatch(logout());
    Navigate(LOGIN_PATH)

  }
  
  console.log(user);
 
  
     
   const userData=  user?( {
        name:user.name,
        role:user.role,
        token:user.token,
    }):("")
  console.log(userData);
  window.localStorage.setItem("user",userData);
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
        {/* {console.log(user.name)} */}
       { console.log(user)}
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

            {user.token? (
              <li className={classes.items}>
                <Link
                  to={HOME_PATH}
                  onClick={(e)=>handleLogout(e)}
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
                {/* <img
                  src={""}
                  style={{ width: "40px", height: "auto" }}
                  alt="user"
                /> */}
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
