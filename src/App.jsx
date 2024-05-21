import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate,  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from "./pages/Login/LoginPage.jsx";
import Home from './pages/Home/Home';
import SignUpPage from './pages/SignUp/SignUpPage.jsx';
import StudentLogin from './pages/Login/StudentLogin.jsx';
import AdminLogin from './pages/Login/AdminLogin';
import AdminSchedules from './pages/AdminPages/AdminSchedules';
import StudentSignUp from './pages/SignUp/StudentSignUp.jsx';
import AdminSignUp from './pages/SignUp/AdminSignUp.jsx';
import StudentsList from './pages/AdminPages/StudentsList';
import AdminInterviewSchedule from './pages/AdminPages/InterviewSchedule';
import StudentHome from './pages/StudentPages/StudentHome';
import UserProfile from './pages/StudentPages/UserProfile';
import StudentDashboard from './pages/StudentPages/StudentDashboard';
import InterviewerSignUp from './pages/SignUp/InterviewerSignUp';
import InterviewerLogin from './pages/Login/InterviewerLogin';
import InterviewerIntervieweSchedules from './pages/InterviewerPages/InterviewSchedules';
import Schedule from './components/ui/Schedules';
import InterviwerPorfile from './pages/InterviewerPages/interviewerProfile';
import ErrorPage from './components/ui/error';
import StudentEvaluationForm from './pages/Screen/EvaluationForm';
import FormBase64 from './components/ui/form64';
import AllUsers from './components/Allusers';
import { useEffect } from 'react';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("login karo");
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? element : null;
};
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/signup/student" element={<StudentSignUp />} />
        <Route path="/signup/admin" element={<AdminSignUp />} />

        <Route path="/login/admin/students" element={<StudentsList />}  />
        <Route path="/login/admin/adminschedules" element={<PrivateRoute element={<AdminSchedules />} />} />
        <Route path="/login/admin/interviewschedules" element={<PrivateRoute element={<AdminInterviewSchedule />} />} />

        <Route path="/login/student/studenthome" element={<PrivateRoute element={<StudentHome />} />} />
        <Route path="/login/student/profile" element={<PrivateRoute element={<UserProfile />} />} />
        <Route path="/login/student/dashboard" element={<PrivateRoute element={<StudentDashboard />} />} />
        
        <Route path="/signup/interviewer" element={<InterviewerSignUp />} />
        <Route path="/Schedule" element={<PrivateRoute element={<Schedule />} />} />
        <Route path="/login/interviewer" element={<InterviewerLogin />} />
        <Route path="/login/interviewer/schedules" element={<PrivateRoute element={<InterviewerIntervieweSchedules />} />} />
        <Route path="/login/interviewer/profile" element={<PrivateRoute element={<InterviwerPorfile />} />} />
        <Route path="/eval" element={<PrivateRoute element={<StudentEvaluationForm />} />} />
        <Route path="/FormBase64" element={<PrivateRoute element={<FormBase64 />} />} />
        <Route path="/all-users" element={<AllUsers />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
