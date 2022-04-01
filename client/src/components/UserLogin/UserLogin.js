import React, { useState } from 'react';
import classes from './userlogin.module.css';
import ImageLogin from '../images/croped.jpg';
import { ADMIN_LOGIN, DASH_BOARD } from '../../constants/pathContainer';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { SIGN_IN } from '../../constants/ApiPathContainer';

////////////////////////////////////////////////////////////////////////
////            Learner and Trainer Login Page                       ///
////////////////////////////////////////////////////////////////////////

const UserLogin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // fetch user detail
  const user = useSelector(selectUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // onSubmit function of Login button
  const onSubmitLogin = (e) => {
    e.preventDefault();
    // this const is a condition where accept everything except whitespaces
    const emailOrUsernameCondition = /^[a-zA-Z0-9!-£]*$/;
    if (email === '') {
      window.alert('please enter your email');
      return;
    } else if (password === '') {
      window.alert('please enter your password');
      return;
    } else if (!emailOrUsernameCondition.test(String(email).trim())) {
      window.alert('Invalid email');
      return;
    } else {
      const data = {
        email: email,
        password: password,
      };
      //-----POST api for login
      fetch(SIGN_IN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          const res = await response.json();
          if (response.status !== 200 || !data) {
            window.alert('failed');
          } else {
            // set user data on windows localstorage
            window.localStorage.setItem('name', res.name);
            window.localStorage.setItem('email', email);
            window.localStorage.setItem('role', res.role);
            window.localStorage.setItem('token', res.token);

            dispatch(
              login({
                // data
                name: res.name,
                email: email,
                role: localStorage.getItem('role'),
                token: localStorage.getItem('token'),
              })
            );

            navigate(DASH_BOARD);
          }
        })
        .catch((error) => {
          console.log('error login', error);
        });
    }
  };

  return (
    <div>
      <div></div>
      <div className={classes.loginPage}>
        <div className={classes.loginBox}>
          <div className={classes.loginRightBox}>
            <div className={classes.loginSection}>
              <div>DONO LMS</div>
              <form className={classes.LoginForm}>
                <label className={classes.LoginMail}>User Email*</label>
                <br></br>
                <input
                  type='email'
                  className={classes.LoginInput}
                  autoFocus
                  required
                  placeholder='Student User Email'
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
                  type='password'
                  className={classes.LoginPassInput}
                  autoFocus
                  required
                  placeholder='User Password'
                  value={password}
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                ></input>

                <br />

                <button
                  className={classes.LoginBtn}
                  type={'submit'}
                  onClick={(e) => onSubmitLogin(e)}
                >
                  Login
                </button>
              </form>
              <div className={classes.Divider}></div>
              If you are admin then login from here!
              <Link to={ADMIN_LOGIN}>Admin Login</Link>
            </div>
          </div>
          <div className={classes.loginLeftBox}>
            <img src={ImageLogin} alt='lms' className={classes.logimage}></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserLogin;
