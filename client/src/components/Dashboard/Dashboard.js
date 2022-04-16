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
import { ALL_COURSE, CREATE_COURSE } from '../../constants/ApiPathContainer';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const dashSection = {
  dash: 'Dash',
  assessment: 'Assessment',
  calenderNschedule: 'Calender And Schedule',
};

const Dashboard = (props) => {
  //---------> passing all props from app.js page<------------
  const dashboardSection = props.dashboardSection;
  const user = useSelector(selectUser);
  // ------------> intialize state
  const [items, setItems] = useState([]);
  const [opens, setOpens] = useState(false);
  const [courseCode, setCourseCode] = React.useState('');
  const [courseTitle, setCourseTitle] = React.useState('');
  const [courseCategory, setCourseCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('');
  const [duration,setDuration]=React.useState('');
  const [activvDashboardSection, setActiveDashboardSection] = useState(
    Object.keys(dashboardSection)[0]
  );
  const [activedash, setActivedash] = useState(Object.keys(dashSection)[0]);

  // handle click open function for open the create course folder model on course section of dashboard
  const handleClickOpen = () => {
    return setOpens(true);
  };

  // handle click close function for close the create course folder model on course section of dashboard
  const handleClickClose = () => {
    console.log('kuch bhi');
    return setOpens(false);
  };

  //create object of sections inside dashboard section of dashborad page

  // fetch all courses function
  function allCoourses() {
    // feteching all course on course section for users
    fetch(
      ALL_COURSE,

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
          console.log('fetched', res.course);
          setItems(res.course);
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

  // onSubmit function is for create course folder
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
      //   courseCategory, courseName, subCategory, courseCode(unique), courseDescription,courseDuration

      // api of create course folder
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

  // button on course section for open model to create folder for courses
  // button name is CREATE COURSE FOLDER
  const createFolderButton = () => {
    return (
      <div>
        {user.token && user.role === 'Admin' ? (
          <div className={classes.bt}>
            <button
              className={classes.uploadButn}
              variant='contained'
              onClick={handleClickOpen}
            >
              <AddIcon /> Create Course
            </button>
          </div>
        ) : (
          ''
        )}

        <Dialog
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
                autoFocus
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
                  <option>Frontend stack</option>
                  <option>backend stack</option>
                  <option>fullstack</option>
                  <option>machine learning</option>
                  <option>reactjs</option>
                  <option>python</option>
                  <option>javascript</option>
                  <option>AI</option>
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
                  <option>Rendom One</option>
                  <option>Rendom Two</option>
                  <option>Rendom Three</option>
                  <option>Rendom Four</option>
                  <option>Rendom Five</option>
                  <option>Rendom Six</option>
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
        </Dialog>
      </div>
    );
  };

  /////////////////////////////////////////////////////////////////////////
  //             Course Section of Dashboard Page                        //
  /////////////////////////////////////////////////////////////////////////

  const Courses = (
    <div className={classes.courseSec}>
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
          <div className={classes.courseCard}>
            {/* Map all the folder of course */}

            <div style={{ width: '100%' }}>
            <div style={{width:"100%"}}>
              <table>
                <tr>
                  <th>Course Name</th>
                  <th>Course Code</th>
                  <th>Course Category</th>
                  <th>Veiw Course</th>
                </tr>
                {items.map((course) => (
                  <tr key={course._id}>
                    <td>{course.courseName}</td>
                    <td>{course.courseCode}</td>
                    <td>{course.courseCategory}</td>
                    <td>
                      <a href={`/dashboard/${course.courseCode}`}>
                        <button type='button'>
                          Veiw Course <ArrowForwardIcon />
                        </button>
                      </a>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );

  ////////////////////////////////////////////////////////////////////////
  //             Dashboard Section of Dashboard Page                    //
  ////////////////////////////////////////////////////////////////////////

  //switch case for dash items
  const generateDashSection = () => {
    switch (dashSection[activedash]) {
      case dashSection.dash:
        return <Dash />;
      case dashSection.assessment:
        return <h1>Assessment</h1>;
      case dashSection.calenderNschedule:
        return <CalendarPage />;
      default:
        return null;
    }
  };
  const Dashboard = (
    <section className={classes.marginOnDash}>
      <div className={classes.courseSec}>
        <div className={classes.dashInsideNavWrapper}>
          {Object.keys(dashSection)?.map((key) => (
            <div
              key={key}
              onClick={() => setActivedash(key)}
              className={`${classes.dashBoardInsideNav}  ${
                activedash === key ? classes.activeDashItemInside : ''
              }`}
            >
              {dashSection[key]}
            </div>
          ))}
        </div>
        {/* <Dash />
    <CalendarPage /> */}
      </div>
      <div>{generateDashSection()}</div>
    </section>
  );

  //switch cases for section of side navbar or menu
  const generateDashboardSection = () => {
    switch (dashboardSection[activvDashboardSection]) {
      case dashboardSection.dashboard:
        return Dashboard; //dashboard section
      case dashboardSection.courses:
        return Courses; //course section
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
