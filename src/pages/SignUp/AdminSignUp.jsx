import React from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
function AdminSignUp() {
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Register', url: '/signup' },
        { label: 'Contact', url: '/' },
    ];
    const handleSubmit1 = (data) => {
        //  admin sign up success 
        console.log("success: "+data);
    };

    const fields = [
        { name: "fullname", label: "Full Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
        { name: "password", label: "Password", type: "text" },
        { name: "idcard", label: "ID Card", type: "file" }
    ];

    return (
        <>
        <NavBar links={links} />
        <CommonSignUp title="Admin SignUp" fields={fields} onSubmit={handleSubmit1} />
        </>
    );
}

export default AdminSignUp;