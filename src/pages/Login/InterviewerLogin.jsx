import React, { useState } from 'react';
import LoginForm from '@/components/ui/LoginForm';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { InterviewerNavLinks, InterviewerLoginfields } from '@/components/variables/formVariables';
function InterviewerLogin() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = (data) => {
        //  admin login success 
        toast.success('Login successful');
        navigate("/login/interviewer/interviewerhome")
    };

    

    return (
        <>
            <NavBar links={InterviewerNavLinks} />
            <LoginForm title="Interviewer Login" fields={InterviewerLoginfields} formData={formData} onSubmit={handleSubmit} />
        </>
    );
}

export default InterviewerLogin;
