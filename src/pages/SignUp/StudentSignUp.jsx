import React, { useState } from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router";
import axios from "axios";
import { stdAllFields, stdFieldsStage1, stdFieldsStage2, StudentNavlinks } from '@/components/variables/formVariables.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { authenticate, setUserInfo } from "@/redux/authSlice";

function StudentSignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const showToast = (message) => {
        toast.error(message);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (stage === 1) {
            setStage(2);
        } else if (stage === 2) {
            try {
                const response = await axios.post('https://dkte-interview-portal-api.vercel.app/students/signup', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const { data, token } = response.data;
                const { id: studentId, name, role, PRN, dept } = data;
                const stdAuthToken = token;

                localStorage.setItem("studentId", studentId);
                localStorage.setItem("stdAuthToken", stdAuthToken);

                if (response.data) {
                    const userData = { user: data, token: stdAuthToken, Uid: studentId, Name: name, Role: role, Dept: dept, PRN: PRN };
                    dispatch(authenticate(true));
                    dispatch(setUserInfo(userData));
                    toast.success('Signup Successful!', { position: toast.POSITION.TOP_CENTER });
                    navigate("/login/student");
                }
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

    const handleRemoveFile = (fieldName) => {
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData };
            delete updatedFormData[fieldName];
            return updatedFormData;
        });
    };

    return (
        <>
            <NavBar links={StudentNavlinks} />
            <ToastContainer />
            <CommonSignUp
                title="Student SignUp"
                fields={stage === 1 ? stdFieldsStage1 : stdFieldsStage2}
                onSubmit={handleSubmit}
                className="pt-20"
                currentStage={stage}
                onPrev={() => setStage(stage - 1)}
                studentSignup={true}
                IsInterviwerSignUp={false}
                handleChange={handleChange}
                handleFileChange={handleChange}
                formData={formData}
                handleNext={handleNext}
                handlePrev={handlePrev}
                handleRemoveFile={handleRemoveFile}
            />
        </>
    );
}

export default StudentSignUp;
