import React from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
function StudentSignUp() {
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/loginPage' },
        { label: 'Register', url: '/SignUpPage' },
        { label: 'Contact', url: '/' },
    ];
    const handleSubmit = (data) => {
        //  student sign up success 
    };

    const fields = [
        { name: "fullname", label: "Full Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "department", label: "Department", type: "text" },
        { name: "class", label: "Class", type: "text" },
        { name: "idcard", label: "ID Card", type: "file" },
        { name: "resume", label: "Resume", type: "file" }
    ];

    return (
        <>
       <NavBar links = { links }/>
        <CommonSignUp title="Student SignUp" fields={fields} onSubmit={handleSubmit} />
        </>
    );
}

export default StudentSignUp;
