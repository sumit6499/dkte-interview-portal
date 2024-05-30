import React, { useState } from 'react';
import LoginForm from '@/components/ui/LoginForm';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { StudentNavlinks, StduentLoginfields } from '@/components/variables/formVariables';
import 'react-toastify/dist/ReactToastify.css';
import { studentLogin } from '@/api/index';
import { useDispatch } from "react-redux";
import { authenticate, setUserInfo } from "@/redux/authSlice";
import axios from 'axios';
function StudentLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userExists, setUserExists] = useState(true);

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

        try {
            const response = await axios.post('http://dkte-interview-portal-api.vercel.app/students/login', formValues, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }); (formValues);
            const { data, token } = response.data;
            const { id: studentId, name, role } = data;

            localStorage.setItem("studentId", studentId);
            localStorage.setItem("stdAuthToken", token);

            if (response.data) {
                dispatch(authenticate(true));
                dispatch(setUserInfo({ user: data, token, Uid: studentId, Name: name, Role: role }));
                navigate('/login/student/profile');
            } else {
                setUserExists(false);
            }
        } catch (error) {
            if (error.response.data.msg === "User does not exist") {
                setUserExists(false)
            }
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            <NavBar links={StudentNavlinks} />
            <LoginForm
                title="Student Login"
                fields={StduentLoginfields}
                formValues={formValues}
                onSubmit={handleSubmit}
                handleChange={handleChange}
                userExists={userExists}
            />
        </>
    );
}

export default StudentLogin;
