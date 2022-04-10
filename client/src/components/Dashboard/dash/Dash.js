import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ALL_COURSE,
  ASSIGNED_COURSE,
} from '../../../constants/ApiPathContainer';
import { selectUser } from '../../../features/userSlice';
import { useSelector } from 'react-redux';

const Dash = () => {
  const user = useSelector(selectUser);
  const fetchAssignedCourses = () => {
    axios
      .get(ASSIGNED_COURSE, {
        headers: {
          'content-type': 'application/json',
          accepts: 'application/json',
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.json(),"nad");
      });
  };
  const fetchAllCourses = () => {
    axios
      .get(ALL_COURSE, {
        headers: {
          'Content-Type': 'application/json',
          accepts: 'application/json',
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.json(),"all");
      });
  };
  useEffect(() => {
    {
      user && user.role === 'Admin'
        ? fetchAllCourses()
        : fetchAssignedCourses();
    }
  }, []);

  return (<>
      <h1>Dashboard</h1>
      <div>
          <div>
              <img src='' alt='imgss'></img>
              <div>
                  <span>AUS545</span>
                  <p>machine learning</p>
              </div>
          </div>
      </div>
      </>
  );
};

export default Dash;
