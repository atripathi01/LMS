import React, { useState } from "react";
import classes from "./userlogin.module.css";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import ImageLogin from "../images/croped.jpg";
import { HOME_PATH, REGISTER_PATH } from "../../constants/pathContainer";
import { Link} from "react-router-dom";
import ErrorAlert from "../Nested/ErrorAlter";
import {useNavigate} from "react-router-dom";



const UserLogin = (props) => {
  // const history = useHistory();
  const roles = props.roles;
  const navigate=useNavigate();
  const [activeRole, setActiveRole] = useState(Object.keys(roles)[0]);

  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: null, type: null });

  const AutoHideSnackbar = () => {
    setAlert({
      show: false,
    });
  };
  const showSnackBar = (msg, type) => {
    setAlert({
      show: true,
      msg: msg,
      type: type,
    });
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    // this const is a condition where accept everything except whitespaces
    const emailOrUsernameCondition = /^[a-zA-Z0-9!-£]*$/;
    if (email === "") {
      showSnackBar("please enter your email", "error");
      return;
    } else if (password === "") {
      showSnackBar("please enter your password", "error");
      return;
    } else if (!emailOrUsernameCondition.test(String(email).trim())) {
      showSnackBar("Invalid email", "error");
      return;
    } else {
      console.log("done");
      const data = {
        email:email ,
        password:password,
        role:activeRole === "Teacher" ? "trainer" : "student",
      };
      console.log(data);
     await fetch(
        activeRole === "Teacher" ? "/loginTrainer" : "/loginStudent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
      
        .then((response) => {
          console.log("login successful......great");
          console.log("send",data);
          if (response.status === 400 || !data) {
            window.alert("failed");
          } else {
            window.alert("logined");
            showSnackBar("Logged in","success")
            navigate(HOME_PATH);
          }
          return response.json();

        })
        .catch((error) => {
          console.log("error login");
        });
    

      //////token verification and post the data in backend left
    }
  };

  const TeacherLoginStructure = (
    ////error alter function left to right ..../////
    <form className={classes.LoginForm}>
      <label className={classes.LoginMail}>User Email*</label>
      <br></br>
      <input
        type="email"
        className={classes.LoginInput}
        autoFocus
        required
        placeholder="Teacher User Email"
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
          ////showPassword Condition
        }}
        ///show password icon function
      ></input>
      <br />
      <button className={classes.LoginBtn} onClick={(e)=>{
        onSubmitLogin(e)
      }}>Teacher Login</button>
    </form>
  );

  const StudentLoginStructure = (
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
        Student Login
      </button>
    </form>
  );

  const generateLoginStructure = () => {
    switch (roles[activeRole]) {
      case roles.Teacher:
        return TeacherLoginStructure;
      case roles.Student:
        return StudentLoginStructure;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        {/* <ErrorAlert
         AutoHideSnackbar={AutoHideSnackbar}
         showSnackBar={showSnackBar}
         message={alert.msg}
         type={alert.type}       
        /> */}
      </div>
      <div className={classes.loginPage}>
        <div className={classes.loginBox}>
          <div className={classes.loginRightBox}>
            <div className={classes.role}>
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
            </div>

            <div className={classes.loginSection}>
              {generateLoginStructure()}

              <div className={classes.Divider}></div>
            </div>
            <div className={classes.SocailLogin}>
              <ul className={classes.SocailLoginWrapper}>
                <li>
                  <GoogleIcon />
                </li>
                <li>
                  <FacebookIcon />
                </li>
              </ul>
            </div>
            <div className={classes.newUser}>
              New User?{" "}
              <Link to={REGISTER_PATH} className={classes.newUserSignUp}>
                {" "}
                Sign Up
              </Link>
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
