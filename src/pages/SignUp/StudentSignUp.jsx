import React from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router";
function StudentSignUp() {

    const navigate = useNavigate();
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Register', url: '/signup' },
        { label: 'Contact', url: '/' },
    ];
    const handleSubmit = (data) => {
        //  student sign up success 
        navigate('/StudentHome');
    };
    const departmentOptions = [
        "CSE",
        "AI",
        "AIDS",
        "ENTC",
        "MECH",
        "ELECTRIC",
        "CIVIL",
    ]

    const fields = [
        { name: "name", label: "Full Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
        {
            name:"dept",
            label:"Department",
            type:"select",
            options:departmentOptions
        },
        { name: "class", label: "Class", type: "text" },
        { name: "PRN", label: "PRN", type: "text" },
        { name: "password", label: "Password", type: "text" },
        { name: "idcard", label: "ID Card", type: "file" },
        { name: "resume", label: "Resume", type: "file" }
    ];
    
    return (
        <>
       <NavBar links = { links }/>
        <CommonSignUp title="Student SignUp" fields={fields} onSubmit={handleSubmit} className="pt-20" />
        </>
    );
}

export default StudentSignUp;
