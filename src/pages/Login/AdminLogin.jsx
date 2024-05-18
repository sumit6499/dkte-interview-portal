import React, { useState } from 'react';
import LoginForm from '@/components/ui/LoginForm';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AdminNavLinks, AdminLoginfields } from '@/components/variables/formVariables';
function AdminLogin() {
    const navigate = useNavigate();
    const [userExists, setUserExists] = useState(true); // State variable to track user existence

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [formValues, setFormValues] = useState(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //  Axios POST    
            const response = await axios.post("http://localhost:5000/login", formValues);
            console.log("Response from server:", response.data);
            if (response.data.userExists) {
                setUserExists(true);
                //  success
                console.log("Form values:", formValues);
                // toast.success('Login successful');
                // onSubmit(response.data);
            } else {
                setUserExists(false);
            }
        } catch (error) {
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
