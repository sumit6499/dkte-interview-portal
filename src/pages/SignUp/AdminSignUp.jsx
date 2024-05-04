import React from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router";
function AdminSignUp() {
    const studentSignup = false;
const navigate = useNavigate();
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Register', url: '/signup' },
        { label: 'Contact', url: '/' },
    ];
    const handleSubmit = (data) => {
        //  admin sign up success 
        console.log("success: "+data);
        navigate("/login/admin");
    };

    const fields = [
        { name: "name", label: "Full Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "password", label: "Password", type: "text" },
        { name: "idcard", label: "ID Card", type: "file" }
    ];

    return (
        <>
        <NavBar links={links} />
        <CommonSignUp title="Admin SignUp" fields={fields} onSubmit={handleSubmit} 
                studentSignup={studentSignup}
                currentStage={1}/>
        </>
    );
}

export default AdminSignUp;