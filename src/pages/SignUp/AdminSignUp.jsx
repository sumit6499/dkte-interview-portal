import React, { useState } from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { Adminfields, AdminNavLinks } from "@/components/variables/formVariables";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminSignUp() {
    const studentSignup = false;
    const isAdminSignUp = true;
    const [progress,setProgress] = useState({started:false,pc:0});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        idCard: null  // Initialize idCard as null
    });

    const showToast = (message) => {
        toast.error(message);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRemoveFile = () => {
        setFormData((prevState) => ({
            ...prevState,
            idCard: null  // Set idCard to null to remove the file
        }));
    };

    const handleFileChange = (e) => {
        if (e) {
            const { files } = e.target;
            setFormData((prevState) => ({
                ...prevState,
                idCard: files[0],  // Store the file directly in formData
            }));
        } else {
            console.error("Event object is undefined");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('idCard', formData.idCard);
        formDataToSend.append('phone', formData.phone);
        
        try {
            const response = await axios.post(
                "http://localhost:3000/admin/signup",
                formDataToSend,
                {
                    onUploadProgress: (progressEvent) => {
                        console.log(progressEvent.loaded / progressEvent.total * 100);
                    },
                }
            );
            console.log("Success: " + response.data);
            // navigate("/login/admin");
        } 
        
        catch (error) {
            console.error("Error submitting form:", error);
            // Handle error
        }
    };

    return (
        <>
            <NavBar links={AdminNavLinks} />
            <ToastContainer />
            <CommonSignUp
                title="Admin SignUp"
                fields={Adminfields}
                onSubmit={handleSubmit}
                studentSignup={studentSignup}
                currentStage={1}
                isAdminSignUp={true}
                formData={formData}
                handleRemoveFile={handleRemoveFile}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
            />
        </>
    );
}

export default AdminSignUp;
