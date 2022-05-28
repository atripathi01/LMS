import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useParams } from 'react-router-dom';
import { selectUser } from '../../../../features/userSlice';
import { useSelector } from 'react-redux';
import ModuleCreate from '../../courseDatail/uploadVideos';
import Collapsible from 'react-collapsible';
import classes from './courses.module.css';
import Assignment from '../assignment/Assignment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #efefef',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};


function Courses() {
    // user Detail from redux
  const user = useSelector(selectUser);
  
  let { course_code, course_name } = useParams();


//   useState initaillize
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [modules, setModules] = useState([]);

  // handle model open and close (create module)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const fetchCourseByCourseCode = () => {
    fetch('/course/get-by-course-code', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        courseCode: course_code,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response.course.modules);
        setModules(response.course.modules);
      });
  };

  //useEffect
  useEffect(() => {
    fetchCourseByCourseCode();
  }, []);



  const submitModuleDetail = () => {
    fetch('/admin/module', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        courseCode: course_code,
        moduleName: name,
        moduleDuration: duration,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        handleClose();
        fetchCourseByCourseCode();
      });
  };

  return (
    <>
      <div style={{ height: '5.5rem' }}>courses</div>
      <div>
        <button onClick={handleOpen} className={classes.moduleCreationBtn}>
          {' '}
          + module{' '}
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h4-bold' component='h2' className={classes.cretModule}>
              Create Module
            </Typography>
            <form className={classes.formModuleCreate}>
            <label>Module Name</label>
            <br />
            <input
              placeholder='module name'
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <label>Module Duration</label>
            <br />
            <input
              type={'time'}
              required
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            />

            <br />
            <button type='submit' onClick={() => submitModuleDetail()}>
              Create
            </button>
            </form>
          </Box>
        </Modal>
      </div>
      <h1 className={classes.courseNames}>{course_name}</h1>
      <div className={classes.moduleDivision}>
          {/* all modules list  */}
        <div className={classes.moduleList}>
          {modules.map((lis) => (
            <Collapsible
              trigger={
                <div className={classes.moduleItem} style={{ display: 'flex' }}>
                  <div key={lis._id}>
                    <div className={classes.moduleNames}>{lis.moduleName}</div>
                    <div>{lis.moduleDuration}</div>
                  </div>
                </div>
              }
              >
              <ul>
                <li className={classes.moduleContentList}>
                  bla bla bla bla waah
                </li>
                <li className={classes.moduleContentList}>
                  bla bla bla bla waah
                </li>
                <li  style={{ border: '2px #000 dotted', cursor: 'pointer' }}>
                 
              <ModuleCreate
                moduleName={lis.moduleName}
                module_id={lis._id}
                courseCode={course_code}
              />
                </li>
                <li><h1>ASSIGNMENTS</h1></li>
               


                <li style={{ border: '2px #000 dotted', cursor: 'pointer' }}>
                  {/* <button>Create Assignments</button> */}
                  <button>
                    <Assignment module_id={lis._id} />
                  </button>
                </li>
              </ul>
            </Collapsible>
          ))}
        </div>
         {/* module content show section (videos and pdfs) */}
        <div className={classes.moduleContent}>
          There is no Content available for Now{' '}
        </div>
      </div>
    </>
  );
}

export default Courses;
