import React, { useState } from 'react'
import classes from "./userlogin.module.css"
const UserLogin =()=> {
    const[activeRole, setActiveRole] =useState("Student");
    const roles={
      Teacher:"Teacher",
      Student:"Student"
    }

    return (
      <div>
        <div className={classes.loginPage}>
        <div className={classes.loginBox}>
          <div className={classes.loginRightBox}>
            <div className={classes.role}>
              {Object.keys(roles)?.map((role)=>(<div className={classes.LoginRole} key={role}>
                {roles[role]}
              </div>))}
            </div>
          </div>
          <div className={classes.loginLeftBox}>
            
          </div>
        </div>
        </div>
      </div>
    )
  
}
export default UserLogin
