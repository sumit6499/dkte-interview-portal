import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentLogin from './pages/Login/StudentLogin';
import Navbar from './pages/NavBar/NavBar'
import Home from './pages/Home/Home'

function App() {
  return (
    <>
      <div>
        <Navbar/>
        {/* <NavBar/>
        <p className='border border-black'>Welcome to the portal</p> */}
        
            {/* Correct syntax for defining a route */}
            {/* <StudentLogin />  */}
            <Home/>
         
      </div>
    </>
  );
}

export default App;
