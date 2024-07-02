import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, } from 'react-router-dom';
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
import Loader from './components/ui/loading';
import { useEffect } from 'react';
import PrivateRoute from './components/services/private';
import CustomAlert from './components/ui/CustomAlert';
import PhoneOtpLogin from './components/ui/PhoneOtpLogin';
// const PrivateRoute = ({ element }) => {
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       console.log("login karo");
//       navigate('/login');
//     }
//   }, [isAuthenticated, navigate]);

//   return isAuthenticated ? element : null;
// };
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
        <Route path="/CustomAlert" element={<CustomAlert />} />

        <Route path="/login/admin/students" element={<PrivateRoute element={<StudentsList />} allowedRoles={['Admin']} />} />
        <Route path="/login/admin/adminschedules" element={<PrivateRoute element={<AdminSchedules />} allowedRoles={['Admin']} />} />
        <Route path="/login/admin/interviewschedules" element={<PrivateRoute element={<AdminInterviewSchedule />} allowedRoles={['Admin']} />} />

        <Route path="/login/student/studenthome" element={<PrivateRoute element={<StudentHome />} allowedRoles={['Student']} />} />
        <Route path="/login/student/profile" element={<PrivateRoute element={<UserProfile />} allowedRoles={['Student']} />} />
        <Route path="/login/student/dashboard" element={<PrivateRoute element={<StudentDashboard />} allowedRoles={['Student']} />} />

        <Route path="/signup/interviewer" element={<InterviewerSignUp />} />
        <Route path="/Schedule" element={<PrivateRoute element={<Schedule />} allowedRoles={['Admin', 'Student', 'Interviewer']} />} />
        <Route path="/login/interviewer" element={<InterviewerLogin />} />
        <Route path="/login/interviewer/schedules" element={<PrivateRoute element={<InterviewerIntervieweSchedules />} allowedRoles={['Interviewer']} />} />
        <Route path="/login/interviewer/profile" element={<PrivateRoute element={<InterviwerPorfile />} allowedRoles={['Interviewer']} />} />
        <Route path="/eval" element={<PrivateRoute element={<StudentEvaluationForm />} allowedRoles={['Admin', 'Interviewer']} />} />
        <Route path="/FormBase64" element={<PrivateRoute element={<FormBase64 />} allowedRoles={['Admin']} />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/load" element={<Loader />} />
        <Route path="/otp" element={<PhoneOtpLogin />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}



export default App;
