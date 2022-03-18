import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageLogin from "../images/croped.jpg";
import { ADMIN, ADMIN_LOGIN, HOME_PATH, LOGIN_PATH } from "../../constants/pathContainer";
import classes from "./userlogin.module.css";
const AdminLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmitLogin=(e)=>{
        e.preventDefault();
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
      fetch("/admin/sign-in", {
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
            navigate(ADMIN);
          }
        })
        .catch((error) => {
          console.log("error login", error);
        });
    }
    }
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
                <label className={classes.LoginMail}>Admin Email*</label>
                <br></br>
                <input
                  type="email"
                  className={classes.LoginInput}
                  autoFocus
                  required
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value);
                  }}
                ></input>
                <br />
                <label className={classes.LoginPass}>Admin Password*</label>
                <br />
                <input
                  type="password"
                  className={classes.LoginPassInput}
                  autoFocus
                  required
                  placeholder="Admin Password"
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
                <p
                 style={{
                     marginTop:"1rem",
                     fontSize:'12px',
                     fontWeight:"500px",
                     color:"red"
                 }}
                
                >NOTE: this login page only for admin.</p>
              </form>

              <div className={classes.Divider}></div>
              If you are trainer or learn, then <Link to={LOGIN_PATH}>Login</Link>
            </div>
          </div>
          <div className={classes.loginLeftBox}>
            <img src={ImageLogin} alt="lms" className={classes.logimage}></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin