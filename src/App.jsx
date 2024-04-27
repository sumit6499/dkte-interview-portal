import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentLogin from './components/Login/StudentLogin.jsx';

function App() {
  return (
    <>
      <div>
        <p className='border border-black'>Welcome to the portal</p>
        
            {/* Correct syntax for defining a route */}
            <StudentLogin />
         
      </div>
    </>
  );
}

export default App;
