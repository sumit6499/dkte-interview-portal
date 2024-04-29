import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from "./pages/Login/LoginPage.jsx";

// import StudentLogin from './pages/Login/StudentLogin';

import Navbar from './pages/NavBar/NavBar'
import Home from './pages/Home/Home'
import SignUpPage from './pages/SignUp/SignUpPage.jsx';
import StudentLogin from './pages/Login/StudentLogin.jsx';
import AdminLogin from './pages/Login/AdminLogin';
import StudentSignUp from './pages/SignUp/StudentSignUp.jsx';
import AdminSignUp from './pages/SignUp/AdminSignUp.jsx';
import Students from './pages/Students/Students';

import InterviewSchedule from './pages/InterviewSchedule/InterviewSchedule';
function App() {
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/StudentLogin" element={<StudentLogin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/StudentSignUp" element={<StudentSignUp />} />
          <Route path="/AdminSignUp" element={<AdminSignUp />} />
          <Route path="/Students" element={<Students />} />
          <Route path="/InterviewSchedule" element={<InterviewSchedule />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;