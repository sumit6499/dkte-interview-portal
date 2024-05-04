import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import LoginPage from "./pages/Login/LoginPage.jsx";
import Navbar from './pages/NavBar/NavBar'
import Home from './pages/Home/Home'
import SignUpPage from './pages/SignUp/SignUpPage.jsx';
import StudentLogin from './pages/Login/StudentLogin.jsx';
import AdminLogin from './pages/Login/AdminLogin';
import StudentSignUp from './pages/SignUp/StudentSignUp.jsx';
import AdminSignUp from './pages/SignUp/AdminSignUp.jsx';
import Students from './pages/AdminPages/Students';

import InterviewSchedule from './pages/AdminPages/InterviewSchedule';
import StudentHome from './pages/StudentPages/StudentHome';
import UserProfile from './pages/StudentPages/UserProfile';
import StudentDashboard from './pages/StudentPages/StudentDashboard';
import InterviewerSignUp from './pages/SignUp/InterviewerSignUp';
import Schedule from './components/ui/Schedules';
function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/signup/student" element={<StudentSignUp />} />
          <Route path="/signup/admin" element={<AdminSignUp />} />
          <Route path="/login/admin/students" element={<Students />} />
          <Route path="/login/admin/interviewschedules" element={<InterviewSchedule />} />
          <Route path="/StudentHome" element={<StudentHome />} />
          <Route path="/login/student/profile" element={<UserProfile />} />
          <Route path="/login/student/dashboard" element={<StudentDashboard />} />
          <Route path="/signup/interviewer" element={<InterviewerSignUp />} />
          <Route path="/Schedule" element={<Schedule />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;