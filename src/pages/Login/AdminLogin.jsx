import React, { useState } from 'react';
import LoginForm from '@/components/ui/LoginForm';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AdminNavLinks, AdminLoginfields } from '@/components/variables/formVariables';
import { adminLogin } from '@/api/index';
import { useDispatch } from "react-redux";
import { authenticate, setUserInfo } from "@/redux/authSlice";
import axios from 'axios';
function AdminLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userExists, setUserExists] = useState(true); // State variable to track user existence

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //  Axios POST    
            const response = await axios.post('https://dkte-interview-portal-api.vercel.app/admin/login', formValues, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { data, token } = response.data;
            const { id: adminId, name, role } = data;
            const adminAuthToken = token;


            localStorage.setItem("adminId", adminId);
            localStorage.setItem("adminAuthToken", adminAuthToken);
            console.log("adminId is fro mlocal", localStorage.getItem("adminId"));
            console.log("adminAuthToken is from local", localStorage.getItem("adminAuthToken"));

            if (response.data) {
                dispatch(authenticate(true));
                dispatch(setUserInfo({ user: data, token, Uid: adminId, Name: name, Role: role }));
                navigate('/login/admin/students');
                console.log("stored i guess ")
            } else {
                setUserExists(false);
            }

        } catch (error) {
            if (error.response.data.msg === "User does not exist") {
                setUserExists(false)
            }
            console.error("Error submitting form:", error);
            //  error
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value });
    };



    return (
        <>
            <NavBar links={AdminNavLinks} />
            <LoginForm
                title="Admin Login"
                fields={AdminLoginfields}
                formData={formData}
                onSubmit={handleSubmit}
                handleChange={handleChange}
                formValues={formValues}
                userExists={userExists} />
        </>
    );
}

export default AdminLogin;
