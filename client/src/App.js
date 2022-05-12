import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import {
  ADMIN,
  ADMIN_LOGIN,
  CALENDER,
  COURSE_CATE,
  COURSE_DETAIL,
  COURSE_SUBCATE_DETAIL,
  DASH_BOARD,
  HOME_PATH,
  LOGIN_PATH,
  PROFILE,
  REGISTER_PATH,
  UPLOAD_COURSES,
  COURSE_DETAILS
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
import dashImg from './components/images/dash1.png';
import courseImg from './components/images/course-1.png';
import helpImg from './components/images/help.png';
import Assess from './components/images/asses.png';
import CalendarPage from './components/Dashboard/calender/Calendar';
import CategoryDetail from './components/Dashboard/categoryDetail/CategoryDetail'
import SubCateDetail from './components/Dashboard/categoryDetail/subCateDetail/SubCateDetail';
import Courses from './components/Dashboard/categoryDetail/courseDetail/Courses';
import CalendarImg from './components/images/calendar.png'


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
        <p className={classes.fontSiz}>Dashboard</p>{' '}
      </div>
    ),
    courses: (
      <div className={classes.NavIcon}>
        <img className={classes.imgFix} src={courseImg} alt='dashboardNavItem'></img>
        <p className={classes.fontSiz}>Courses</p>{' '}
      </div>
    ),
    assessment: (
      <div className={classes.NavIcon}>
        <img className={classes.imgFix} src={Assess} alt='dashboardNavItem'></img>
        <p className={classes.fontSiz}>Assess.</p>{' '}
      </div>
    ),
    calendar: (
      <div className={classes.NavIcon}>
        <img className={classes.imgFix} src={CalendarImg} alt='dashboardNavItem'></img>
        <p className={classes.fontSiz}>Calendar</p>{' '}
      </div>
    ),
    helpNsupport: (
      <div className={classes.NavIcon}>
        <img className={classes.imgFix} src={helpImg} alt='dashboardNavItem'></img>
        <p className={classes.fontSiz}>Help And Support</p>{' '}
      </div>
    ),
  };

  return (
    <div className={classes.backgroundColor}>
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
        {/* <Route path={COURSE_DETAIL} element={<CourseDetail />}></Route> */}
        <Route path={UPLOAD_COURSES} element={<UploadCourse />}></Route>
        <Route path={ADMIN} element={<Admin />}></Route>
        <Route path={CALENDER} element={<CalendarPage />}></Route>
        <Route path={COURSE_CATE} element={<CategoryDetail />}></Route>
        <Route path={COURSE_SUBCATE_DETAIL} element={<SubCateDetail />}></Route>
        <Route path={COURSE_DETAILS} element={<Courses />}></Route>
      </Routes>
    </div>
  );
}

export default App;
