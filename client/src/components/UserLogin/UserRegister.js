import React, { useState } from "react";
import classes from "./userlogin.module.css";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import ImageLogin from "../images/croped.jpg";
import { LOGIN_PATH } from "../../constants/pathContainer";
import { Link } from "react-router-dom";

const UserRegister = (props) => {
  const roles = props.roles;
  const [activeRole, setActiveRole] = useState(Object.keys(roles)[0]);

  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSignup, setPasswordSignUp] = useState("");
  const [passwordSignupConf, setPasswordSignUpConf] = useState("");
  const [name, setName] = useState("");
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
  async function onSubmitSignup(event) {
    event.preventDefault();

    // condition for password and email checking
    let passwordCondition = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let emailCondition = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // basic validation
    if (name === "") {
      showSnackBar("Please enter your name", "error");
      return;
    } else if (email === "") {
      showSnackBar("Please enter your email", "error");
      return;
    } else if (passwordSignup === "") {
      showSnackBar("Please enter a new password", "error");
      return;
    } else if (passwordSignupConf === "") {
      showSnackBar("Please confirm your new password", "error");
      return;
    } else if (passwordSignup !== passwordSignupConf) {
      showSnackBar("Passwords do not match", "error");
      return;
    }


    // validating pasword and email using regexps
    else if (!passwordCondition.test(String(passwordSignup).trim())) {
      showSnackBar(
        "Password must contain atleast one capital letter, Special character and a numerical value",
        "error"
      );
      return;
    } else if (!emailCondition.test(String(email).trim())) {
      showSnackBar("Please enter a valid email address", "error");
      return;
    } else {
      const data = {
        email:{email},
        unm: {name},
        pss: {passwordSignupConf},
        role: { activeRole },
      };
      const res = await fetch(
        activeRole === "Teacher" ? "/newTrainer" : "/newStudent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        }
      )
        .then((response) => {
          console.log("Data sended......Done");
          res.json();
        })
        .catch((error) => {
          console.log("error ");
        });
      console.log("name", name);
      console.log("email", email);
      console.log("password", passwordSignup);
      console.log("conform", passwordSignupConf);
    }
  }
    const TeacherLoginStructure =(
      <form className={classes.LoginForm} method="POST">
        <label className={classes.UserName}>Name*</label>
        <br />
        <input
          placeholder="Enter your full name"
          type="text"
          required
          autoFocus
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <br />
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
            setEmail(e.target.value);
          }}
        ></input>
        <br />
        <label className={classes.LoginPass}>Password*</label>
        <br />
        <input
          type="password"
          className={classes.LoginPassInput}
          autoFocus
          required
          placeholder="User Password"
          value={passwordSignup}
          onChange={(e) => {
            setPasswordSignUp(e.target.value);
          }}
        ></input>
        <br />
        <label className={classes.LoginPass}>Comfirm Password*</label>
        <br />
        <input
          type="password"
          className={classes.LoginPassInput}
          autoFocus
          required
          placeholder="User Password"
          value={passwordSignupConf}
          onChange={(e) => {
            setPasswordSignUpConf(e.target.value);
          }}
        ></input>
        <br />
        <button
          className={classes.LoginBtn}
          type={"submit"}
          onClick={(event)=>onSubmitSignup(event)}
        >
          Teacher Register
        </button>
      </form>
    );

    const StudentLoginStructure  =(
      <form className={classes.LoginForm} method="POST">
        <label className={classes.UserName}>Name*</label>
        <br />
        <input
          type="text"
          className={classes.LoginPassInput}
          autoFocus
          required
          placeholder="User Password"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <br />
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
            setEmail(e.target.value);
          }}
        ></input>
        <br />
        <label className={classes.LoginPass}>Password*</label>
        <br />
        <input
          type="password"
          className={classes.LoginPassInput}
          autoFocus
          required
          placeholder="User Password"
          value={passwordSignup}
          onChange={(e) => {
            setPasswordSignUpConf(e.target.value);
          }}
        ></input>
        <br />
        <label className={classes.LoginPass}>Comfirm Password*</label>
        <br />
        <input
          type="password"
          className={classes.LoginPassInput}
          autoFocus
          required
          placeholder="User Password"
          value={passwordSignupConf}
          onChange={(e) => {
            setPasswordSignUpConf(e.target.value);
          }}
        ></input>
        <br />
        {/* <label className={classes.LoginPass}>Interest</label>
      <br />
      <input
        type="text"
        className={classes.LoginPassInput}
        autoFocus
        placeholder="User Password"
        value={}
      ></input>
      <br /> */}
        <button
          className={classes.LoginBtn}
          type={"submit"}
          onClick={ (event)=>onSubmitSignup(event)}
        >
          Student Register
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
                Already Registered? Then{" "}
                <Link to={LOGIN_PATH} className={classes.newUserSignUp}>
                  {" "}
                  Login
                </Link>
              </div>
            </div>
            <div className={classes.loginLeftBox}>
              <img
                src={ImageLogin}
                alt="lms"
                className={classes.logimage}
              ></img>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default UserRegister;
