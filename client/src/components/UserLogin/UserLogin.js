import React, { useState } from "react";
import classes from "./userlogin.module.css";
// import GoogleIcon from "@mui/icons-material/Google";
// import FacebookIcon from "@mui/icons-material/Facebook";
import ImageLogin from "../images/croped.jpg";
import { ADMIN_LOGIN, DASH_BOARD, HOME_PATH } from "../../constants/pathContainer";
// import { Link } from "react-router-dom";
// import ErrorAlert from "../Nested/ErrorAlter";
import { Link, useNavigate } from "react-router-dom";
import {login} from '../../features/userSlice'
import {useDispatch} from 'react-redux'

const UserLogin = (props) => {
  // const history = useHistory();

  // const roles = props.roles;
  const navigate = useNavigate();
  const dispatch=useDispatch();

  //-------------->Intialize the state----------------

  // const [activeRole, setActiveRole] = useState(Object.keys(roles)[1]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [alert, setAlert] = useState({ show: false, msg: null, type: null });
  // const [token, setToken] = useState("");
  // const AutoHideSnackbar = () => {
  //   setAlert({
  //     show: false,
  //   });
  // };

  //-------------->Custom error alter--------------------
  // const showSnackBar = (msg, type) => {
  //   setAlert({
  //     show: true,
  //     msg: msg,
  //     type: type,
  //   });
  // };

  // ----------------> Submit function when user click on Login button-------------------

  const onSubmitLogin = (e) => {
    e.preventDefault();
    // this const is a condition where accept everything except whitespaces
    const emailOrUsernameCondition = /^[a-zA-Z0-9!-£]*$/;
    if (email === "") {
      // showSnackBar("please enter your email", "error");
      window.alert("please enter your email");
      return;
    } else if (password === "") {
      // showSnackBar("please enter your password", "error");
      window.alert("please enter your password");
      return;
    } else if (!emailOrUsernameCondition.test(String(email).trim())) {
      // showSnackBar("Invalid email", "error");
      window.alert("Invalid email");
      return;
    } else {
      console.log("done");
      const data = {
        email: email,
        password: password,
        // role: activeRole === "Teacher" ? "trainer" : "student",
      };
      console.log(data);
      //------------->fecth api of backend for login----------------
      fetch("/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          const res = await response.json();
          console.log("login successful......great");
          console.log("send", data);
          // setToken(res.token);
          console.log(res.token);
          console.log(res.role);
          window.localStorage.setItem("token", res.token);
          window.localStorage.setItem("role", res.role);
          if (response.status !== 200 || !data) {
            window.alert("failed");
          } else {
            // window.alert("logined");
            // showSnackBar("Logged in", "success");
            dispatch(login({
              // data
              name:res.name,
              email:email,
              password:password,
              role:res.role,
              isLogin:true,
            }))
            navigate(DASH_BOARD);
          }
        })
        .catch((error) => {
          console.log("error login", error);
        });
    }
  };

  // // ----------------Teacher login Structur or UI of login page--------------

  // const TeacherLoginStructure = (
  //   <form className={classes.LoginForm}>
  //     <label className={classes.LoginMail}>User Email*</label>
  //     <br></br>
  //     <input
  //       type="email"
  //       className={classes.LoginInput}
  //       autoFocus
  //       required
  //       placeholder="Teacher User Email"
  //       value={email}
  //       onChange={(e) => {
  //         e.preventDefault();
  //         setEmail(e.target.value);
  //       }}
  //     ></input>
  //     <br />
  //     <label className={classes.LoginPass}>User Password*</label>
  //     <br />
  //     <input
  //       type="password"
  //       className={classes.LoginPassInput}
  //       autoFocus
  //       required
  //       placeholder="User Password"
  //       value={password}
  //       onChange={(e) => {
  //         e.preventDefault();
  //         setPassword(e.target.value);
  //       }}
  //     ></input>
  //     <br />
  //     <button
  //       className={classes.LoginBtn}
  //       onClick={(e) => {
  //         onSubmitLogin(e);
  //       }}
  //     >
  //       Teacher Login
  //     </button>
  //   </form>
  // );

  // // ----------------Student login Structur or UI of login page--------------

  // const StudentLoginStructure = (
  //   <form className={classes.LoginForm}>
  //     <label className={classes.LoginMail}>User Email*</label>
  //     <br></br>
  //     <input
  //       type="email"
  //       className={classes.LoginInput}
  //       autoFocus
  //       required
  //       placeholder="Student User Email"
  //       value={email}
  //       onChange={(e) => {
  //         e.preventDefault();
  //         setEmail(e.target.value);
  //       }}
  //     ></input>
  //     <br />
  //     <label className={classes.LoginPass}>User Password*</label>
  //     <br />
  //     <input
  //       type="password"
  //       className={classes.LoginPassInput}
  //       autoFocus
  //       required
  //       placeholder="User Password"
  //       value={password}
  //       onChange={(e) => {
  //         e.preventDefault();
  //         setPassword(e.target.value);
  //       }}
  //     ></input>
  //     <br />
  //     <button
  //       className={classes.LoginBtn}
  //       type={"submit"}
  //       onClick={(e) => onSubmitLogin(e)}
  //     >
  //       Student Login
  //     </button>
  //   </form>
  // );

  // // ------------------generate switch case for user is teacher or student-------------------

  // const generateLoginStructure = () => {
  //   switch (roles[activeRole]) {
  //     case roles.Teacher:
  //       return TeacherLoginStructure;
  //     case roles.Student:
  //       return StudentLoginStructure;
  //     default:
  //       return null;
  //   }
  // };
  // const loginForm = () => {
  //   <form className={classes.LoginForm}>
  //     <label className={classes.LoginMail}>User Email*</label>
  //     <br></br>
  //     <input
  //       type="email"
  //       className={classes.LoginInput}
  //       autoFocus
  //       required
  //       placeholder="Student User Email"
  //       value={email}
  //       onChange={(e) => {
  //         e.preventDefault();
  //         setEmail(e.target.value);
  //       }}
  //     ></input>
  //     <br />
  //     <label className={classes.LoginPass}>User Password*</label>
  //     <br />
  //     <input
  //       type="password"
  //       className={classes.LoginPassInput}
  //       autoFocus
  //       required
  //       placeholder="User Password"
  //       value={password}
  //       onChange={(e) => {
  //         e.preventDefault();
  //         setPassword(e.target.value);
  //       }}
  //     ></input>

  //     <br />
  //     <label className={classes.LoginPass}>Role*</label>
  //     <br />
  //     <button
  //       className={classes.LoginBtn}
  //       type={"submit"}
  //       onClick={(e) => onSubmitLogin(e)}
  //     >
  //       Student Login
  //     </button>
  //   </form>;
  // };

  return (
    <div>
      <div></div>
      <div className={classes.loginPage}>
        <div className={classes.loginBox}>
          <div className={classes.loginRightBox}>
            {/* <div className={classes.role}>
              {Object.keys(roles)?.map((key) => (
                <div
                  className={`${classes.LoginRole} ${
                    activeRole === key ? classes.active : ""
                  } `}
                  key={key}
                  onClick={() => setActiveRole(key)}
                >
                  {roles[key]}
                </div>
              ))}
            </div> */}

            <div className={classes.loginSection}>
              {/* {generateLoginStructure()}  */}
              <div>DONO LMS</div>
              <form className={classes.LoginForm}>
                <label className={classes.LoginMail}>User Email*</label>
                <br></br>
                <input
                  type="email"
                  className={classes.LoginInput}
                  autoFocus
                  required
                  placeholder="Student User Email"
                  value={email}
                  onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value);
                  }}
                ></input>
                <br />
                <label className={classes.LoginPass}>User Password*</label>
                <br />
                <input
                  type="password"
                  className={classes.LoginPassInput}
                  autoFocus
                  required
                  placeholder="User Password"
                  value={password}
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                ></input>

                <br />

                <button
                  className={classes.LoginBtn}
                  type={"submit"}
                  onClick={(e) => onSubmitLogin(e)}
                >
                  Login
                </button>
              </form>

              <div className={classes.Divider}></div>
              If you are admin then login from here!<Link to={ADMIN_LOGIN}>Admin Login</Link>
            </div>
          </div>
          <div className={classes.loginLeftBox}>
            <img src={ImageLogin} alt="lms" className={classes.logimage}></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserLogin;
