import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import {
  DASH_BOARD,
  HOME_PATH,
  LOGIN_PATH,
  PROFILE,
  REGISTER_PATH,
} from "./constants/pathContainer";
import Dashboard from "./components/Dashboard/Dashboard";
import UserLogin from "./components/UserLogin/UserLogin";
import Navbar from "./components/Navbar/Navbar";
import UserRegister from "./components/UserLogin/UserRegister";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  // teacher and student there are two role so these role passes on login and register page for detecting the login and register roles
  const roles = {
    Teacher: "Teacher",
    Student: "Student",
  };
  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={HOME_PATH} element={<Home />}></Route>
        <Route path={DASH_BOARD} element={<Dashboard />}></Route>
        <Route path={LOGIN_PATH} element={<UserLogin roles={roles} />}></Route>
        <Route
          path={REGISTER_PATH}
          element={<UserRegister roles={roles} />}
        ></Route>
        <Route path={PROFILE} element={<UserProfile roles={roles}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
