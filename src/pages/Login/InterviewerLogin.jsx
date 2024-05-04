import React, { useState } from 'react';
import LoginForm from '@/components/ui/LoginForm';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function InterviewerLogin() {
    const navigate = useNavigate();
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Register', url: '/signup' },
        { label: 'Contact', url: '/' },
    ];
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = (data) => {
        //  admin login success 
        toast.success('Login successful');
        navigate("/login/interviewer/interviewerhome")
    };

    const fields = [
        { name: "username", label: "Username", type: "text" },
        { name: "password", label: "Password", type: "password" }
    ];

    return (
        <>
            <NavBar links={links} />
            <LoginForm title="Interviewer Login" fields={fields} formData={formData} onSubmit={handleSubmit} />
        </>
    );
}

export default InterviewerLogin;
