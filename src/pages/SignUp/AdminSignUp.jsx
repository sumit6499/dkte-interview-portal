import React, { useState } from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { Adminfields, AdminNavLinks } from "@/components/variables/formVariables";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { adminSignUp } from '@/api/index';
import { useDispatch } from "react-redux";
import { authenticate, setUserInfo } from "@/redux/authSlice";
import Loader from "@/components/ui/loading";
function AdminSignUp() {
    const studentSignup = false;
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false);
    const isAdminSignUp = true;
    const dispatch = useDispatch();
    const [userExists, setUserExists] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        dept: '',
        idCard: null
    });

    const showToast = (message) => {
        toast.error(message);
    };

    const handleChange = (e) => {

        const { name, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };
    const handleRemoveFile = () => {
        setFormData((prevState) => ({
            ...prevState,
            idCard: null
        }));
    };

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        console.log("formData", formData)
        try {
            const response = await adminSignUp(formData)
            const { data, token } = response.data;
            const { id: adminId, name, role } = data;
            const adminAuthToken = token;


            localStorage.setItem("adminId", adminId);
            localStorage.setItem("adminAuthToken", adminAuthToken);

            if (response.data) {
                dispatch(authenticate(true));
                dispatch(setUserInfo({ user: data, token, Uid: adminId, Name: name, Role: role }));
                navigate('/login/admin/');
            } else {
                setUserExists(false);
            }

            console.log("Success: " + response.data);
            toast.success('Signup Successful!', { position: toast.POSITION.TOP_CENTER });
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
            {loading ? (<Loader />) : (<CommonSignUp
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

            />)}
           
        </>
    );
}

export default AdminSignUp;
