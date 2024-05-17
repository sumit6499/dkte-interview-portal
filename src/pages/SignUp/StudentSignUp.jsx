import React, { useState } from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router";
import axios from "axios";
import { stdFieldsStage1, stdFieldsStage2, StudentNavlinks, stdAllFields } from '@/components/variables/formVariables.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentSignUp() {
    const initialFormData = stdAllFields.reduce((acc, field) => {
        acc[field.name] = field.type === 'file' ? null : '';
        return acc;
    }, {});
    const [stage, setStage] = useState(1);
    const [formData, setFormData] = useState(stdAllFields.reduce((acc, field) => {
        acc[field.name] = field.initialValue || "";
        return acc;
    }, {}));
    const [fileData, setFileData] = useState({});
    const [allformData,setAllformData] = useState({});
    const navigate = useNavigate();

    const studentSignup = true;
    const IsInterviwerSignUp = false;

    const showToast = (message) => {
        toast.error(message);
    };
    const handleRemoveFile = (fieldName) => {
        setFileData((prevState) => {
            const updatedFileData = { ...prevState };
            delete updatedFileData[fieldName];
            return updatedFileData;
        });
    };
    const handleFileChange = (e) => {
        if (e) {
            const { name, files } = e.target;
            setFileData((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        } else {
           
            setFileData((prevState) => ({
                ...prevState,
                [name]: null, // or any other appropriate action
            }));
        }
    };

    const handleSubmit = async (event) => {
    event.preventDefault();

    if (stage === 1) {
        setStage(2);
    } else if (stage === 2) {
        const formDataToSend = new FormData();
      
        stdAllFields.forEach((field) => {
            
            formDataToSend.append(field.name, formData[field.name] || ''); 
        });
    
       
        Object.values(fileData).forEach((file) => {
            
            formDataToSend.append("fieldName", file, file.name) 
        });
        

      
        try {
            const response = await axios.post(
                "http://localhost:3000/students/signUp",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Response from server:", response.data);
            toast.success('Signup Successful!', { position: toast.POSITION.TOP_CENTER });
            navigate("/login/student");
        } catch (error) {
            console.error("Error submitting form:", error);
            showToast("Error submitting form. Please try again.");
        }
    }
};


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleNext = ()=>{
        setStage(2);
    }
    const handlePrev = () => {
        setStage(1);
    }

    return (
        <>
            <NavBar links={StudentNavlinks} />
            <ToastContainer />
            <CommonSignUp
                title={"Student SignUp"}
                fields={stage === 1 ? stdFieldsStage1 : stdFieldsStage2}
                onSubmit={handleSubmit}
                className="pt-20"
                currentStage={stage}
                onPrev={() => setStage(stage - 1)}
                studentSignup={studentSignup}
                IsInterviwerSignUp={IsInterviwerSignUp}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                formData={formData}
                fileData={fileData}
                handleNext={handleNext}
                handlePrev={handlePrev}
                handleRemoveFile={handleRemoveFile}
            />
        </>
    );
}

export default StudentSignUp;
