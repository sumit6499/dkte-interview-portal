import React, { useState } from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { Adminfields, AdminNavLinks } from "@/components/variables/formVariables";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";

function AdminSignUp() {
    const studentSignup = false;
    const navigate = useNavigate()
    const isAdminSignUp = true;
    const [progress,setProgress] = useState({started:false,pc:0});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        dept:'',
        idCard: null  // Initialize idCard as null
    });

    const showToast = (message) => {
        toast.error(message);
    };

    const handleChange = (e) => {
        console.log("hi i  min change")
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };
    const handleRemoveFile = () => {
        setFormData((prevState) => ({
            ...prevState,
            idCard: null  // Set idCard to null to remove the file
        }));
    };

    // const handleFileChange = (e) => {
    //     if (e) {
    //         const { files } = e.target;
    //         setFormData((prevState) => {
    //             console.log("idCard is ", prevState.idCard); // Log the previous value
    //             const updatedState = {
    //                 ...prevState,
    //                 idCard: files[0],
    //             };
    //             console.log("idCard is after", updatedState.idCard); // Log the updated value
    //             return updatedState;
    //         });
    //     } else {
    //         console.error("Event object is undefined");
    //     }
    // };


    const handleSubmit = async (event) => {
        
        event.preventDefault();
       
        console.log("formData",formData)
        try {
            const response = await axios.post(
                "http://localhost:3000/admin/signup",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Success: " + response.data);
            navigate("/login/admin");
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
                handleSubmit={handleSubmit}
                formData={formData}
                handleRemoveFile={handleRemoveFile}
                handleChange={handleChange}
                handleFileChange={handleChange}
            />
        </>
    );
}

export default AdminSignUp;
