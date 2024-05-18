import React, { useState } from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router";
import axios from "axios";
import {stdAllFields, stdFieldsStage1, stdFieldsStage2, StudentNavlinks } from '@/components/variables/formVariables.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {studentSignUp} from '@/api/index'

function StudentSignUp() {
    const [stage, setStage] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        dept: '',
        class: '',
        PRN: '',
        UPI: '',
        idCard: null,
        resume: null,
        paymentImage: null
    });
    const navigate = useNavigate();

    const studentSignup = true;
    const IsInterviwerSignUp = false;





    const showToast = (message) => {
        toast.error(message);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (stage === 1) {
            console.log(formData)
            setStage(2);
        } else if (stage === 2) {
            // Validation for stage 2
            // Proceed to stage 3


            
            event.preventDefault();
            const formDataToSend = new FormData();

            // stdAllFields.forEach((field) => {
            //     formDataToSend.append(field.name, formData[field.name] || '');
            // });

            // Append file data to formDataToSend
            // formDataToSend.append("idCard", formData.idCard);
            // formDataToSend.append("resume", formData.resume);
            // formDataToSend.append("paymentImage", formData.paymentImage);

            // console.log(formDataToSend)

            console.log(formData)


            try {
                const response = await axios.post(
                    "http://localhost:3000/students/signUp",
                    formData,
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
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    const handleNext = () => {
        setStage(2);
    };

    const handlePrev = () => {
        setStage(1);
    };

    return (
        <>
            <NavBar links={StudentNavlinks} />
            <ToastContainer />
            {/* <form action="students/signUp" method="post" encType="multipart/form-data"> */}
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
                handleFileChange={handleChange}
                formData={formData}
                handleNext={handleNext}
                handlePrev={handlePrev}
            />
            {/* </form> */}
        </>
    );
}

export default StudentSignUp;
