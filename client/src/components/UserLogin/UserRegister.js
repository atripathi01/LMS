import React, { useState } from 'react'
import classes from "./userlogin.module.css"
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import ImageLogin from '../images/croped.jpg'
import { LOGIN_PATH } from '../../constants/pathContainer';
import {Link} from 'react-router-dom';

const UserRegister=(props)=> {
    const roles= props.roles;
    const[activeRole, setActiveRole] =useState(Object.keys(roles)[0]);

    const TeacherLoginStructure=(
      <form className={classes.LoginForm} >
    <label>Name</label><br />
    <input placeholder='Enter your full name' type="text"></input><br />
      <label className={classes.LoginMail} >
        User Email
      </label><br></br>
      <input 
      type="email" 
      className={classes.LoginInput} 
      autoFocus 
      required 
      placeholder='Teacher User Email'
      ></input>
      <br />
      <label className={classes.LoginPass} >
        Password
      </label>
      <br />
      <input  
      type="password"
      className={classes.LoginPassInput} 
      autoFocus 
      required 
      placeholder='User Password'
      ></input>
      <br />
      <label className={classes.LoginPass} >
        Comfirm Password
      </label>
      <br />
      <input  
      type="password"
      className={classes.LoginPassInput} 
      autoFocus 
      required 
      placeholder='User Password'
      ></input>
      <br />
      <button className={classes.LoginBtn}>Teacher Register</button>
    </form>
    
    );


    const StudentLoginStructure=(
<form className={classes.LoginForm} >
                <label className={classes.LoginMail} >
                  User Email
                </label><br></br>
                <input 
                type="email" 
                className={classes.LoginInput} 
                autoFocus 
                required 
                placeholder='Student User Email'
                ></input>
                <br />
                <label className={classes.LoginPass} >
                  User Password
                </label>
                <br />
                <input  
                type="password"
                className={classes.LoginPassInput} 
                autoFocus 
                required 
                placeholder='User Password'
                ></input>
                <br />
                <button className={classes.LoginBtn}>Student Register</button>
              </form>
              
    );


   const generateLoginStructure=()=>{
     switch(roles[activeRole]){
       case roles.Teacher: return TeacherLoginStructure;
       case roles.Student: return StudentLoginStructure;
       default: return null; 
     }
   };


    return (
      <div>
        <div className={classes.loginPage}>
        <div className={classes.loginBox}>
          <div className={classes.loginRightBox}>
            <div className={classes.role}>
              {Object.keys(roles)?.map((key)=>
              (<div
               className={`${classes.LoginRole} ${activeRole=== key ? classes.active :''} `}
               key={key}
               onClick={()=>setActiveRole(key)}>
                {roles[key]}
              </div>))}
            </div>
            
            <div className={classes.loginSection} >
             
             {generateLoginStructure()}
              

              <div className={classes.Divider}></div>
            </div>
            <div className={classes.SocailLogin}>
              <ul className={classes.SocailLoginWrapper}>
                <li><GoogleIcon /></li>
                <li><FacebookIcon /></li>
              </ul>
            </div>
            <div className={classes.newUser}>
               Already Registered? Then <Link to={LOGIN_PATH} className={classes.newUserSignUp}> Login</Link>
            </div>
          </div>
          <div className={classes.loginLeftBox}>
            <img src={ImageLogin} alt='lms' className={classes.logimage}></img>
          </div>
        </div>
        </div>
      </div>
    )
}
export default UserRegister