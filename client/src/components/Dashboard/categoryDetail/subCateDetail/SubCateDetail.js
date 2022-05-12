import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectUser } from '../../../../features/userSlice';
import { useSelector } from 'react-redux';
import classes from './subCate.module.css';

const SubCateDetail = () => {
  let { course_name, cate_id } = useParams();

  // useState initiallize
  const [courseList, setCourseList] = useState([]);

  // user detail from redux
  const user = useSelector(selectUser);

  //useEffect
  useEffect(() => {
    fetch('/course/get-by-sub-category', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        courseCategory: cate_id,
        courseSubCategory: course_name,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response.course);
        setCourseList(response.course);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        <div style={{ height: '7rem' }}></div>
        <div className={classes.SubCateDetailSection}>
          {/* table of all subCategory listed */}
          <table
            style={{ textAlign: 'left' }}
            className={classes.SubCateDetail}
          >
            <tr className={classes.subCateTableHead}>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Creations Time</th>
              <th>Hierarchy</th>
              <th>Action</th>
            </tr>
            {courseList.map((list) => (
              <tr className={classes.subCateTable}>
                <td>{list.courseName}</td>
                <td>{list.courseCode}</td>
                <td>{list.courseCreationTime}</td>
                <td>{list.hierarchy}</td>
                <td>
                  {' '}
                  <a
                    href={`/dashboard/${cate_id}/${course_name}/${list.courseCode}`}
                  >
                    View &gt;
                  </a>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default SubCateDetail;
