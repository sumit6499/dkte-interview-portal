import React, { useState } from 'react';
import LoginForm from '@/components/ui/LoginForm';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
    const navigate = useNavigate();
    const links=[
        {label:'Home',url:'/'},
        {label:'Login',url:'/login'},
        {label:'Register',url:'/signup'},
        {label:'Contact',url:'/'},
    ]
    const [formData, setFormData] = useState({
        // prn: "",
        username: "",
        password: ""
    });

    const handleSubmit = (data) => {
        //  student login success
        navigate("/StudentHome")
    };

    // const fields = [
    //     { name: "prn", label: "PRN No.", type: "text" },
    //     { name: "password", label: "Password", type: "password" }
    // ];

    const fields = [
        { name: "username", label: "Username", type: "text" },
        { name: "password", label: "Password", type: "password" }
    ];

    return (
        <>
        <NavBar links={links} />
        <LoginForm title="Student Login" fields={fields} formData={formData} onSubmit={handleSubmit} />
        </>
    );
}

export default StudentLogin;
