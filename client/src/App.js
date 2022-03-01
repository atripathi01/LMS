import Home from "./components/Home/Home";
import {Route,Routes} from 'react-router-dom'
import { DASH_BOARD, HOME_PATH, LOGIN_PATH, REGISTER_PATH } from "./constants/pathContainer";
import Dashboard from "./components/Dashboard/Dashboard";
import UserLogin from "./components/UserLogin/UserLogin";
import Navbar from './components/Navbar/Navbar'


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={HOME_PATH} element={<Home />}></Route>
        <Route path={DASH_BOARD} element={<Dashboard />}></Route>
        <Route path={LOGIN_PATH} element={<UserLogin />}></Route>
        <Route path={REGISTER_PATH} element={<Home />}></Route>
      </Routes>

    </div>
  );
}

export default App;
