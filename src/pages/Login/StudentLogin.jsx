import React, { useState } from 'react';
import LoginForm from '@/components/ui/LoginForm';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { StudentNavlinks, StduentLoginfields } from '@/components/variables/formVariables';
function StudentLogin() {
    const navigate = useNavigate();
    
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

    

    return (
        <>
            <NavBar links={StudentNavlinks} />
            <LoginForm title="Student Login" fields={StduentLoginfields} formData={formData} onSubmit={handleSubmit} />
        </>
    );
}

export default StudentLogin;
