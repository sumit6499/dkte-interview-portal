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
import Loader from '@/components/ui/loading';
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
    const [loading,setLoading] = useState(false);
    const handleSubmit = async (e) => {
        setLoading(true);
        
        e.preventDefault();
        try {
            //  Axios POST    
            const response = await adminLogin(formValues)
            const { id: adminId, name, role, token } = response.data;
            // const { id: adminId, name, role } = data;
            const adminAuthToken = token;
            localStorage.setItem("adminId", adminId);
            localStorage.setItem("adminAuthToken", adminAuthToken);
            console.log("adminId is fro mlocal", localStorage.getItem("adminId"));
            console.log("adminAuthToken is from local", localStorage.getItem("adminAuthToken"));

            if (response.data) {
                console.log("data is",response.data.data)
                dispatch(authenticate(true));
                dispatch(setUserInfo({ user: response.data.data,token, Uid: response.data.data.id, Name: response.data.data.name, Role: response.data.data.role }));
                toast.success("Login successful!");
                navigate('/login/admin/students');
                console.log("stored i guess ")
                

            } else {
                setUserExists(false);
            }

        } catch (error) {
            // if (error.response.data.msg === "User does not exist") {
            //     setUserExists(false)
            // }
            console.error("Error submitting form:", error);
            toast.error("Wrong credentials. Please try again.");

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
            {/* {loading ?(
                <Loader/>
            ) : <LoginForm
                title="Admin Login"
                fields={AdminLoginfields}
                formData={formData}
                onSubmit={handleSubmit}
                handleChange={handleChange}
                formValues={formValues}
                userExists={userExists} />} */}
            <LoginForm
                title="Admin Login"
                fields={AdminLoginfields}
                formData={formData}
                onSubmit={handleSubmit}
                handleChange={handleChange}
                formValues={formValues}
                userExists={userExists}/>
        </>
    );
}

export default AdminLogin;
