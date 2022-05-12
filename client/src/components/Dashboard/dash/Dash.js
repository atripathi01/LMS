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
     <div className={classes.headerr}>
         <p className={classes.yourCourses}>Your Assigned Courses  <span className={classes.countedCourses}>12</span></p>
     </div>
   
      <section className={classes.courseCards}>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>AUS545</span>
            <p className={classes.courseName}> Machine Learning</p>
            <button className={classes.courseViewBtn}>View </button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>PYT533</span>
            <p className={classes.courseName}> Python</p>
            <button className={classes.courseViewBtn}>View </button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>RCT895</span>
            <p className={classes.courseName}> Reactjs</p>
            <button className={classes.courseViewBtn}>View </button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>JS5545</span>
            <p className={classes.courseName}>Javascript</p>
            <button className={classes.courseViewBtn}>View </button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>AUS545</span>
            <p className={classes.courseName}> Machine Learning</p>
            <button className={classes.courseViewBtn}>View </button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>PYT533</span>
            <p className={classes.courseName}> Python</p>
            <button className={classes.courseViewBtn}>View </button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>RCT895</span>
            <p className={classes.courseName}> Reactjs</p>
            <button className={classes.courseViewBtn}>View </button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>JS5545</span>
            <p className={classes.courseName}>Javascript</p>
            <button className={classes.courseViewBtn}>View </button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>AUS545</span>
            <p className={classes.courseName}> Machine Learning</p>
            <button className={classes.courseViewBtn}>View </button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>PYT533</span>
            <p className={classes.courseName}> Python</p>
            <button className={classes.courseViewBtn}>View </button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>RCT895</span>
            <p className={classes.courseName}> Reactjs</p>
            <button className={classes.courseViewBtn}>View </button>
          </div>
        </div>
      </div>
      <div className={classes.cardcontainer}>
        <div className={classes.card}>
          <div className={classes.imgContainer}><img className={classes.courseThumbnail} src={CourseImg} alt='imgss'></img></div>
          <div className={classes.courseDetail}>
            <span className={classes.courseCode}>JS5545</span>
            <p className={classes.courseName}>Javascript</p>
            <button className={classes.courseViewBtn}>View </button>
          </div>
        </div>
      </div>
      
     
      </section>
    </>
  );
};

export default Dash;
