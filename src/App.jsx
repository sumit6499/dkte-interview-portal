import './App.css';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from "./pages/Login/LoginPage.jsx";
=======
// import StudentLogin from './pages/Login/StudentLogin';
>>>>>>> eaf98b29af8a90749ac5e5890995198e38953d55
import Navbar from './pages/NavBar/NavBar'
import Home from './pages/Home/Home'
import SignUpPage from './pages/SignUp/SignUpPage.jsx';
import StudentLogin from './pages/Login/StudentLogin.jsx';
import AdminLogin from './pages/Login/AdminLogin';
import StudentSignUp from './pages/SignUp/StudentSignUp.jsx';
import AdminSignUp from './pages/SignUp/AdminSignUp.jsx';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/StudentLogin" element={<StudentLogin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/StudentSignUp" element={<StudentSignUp />} />
          <Route path="/AdminSignUp" element={<AdminSignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;