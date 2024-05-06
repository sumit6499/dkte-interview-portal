import React, { useState } from 'react';
import LoginForm from '@/components/ui/LoginForm';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AdminNavLinks, AdminLoginfields } from '@/components/variables/formVariables';
function AdminLogin() {
    const navigate = useNavigate();
   
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = (data) => {
        //  admin login success 
        toast.success('Login successful');
        navigate("/login/admin/students")
    };

   

    return (
        <>
            <NavBar links={AdminNavLinks} />
            <LoginForm title="Admin Login" fields={AdminLoginfields} formData={formData} onSubmit={handleSubmit} />
        </>
    );
}

export default AdminLogin;
