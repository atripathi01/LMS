import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectUser } from '../../../features/userSlice';
import { useSelector } from 'react-redux';
import classes from './catedetail.module.css';

const CategoryDetail = () => {
  let { cate_id } = useParams();
  const courseCategory = cate_id;

  // user from redux
  const user = useSelector(selectUser);

  // useState Initiallize
  const [courseSubCateList, setCourseSubCateList] = useState([]);

  // useEffect
  useEffect(() => {
    fetch('/course/get-by-course-category', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ courseCategory }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        setCourseSubCateList(response.course);
      });
    console.log(window.location);
  }, []);
  const submitAction = () => {
    localStorage.setItem('cate_id', cate_id);
  };

  return (
    <>
      <div style={{ height: '8rem' }}></div>

      <div className={classes.courseCateList}>
        {/* table of all Category details */}
        <table style={{ textAlign: 'left' }} className={classes.tableCreation}>
          <tr className={classes.tableFormathead}>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Hierarchy</th>
            <th>Action</th>
          </tr>
          {courseSubCateList.map((items) => (
            <tr className={classes.tableFormat}>
              <td>{items.courseCategory}</td>
              <td>{items.subCategory}</td>
              <td>{items.hierarchy}</td>
              <td>
                {' '}
                <a
                  href={`/dashboard/${cate_id}/${items.subCategory}`}
                  onClick={() => submitAction()}
                >
                  View Course &gt;
                </a>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default CategoryDetail;
