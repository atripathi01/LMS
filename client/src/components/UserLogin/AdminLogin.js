import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageLogin from '../images/croped.jpg';
import { DASH_BOARD, LOGIN_PATH } from '../../constants/pathContainer';
import classes from './userlogin.module.css';
import { login } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import { ADMIN_SIGNIN } from '../../constants/ApiPathContainer';

///////////////////////////////////////////////////////////
////            Admin Login page                        ///
///////////////////////////////////////////////////////////

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // onSubmit login button function
  const onSubmitLogin = (e) => {
    e.preventDefault();
    // condition for valid email or userName
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

      // -----POST api for Admin sign in
      fetch(ADMIN_SIGNIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          const res = await response.json();

          // set all Admin user data on winodw localStorge
          window.localStorage.setItem('token', res.token);
          window.localStorage.setItem('role', res.role);
          window.localStorage.setItem('name', res.name);
          window.localStorage.setItem('email', email);

          if (response.status !== 200 || !data) {
            window.alert('failed');
          } else {
            dispatch(
              login({
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
              <form
                className={classes.LoginForm}
                onSubmit={(e) => onSubmitLogin(e)}
              >
                <label className={classes.LoginMail}>Admin Email*</label>
                <br></br>
                <input
                  type='email'
                  className={classes.LoginInput}
                  autoFocus
                  required
                  placeholder='Admin Email'
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
                  type='password'
                  className={classes.LoginPassInput}
                  autoFocus
                  required
                  placeholder='Admin Password'
                  value={password}
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                ></input>

                <br />

                <button className={classes.LoginBtn} type={'submit'}>
                  Login
                </button>
                <p
                  style={{
                    marginTop: '1rem',
                    fontSize: '12px',
                    fontWeight: '500px',
                    color: 'red',
                  }}
                >
                  NOTE: this login page only for admin.
                </p>
              </form>
              <div className={classes.Divider}></div>
              If you are trainer or learn, then{' '}
              <Link to={LOGIN_PATH}>Login</Link>
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

export default AdminLogin;
