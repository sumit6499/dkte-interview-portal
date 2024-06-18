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
import Loader from '@/components/ui/loading';
import { toast } from 'react-toastify';
function StudentLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userExists, setUserExists] = useState(true);
const [loading,setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log("The form is ",formValues)
        try {
            const response = await studentLogin(formValues)
            const { data, token } = response.data;
            const { id: studentId, name, role } = data;
            localStorage.setItem("studentId", studentId);
            localStorage.setItem("stdAuthToken", token);

            if (response.data) {
                dispatch(authenticate(true));
                dispatch(setUserInfo({ user: data, token, Uid: studentId, Name: name, Role: role }));
                navigate('/login/student/studentHome');
            } else {
                setUserExists(false);
            }
        } catch (error) {
            if (error.response.data.msg) {
                setUserExists(false)
                setLoading(false)
                toast.error(error.response.data.msg)
            }
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            <NavBar links={StudentNavlinks} />
            {loading ? (<Loader />) : (<LoginForm
                title="Student Login"
                fields={StduentLoginfields}
                formValues={formValues}
                onSubmit={handleSubmit}
                handleChange={handleChange}
                userExists={userExists}
            />)}
            
        </>
    );
}

export default StudentLogin;
