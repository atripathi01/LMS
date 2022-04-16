import React, { useEffect } from 'react';
import classes from './dash.module.css'
import CourseImg from '../../images/course1.png'
import {
  ALL_COURSE,
  ASSIGNED_COURSE,
} from '../../../constants/ApiPathContainer';
import { selectUser } from '../../../features/userSlice';
import { useSelector } from 'react-redux';
import CalenderImg from '../../images/calendar.png'
// import { Link } from 'react-router-dom';
// import {CALENDER} from '../../../constants/pathContainer'


//Dashboard Section of Dashboard Page of DONO LMS


const Dash = () => {
  const user = useSelector(selectUser);
  const fetchAssignedCourses = () => {
    const data = {
      email: user.email,
    };
    fetch(ASSIGNED_COURSE, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accepts: 'application/json',
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchAllCourses = () => {
    fetch(ALL_COURSE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json',
        authorization: `Bearer ${user.token}`,
      },
    }).then((response) => {
      console.log(response.json(), 'all');
    });
  };
  useEffect(() => {
    {
      user && user.role === 'Admin'
        ? fetchAllCourses()
        : fetchAssignedCourses();
    }
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <div className={classes.calender_card}>
         
          <div className={classes.calendr}>
             <img style={{width:"50px",height:"50px"}} src={CalenderImg} alt="calender" />
             <p style={{padding:"5px"}}>Event Calender</p>
          </div>
         
      </div>
      <section className={classes.courseCards}>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>Code-AUS545</span>
            <p className={classes.courseName}>machine learning</p>
            <p className={classes.courseDescription}>
              React, JSX, ES6, and Flow syntax support. Language extras beyond
              ES6 like the object spread operator. Autoprefixed CSS, so you
              don’t need -webkit- or other prefixes.
            </p>
            <button className={classes.courseViewBtn}>View course</button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>Code-AUS545</span>
            <p className={classes.courseName}>machine learning</p>
            <p className={classes.courseDescription}>
              React, JSX, ES6, and Flow syntax support. Language extras beyond
              ES6 like the object spread operator. Autoprefixed CSS, so you
              don’t need -webkit- or other prefixes.
            </p>
            <button className={classes.courseViewBtn}>View course</button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>Code-AUS545</span>
            <p className={classes.courseName}>machine learning</p>
            <p className={classes.courseDescription}>
              React, JSX, ES6, and Flow syntax support. Language extras beyond
              ES6 like the object spread operator. Autoprefixed CSS, so you
              don’t need -webkit- or other prefixes.
            </p>
            <button className={classes.courseViewBtn}>View course</button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>Code-AUS545</span>
            <p className={classes.courseName}>machine learning</p>
            <p className={classes.courseDescription}>
              React, JSX, ES6, and Flow syntax support. Language extras beyond
              ES6 like the object spread operator. Autoprefixed CSS, so you
              don’t need -webkit- or other prefixes.
            </p>
            <button className={classes.courseViewBtn}>View course</button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>Code-AUS545</span>
            <p className={classes.courseName}>machine learning</p>
            <p className={classes.courseDescription}>
              React, JSX, ES6, and Flow syntax support. Language extras beyond
              ES6 like the object spread operator. Autoprefixed CSS, so you
              don’t need -webkit- or other prefixes.
            </p>
            <button className={classes.courseViewBtn}>View course</button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>Code-AUS545</span>
            <p className={classes.courseName}>machine learning</p>
            <p className={classes.courseDescription}>
              React, JSX, ES6, and Flow syntax support. Language extras beyond
              ES6 like the object spread operator. Autoprefixed CSS, so you
              don’t need -webkit- or other prefixes.
            </p>
            <button className={classes.courseViewBtn}>View course</button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>Code-AUS545</span>
            <p className={classes.courseName}>machine learning</p>
            <p className={classes.courseDescription}>
              React, JSX, ES6, and Flow syntax support. Language extras beyond
              ES6 like the object spread operator. Autoprefixed CSS, so you
              don’t need -webkit- or other prefixes.
            </p>
            <button className={classes.courseViewBtn}>View course</button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>Code-AUS545</span>
            <p className={classes.courseName}>machine learning</p>
            <p className={classes.courseDescription}>
              React, JSX, ES6, and Flow syntax support. Language extras beyond
              ES6 like the object spread operator. Autoprefixed CSS, so you
              don’t need -webkit- or other prefixes.
            </p>
            <button className={classes.courseViewBtn}>View course</button>
          </div>
        </div>
      </div>
     
     
      </section>
    </>
  );
};

export default Dash;
