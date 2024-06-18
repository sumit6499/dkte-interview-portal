import React, { useState } from 'react';
import LoginForm from '@/components/ui/LoginForm';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { InterviewerNavLinks, InterviewerLoginfields } from '@/components/variables/formVariables';
import { interviewerLogin } from '@/api/index';
import { useDispatch } from "react-redux";
import { authenticate, setUserInfo } from "@/redux/authSlice";
import Loader from '@/components/ui/loading';
function InterviewerLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [userExists, setUserExists] = useState(true); 
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            //  Axios POST    
            const response = await interviewerLogin(formValues); 
            const { data, token } = response.data;
            const { id: interviewerId, name, role, freeday, startTime, endTime } = data;
            const interviewerAuthToken = token;

           
            localStorage.setItem("interviewerId", interviewerId);
            localStorage.setItem("interviewerAuthToken", interviewerAuthToken);
            if (response.data) {
                dispatch(authenticate(true));
                dispatch(setUserInfo({ user: data, token, Uid: interviewerId, Name: name, Role: role, Day: freeday, StartTime: startTime, EndTime: endTime }));
                setUserExists(true);

                navigate('/login/interviewer/schedules');
            } else {
                setUserExists(false);
            }
           
        } catch (error) {
            if (error.response.data.msg)
                {
                setUserExists(false);
                }

            
            setLoading(false);

            console.error("Error submitting form:", error.response.data.msg);
            //  error
        }
    };



    return (
        <>
            <NavBar links={InterviewerNavLinks} />
            {(loading && userExists) ? (<Loader />) : (<LoginForm
                title="Interviewer Login"
                fields={InterviewerLoginfields}
                formData={formData}
                formValues={formValues}
                onSubmit={handleSubmit}
                handleChange={handleChange}
                userExists={userExists}
            />)}
            
        </>
    );
}

export default InterviewerLogin;
