import React, { useState, useEffect } from "react";
import classes from "./admin.module.css";
import axios from "axios";
import {selectUser} from '../../features/userSlice'
import {useSelector} from 'react-redux'

const Admin = () => {
    const user=useSelector(selectUser);
  const adminSection = {
    createAccount: "Create Account",
    courseAccesses: "Course Access",
  };
  const [adminActive, setAdminActive] = useState(Object.keys(adminSection)[0]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfPassword, setUserConfPassword] = useState("");
  const [student, setStudent] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [learnerList,setLearnerList ]=useState([]);
  const [coursesList,setCourseList]=useState([]);
   console.log(learnerList);
   console.log(coursesList)
   console.log(user);
  async function fetchStudentList() {
      await axios.get("/admin/get-all-learners",{
          headers:{
            "Content-Type": "application/json",
            accepts: "application/json",
           'Authorization':`Bearer ${user.token}`,
          }
      }).then((response)=>{
        //   console.log(response.data[0].name)
          setLearnerList(response.data)
          
      })
      
  }
  async function fetchCourseList(){
      await axios.get("/all-courses",{
          headers:{
            "Content-Type": "application/json",
            accepts: "application/json",
           'Authorization':`Bearer ${user.token}`,
          }
      }).then((response)=>{
        //   console.log(response.data);
          setCourseList(response.data.course)
      })
  }

  useEffect(() => {
    fetchCourseList();
    fetchStudentList();
  }, [])
  

  function submitData(event) {
      
    event.preventDefault();

    // condition for password and email checking
    let passwordCondition =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let emailCondition =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // basic validation
    if (userName === "") {
      window.alert("Please fill empty field");
      return;
    } else if (userEmail === ""||selectedRole==="") {
      window.alert("Please fill empty field");
      return;
    } else if (userPassword === "") {
      window.alert("Please fill empty field");
      return;
    } else if (userConfPassword === "") {
      window.alert("Please fill empty field");
      return;
    } else if (userPassword !== userConfPassword) {
      window.alert("passwords are not same");
      return;
    }

    // validating pasword and email using regexps
    else if (!passwordCondition.test(String(userPassword).trim())) {
      window.alert(
        "Password must contain atleast one capital letter, Special character and a numerical value"
      );
      return;
    } else if (!emailCondition.test(String(userEmail).trim())) {
      window.alert("Please enter a valid email address");
      return;
    } else {
      const data = {
          name:userName,
          email:userEmail,
          password:userConfPassword,
          role:selectedRole,

      };

      fetch("/admin/member-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accepts: "application/json",
         'Authorization':`Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log("Data sent......Done");
          if (response.status === 406 || !data) {
            window.alert("406");
          } else {
            window.alert("Registered successfully");
          }

          return response.json();
        })
        .catch((error) => {
          console.log("error ", error);
        });
    }
  }
  const createAccounts = (
    <div className={classes.createAccount}>
      <h1 className={classes.title}>Create Account</h1>
      <div className={classes.accountForm}>
        <form onSubmit={submitData}>
          <label className={classes.user_name}>User Name </label>
          <br />
          <input
            placeholder="Enter the User Name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            className={classes.user_name_input}
            required
            autoFocus
          />
          <br />
          <label className={classes.user_email}>User Email Id</label>
          <br />
          <input
            className={classes.user_email_input}
            placeholder="Enter the User Email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            required
            autoFocus
          />
          <br />
          <label className={classes.user_pass}>User Password</label>
          <br />
          <input
            placeholder="User Password"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            className={classes.user_pass_input}
            required
            autoFocus
          />
          <br />
          <label className={classes.user_confpass}>Conform User Password</label>
          <br />
          <input
            placeholder="Conform User Password"
            value={userConfPassword}
            onChange={(e) => {
              setUserConfPassword(e.target.value);
            }}
            className={classes.user_conf_input}
            required
            autoFocus
          />
          <br />
          <div className={classes.role_selector}>
            <label className={classes.role_s}>Role : </label>
            <br />
            <select
              className={classes.user_role}
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
              }}
            >
              <option className={classes.trainer}>Trainer</option>
              <option className={classes.student}>Learner</option>
            </select>
          </div>

          <br />
        </form>
        <button
          className={classes.user_account_cr_btn}
          type="submit"
          onClick={user.role==='Admin' && submitData}
        >
          Submit
        </button>   
      </div>
    </div>
  );
  // const createStudentAccount = (
  //   <>
  //     <h1>Create Student Account</h1>
  //     <div>
  //       <label>Student Name </label>
  //       <br />
  //       <input
  //         placeholder="Enter the Student Name"
  //         value={studentName}
  //         onChange={(e) => {
  //           setStudentName(e.target.value);
  //         }}
  //       />
  //       <br />
  //       <label>Student Email Id</label>
  //       <br />
  //       <input
  //         placeholder="Enter the Student Email"
  //         value={studentEmail}
  //         onChange={(e) => {
  //           setStudentEmail(e.target.value);
  //         }}
  //       />
  //       <br />
  //       <label>Student Password</label>
  //       <br />
  //       <input
  //         placeholder="Student Password"
  //         value={studentPassword}
  //         onChange={(e) => {
  //           setStudentPassword(e.target.value);
  //         }}
  //       />
  //       <br />
  //       <label>Conform Student Password</label>
  //       <br />
  //       <input
  //         placeholder="Conform Student Password"
  //         value={studentConfPassword}
  //         onChange={(e) => {
  //           setStudentConfPassword(e.target.value);
  //         }}
  //       />
  //       <br />
  //       <button type="submit">Submit</button>
  //     </div>
  //   </>
  // );

  const giveAccessOfCourese = (
    <div className={classes.access_section}>
      <h1 className={classes.access_title}>Course Access for Student</h1>
      <div className={classes.std_id}>
        <label className={classes.std}>Student ID :</label>
        <select
          value={student}
          onChange={(e) => {
            setStudent(e.target.value);
          }}
          className={classes.select_std_id}
        >
         {learnerList.map((list)=>(
                
              <option>
                  {list.email}
              </option>
        
        ))}
      
        </select>
      </div>
      <div className={classes.course_name}>
        <label className={classes.cus}>Course Code and Name :</label>
        <select
          value={courseCode}
          onChange={(e) => {
            setCourseCode(e.target.value);
          }}
          className={classes.select_course}
        >
        {coursesList.map((courses)=>(
            <option>{courses.courseCode}{" "}{courses.courseName}</option>
        ))}
        </select>
      </div>
      <button type="submit" className={classes.giveAccess}>
        Give Access{" "}
      </button>
    </div>
  );

  const generateSection = () => {
    switch (adminSection[adminActive]) {
      case adminSection.createAccount:
        return createAccounts;
      // case adminSection.studentAccount:
      //   return createStudentAccount;
      case adminSection.courseAccesses:
        return giveAccessOfCourese;
      default:
        return null;
    }
  };

  return (
    <>
     
      <section className={classes.adminPage}>
        <div className={classes.adminSideNavbar}>
          {Object.keys(adminSection)?.map((key) => (
            <div
              className={`${classes.adminItems} ${
                adminActive === key ? classes.activeAdminSec : ""
              }`}
              key={key}
              onClick={() => setAdminActive(key)}
            >
              {adminSection[key]}
            </div>
          ))}
        </div>
        <div className={classes.detailofNavItems}>{generateSection()}</div>
      </section>
    </>
  );
};

export default Admin;
