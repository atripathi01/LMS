import React, { useState } from "react";
import classes from "./admin.module.css";

const Admin = () => {
  const adminSection = {
    trainerAccount: "Trainer Account",
    studentAccount: "Student Account",
    courseAccesses: "Course Access",
  };
  const [adminActive, setAdminActive] = useState(Object.keys(adminSection)[0]);

  const createTrainerAccount = (
    <>
      <h1>Create Trainer Account</h1>
      <div>
        <label>Trainer Name </label>
        <br />
        <input placeholder="Enter the Trainer Name" />
        <br />
        <label>Trainer Email Id</label>
        <br />
        <input placeholder="Enter the Trainer Email" />
        <br />
        <label>Trainer Password</label>
        <br />
        <input placeholder="Trainer Password" />
        <br />
        <label>Conform Trainer Password</label>
        <br />
        <input placeholder="Conform Trainer Password" />
        <br />
        <button type="submit">Submit</button>
      </div>
    </>
  );
  const createStudentAccount = (
    <>
      <h1>Create Student Account</h1>
      <div>
        <label>Student Name </label>
        <br />
        <input placeholder="Enter the Student Name" />
        <br />
        <label>Student Email Id</label>
        <br />
        <input placeholder="Enter the Student Email" />
        <br />
        <label>Student Password</label>
        <br />
        <input placeholder="Student Password" />
        <br />
        <label>Conform Student Password</label>
        <br />
        <input placeholder="Conform Student Password" />
        <br />
        <button type="submit">Submit</button>
      </div>
    </>
  );
  const giveAccessOfCourese = (
    <>
      <h1>Course Access for Student</h1>
      <div>
        Student ID{" "}
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
        </select>
      </div>
      <div>
        Course Code and Name{" "}
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
        </select>
      </div>
      <button type="submit">Give Access </button>
    </>

  );

  const generateSection = () => {
    switch (adminSection[adminActive]) {
      case adminSection.trainerAccount:
        return createTrainerAccount;
      case adminSection.studentAccount:
        return createStudentAccount;
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
