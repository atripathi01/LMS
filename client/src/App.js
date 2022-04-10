import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import {
  ADMIN,
  ADMIN_LOGIN,
  COURSE_DETAIL,
  DASH_BOARD,
  HOME_PATH,
  LOGIN_PATH,
  PROFILE,
  REGISTER_PATH,
  UPLOAD_COURSES,
} from './constants/pathContainer';
import Dashboard from './components/Dashboard/Dashboard';
import UserLogin from './components/UserLogin/UserLogin';
import Navbar from './components/Navbar/Navbar';
import UserRegister from './components/UserLogin/UserRegister';
import UserProfile from './components/UserProfile/UserProfile';
import CourseDetail from './components/Dashboard/courseDatail/courseDetail';
import UploadCourse from './components/Dashboard/uploadCourses/UploadCourse';
import Admin from './components/admin/Admin';
import AdminLogin from './components/UserLogin/AdminLogin';
import classes from './app.module.css';
import dashImg from './components/images/dashboar.png';
import courseImg from './components/images/course2.png';
import helpImg from './components/images/help.png';

function App() {
  // created role object
  const roles = {
    Teacher: 'Teacher',
    Student: 'Student',
  };

  // created dashboard nav items objects
  const dashboardSection = {
    dashboard: (
      <div className={classes.NavIcon}>
        <img className={classes.imgFix} src={dashImg} alt='dashboardNavItem'></img>
        <p className={classes.fontSiz}>DASHBOARD</p>{' '}
      </div>
    ),
    courses: (
      <div className={classes.NavIcon}>
        <img className={classes.imgFix} src={courseImg} alt='dashboardNavItem'></img>
        <p className={classes.fontSiz}>COURSES</p>{' '}
      </div>
    ),
    helpNsupport: (
      <div className={classes.NavIcon}>
        <img className={classes.imgFix} src={helpImg} alt='dashboardNavItem'></img>
        <p className={classes.fontSiz}>HELP AND SUPPORT</p>{' '}
      </div>
    ),
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={HOME_PATH} element={<Home />}></Route>
        <Route path={LOGIN_PATH} element={<UserLogin roles={roles} />}></Route>
        <Route path={ADMIN_LOGIN} element={<AdminLogin />}></Route>
        <Route
          path={DASH_BOARD}
          element={<Dashboard dashboardSection={dashboardSection} />}
        ></Route>
        <Route
          path={REGISTER_PATH}
          element={<UserRegister roles={roles} />}
        ></Route>
        <Route path={PROFILE} element={<UserProfile roles={roles} />}></Route>
        <Route path={COURSE_DETAIL} element={<CourseDetail />}></Route>
        <Route path={UPLOAD_COURSES} element={<UploadCourse />}></Route>
        <Route path={ADMIN} element={<Admin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
