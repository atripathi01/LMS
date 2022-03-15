import React from "react";
import classes from "./navbar.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, Navigate } from "react-router-dom";
import { HOME_PATH, LOGIN_PATH } from "../../constants/pathContainer";

const Navbar = () => {
  const token = window.localStorage.getItem("token");
  console.log(token, "navbar");
  // useEffect(() => {
    
  // }, [])
  
  const logout = () => {
    localStorage.clear();
    Navigate(HOME_PATH);
  };

  return (
    <div>
      <nav className={classes.navbar}>
        <div className={classes.logoCont}>
          <ul className={classes.navLogo}>
            <li className={classes.logo}>
              <Link to={HOME_PATH} className={classes.RouterLink1}>
                Dono LMS
              </Link>
            </li>
          </ul>
        </div>
        <div className={classes.itemCon}>
          <ul className={classes.itemWrapper}>
            <li className={classes.items}>
              <Link to="/dashboard" className={classes.RouterLink}>
                Dashboard
                <KeyboardArrowDownIcon />
              </Link>
            </li>

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
            {/* <li className={classes.items}>
                <Link to={PROFILE}>
                  {" "}
                  <img
                    src={Avatar}
                    style={{ width: "40px", height: "auto" }}
                    alt="user"
                  />
                </Link>{" "}
              </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
