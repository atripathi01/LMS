import React, { useEffect, useState } from 'react';
import classes from './dashboard.module.css';
import Box from '@mui/material/Box';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import folderImg from '../images/folder.svg';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AddIcon from '@mui/icons-material/Add';
import CalendarPage from './calender/Calendar';
import Notificaton from './notification/Notificaton';
import Dash from './dash/Dash';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  ALL_COURSE,
  CATEGORIES,
  CREATE_COURSE,
} from '../../constants/ApiPathContainer';
import Assessment from './Assessment/Assessment';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '600px',
  bgcolor: 'background.paper',
  border: '2px solid #efefef',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

const Dashboard = (props) => {
  // passing props from app.js
  const dashboardSection = props.dashboardSection;

  // user detail from redux
  const user = useSelector(selectUser);

  //useState initiallize
  const [items, setItems] = useState([]);
  const [opens, setOpens] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [courseCode, setCourseCode] = React.useState('');
  const [courseTitle, setCourseTitle] = React.useState('');
  const [courseCategory, setCourseCategory] = React.useState('Full Stack');
  const [description, setDescription] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('Frontend Stack');
  const [duration, setDuration] = React.useState('');
  const [activvDashboardSection, setActiveDashboardSection] = useState(
    Object.keys(dashboardSection)[0]
  );

  // handle click model open (create folder)

  const handleClickOpen = () => {
    return setOpens(true);
  };

  // handle click model close (create folder)
  const handleClickClose = () => {
    return setOpens(false);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // fetch all courses
  function allCoourses() {
    fetch(
      CATEGORIES,

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accepts: 'application/json',
          authorization: `Bearer ${user.token}`,
        },
      }
    )
      .then(async (response) => {
        const res = await response.json();
        console.log(response.status);
        if (response.status === 200) {
          //   console.log('fetched', res.courseCategories);
          setItems(res.courseCategories);
        } else {
          console.log('failed fetch');
        }
      })

      .catch((err) => {
        console.log('error', err);
      });
  }

  // useEffect
  useEffect(() => {
    allCoourses();
  }, []);

  // onSubmit (create folder)
  function onSubmit(e) {
    if (
      courseCode === '' ||
      courseTitle === '' ||
      description === '' ||
      courseCategory === '' ||
      subCategory === ''
    ) {
      window.alert('Please fill the blank field');
    } else {
      const courseData = {
        courseCode: courseCode,
        courseName: courseTitle,
        description: description,
        courseCategory: courseCategory,
        subCategory: subCategory,
      };
      console.log(courseData);

      fetch(CREATE_COURSE, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(courseData),
      })
        .then(async (response) => {
          const res = await response.json();

          if (response.status !== 200) {
            window.alert(res.msg);
            console.log(response.status);
            console.log(res.msg);
          } else if (response.status === 200) {
            setOpens(false);
            window.alert('Folder Created Successfully!!');
            allCoourses();
          }
        })
        .catch((err) => {
          window.alert('Failed!!');
          console.log(err);
        });
    }
  }

  // create folder dialog
  const createFolderButton = () => {
    return (
      <div>
        {user.token && user.role === 'Admin' ? (
          <div className={classes.bt}>
            {/* <button
              className={classes.uploadButn}
              variant='contained'
              onClick={handleClickOpen}
            >
              <AddIcon /> Create Course
            </button> */}
            <button onClick={handleOpen} className={classes.uploadButn}>
              {' '}
              + Create Course{' '}
            </button>
          </div>
        ) : (
          ''
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2' className={classes.cret}>
              Create Course Folder
            </Typography>
            <form className={classes.formCreate}>
            <label>
                  Course Code*{' '}
                  <small> (atleast two capital letter and two number)</small>
                </label>
                <br />
                <input
                  required
                  autoFocus
                  maxLength={6}
                  value={courseCode}
                  onChange={(e) => {
                    setCourseCode(e.target.value);
                  }}
                  placeholder="course code"
                />
                <br />
                <label >Course Name*</label>
                <br />
                <input
                  required
                  autoFocus
                  label='Title of Course'
                  value={courseTitle}
                  onChange={(e) => {
                    setCourseTitle(e.target.value);
                  }}
                  placeholder='course name'
                />
                <br />
                <label >Description*</label>
                <br />

                <TextareaAutosize
                  aria-label='minimum height'
                  minRows={5}
                  placeholder='description of course'
                  required
                  autoFocus
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <label>Course category*</label>
                <br />
                <select
                  required
                  autoFocus
                  value={courseCategory}
                  onChange={(e) => {
                    setCourseCategory(e.target.value);
                  }}
                >
                  <option>Full Stack</option>
                  <option>AI</option>
                  <option>Machine Learning</option>
                  <option>Data Structure</option>
                  <option>Algorithm</option>
                </select>
                <br />
                <label>Sub Category</label>
                <br />
                <select
                  required
                  autoFocus
                  value={subCategory}
                  onChange={(e) => {
                    setSubCategory(e.target.value);
                  }}
                >
                  <option>Frontend Stack</option>
                  <option>Backend Stack</option>
                  <option>Deep Learning</option>
                  <option>Machine Learning</option>
                  <option>Data Structure</option>
                </select>
                <br />

                <label>Duration</label>
                <br />
                <input
                  required
                  autoFocus
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  type='time'
                />
                <br />
            <button type='submit' onClick={(e)=>onSubmit(e)} className={classes.cretBtn}>
              Create
            </button>
            </form>
            <br />
          </Box>
        </Modal>

        {/* <Dialog
          fullScreen
          open={opens}
          onClose={handleClickClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar className={classes.toptool}>
              <IconButton
                edge='start'
                color='inherit'
                onClick={handleClickClose}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                Create Course Folder
              </Typography>
              <Button
                // autoFocus
                className={classes.creatbtn}
                onClick={(e) => onSubmit(e)}
              >
                CREATE
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{ marginLeft: '3rem' }}>
            <form className={classes.folderForm}>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  fontSize: '18px',
                }}
              >
                <h1>COURSE FOLDER CREATER</h1>
                <label className={classes.courCode}>
                  Course Code*{' '}
                  <small> (atleast two capital letter and two number)</small>
                </label>
                <br />
                <input
                  required
                  autoFocus
                  maxLength={6}
                  value={courseCode}
                  className={classes.codeInput}
                  onChange={(e) => {
                    setCourseCode(e.target.value);
                  }}
                />
                <br />
                <label className={classes.courNam}>Course Name*</label>
                <br />
                <input
                  //   className={classes.courNamInput}
                  className={classes.codeInput}
                  fullWidth
                  required
                  autoFocus
                  label='Title of Course'
                  id='fullWidth'
                  style={{ fontSize: '18px' }}
                  value={courseTitle}
                  onChange={(e) => {
                    setCourseTitle(e.target.value);
                  }}
                />
                <br />
                <label className={classes.des}>Description*</label>
                <br />

                <TextareaAutosize
                  //   className={classes.desInput}
                  className={classes.codeInput}
                  aria-label='minimum height'
                  minRows={10}
                  placeholder='Description of Course'
                  style={{ width: '100%', maxWidth: '900px', fontSize: '18px' }}
                  required
                  autoFocus
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <label className={classes.codeCate}>Course category*</label>
                <br />
                <select
                  //   className={classes.cateInput}
                  className={classes.codeInput}
                  required
                  autoFocus
                  value={courseCategory}
                  onChange={(e) => {
                    setCourseCategory(e.target.value);
                  }}
                >
                  <option>Full Stack</option>
                  <option>AI</option>
                  <option>Machine Learning</option>
                </select>
                <br />
                <label>Sub Category</label>
                <br />
                <select
                  className={classes.subCateSelection}
                  required
                  autoFocus
                  value={subCategory}
                  onChange={(e) => {
                    setSubCategory(e.target.value);
                  }}
                >
                  <option>Frontend Stack</option>
                  <option>Backend Stack</option>
                  <option>Deep Learning</option>
                  <option>Python</option>
                </select>
                <br />

                <label>Duration</label>
                <br />
                <input
                  className={classes.durationInput}
                  required
                  autoFocus
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  type='time'
                />
              </Box>

              <div></div>
            </form>
          </div>
        </Dialog> */}
      </div>
    );
  };

  // COURSE SECTION OF DASHBOARD NAVBAR
  const Courses = (
    <div className={classes.courseSecs}>
      <div style={{ margin: '2rem' }}>
        {user.token && user.role === 'Admin' ? createFolderButton() : ''}
      </div>
      <section style={{ marginLeft: '2rem' }}>
        <div>
          <div className={classes.heading}>
            <h1 className={classes.head}>COURSE LISTS</h1>
            <h3 className={classes.subtitle}>
              Here all uploaded courses are avaiable...
            </h3>
          </div>
          <div className={classes.cateItems}>
            {/* all category card listed */}
            {items.map((cate) => (
              <div className={classes.cateCard}>
                <div className={classes.cateList}>{cate}</div>
                <a href={`/dashboard/${cate}`} className={classes.cateVeiw}>
                  <button className={classes.viewbtn}>Veiw</button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // CALENDAR SECTION OF DASHBOARD NAVBAR
  const Calendar = (
    <div>
      <CalendarPage />
    </div>
  );

  //ASSESSMENT SECTION OF DASHBOARD NAVBAR
  const Assessments=(
      <div>
          <Assessment />
      </div>
  );

  // MAIN DASHBOARD OF DASHBOARD NAVBAR (HOME DASHBOARD)
  const Dashboard = (
    <section className={classes.marginOnDash}>
      <div className={classes.courseSec}>
        <Dash />
      </div>
    </section>
  );

  //switch cases for section of dashboard side navbar
  const generateDashboardSection = () => {
    switch (dashboardSection[activvDashboardSection]) {
      case dashboardSection.dashboard:
        return Dashboard; //dashboard section
      case dashboardSection.courses:
        return Courses; //course section
      case dashboardSection.calendar:
        return Calendar; //course section
      case dashboardSection.assessment:
        return Assessments; //course section
      default:
        return null;
    }
  };

  return (
    <>
      <section className={classes.dash}>
        <div className={classes.dashNav}>
          <div></div>

          {/* -------------> side menu of dashboard page<---------------- */}
          {Object.keys(dashboardSection)?.map((key) => (
            <div
              className={`${classes.dashboardItems} ${
                activvDashboardSection === key ? classes.activeDash : ' '
              }`}
              key={key}
              onClick={() => setActiveDashboardSection(key)}
            >
              {dashboardSection[key]}
            </div>
          ))}
        </div>

        {/* ------------------> detail section of side menu item <--------------------- */}
        <div className={classes.dashItemDetail} style={{ width: '100%' }}>
          {generateDashboardSection()}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
