import React from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { Adminfields, AdminNavLinks } from "@/components/variables/formVariables";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminSignUp() {
    const studentSignup = false;
    const isAdminSignUp = true;
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        Adminfields.reduce((acc, field) => {
            acc[field.name] = field.initialValue || "";
            return acc;
        }, {})
    );
    const showToast = (message) => {
        toast.error(message)
    }
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    // };
    const handleSubmit = async (formData) => {
        //  admin sign up success 
        let response;
        formData.preventDefault();
        const formDataToSend = new FormData();
        console
        Adminfields.forEach((field) => {
            formDataToSend.append(field.name,
                formData[field.name]
            );
            console.log("inside");
        })
        try {
             response = await axios.post("http://localhost:3000/signup",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            // toast.success('Signup Successful!', { position: toast.POSITION.TOP_CENTER });
                console.log(formDataToSend)
        }
        catch (error) {
            console.error("Error submitting form:", error);
            // Error handle
            // Error page
        }
        console.log("success: " + response.data);
        navigate("/login/admin");
    };




    return (
        <>
            <NavBar links={AdminNavLinks} />
            <ToastContainer />
            <CommonSignUp title="Admin SignUp" fields={Adminfields} onSubmit={handleSubmit}
                studentSignup={studentSignup}
                currentStage={1}
                isAdminSignUp={true}
                formData={formData}
                // handleChange={handleChange}
            />
        </>
    );
}

export default AdminSignUp;