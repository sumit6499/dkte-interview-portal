import React, { useState } from 'react';
import LoginForm from '@/components/ui/LoginForm';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import { StudentNavlinks, StduentLoginfields } from '@/components/variables/formVariables';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '@/redux/authSlice';
function StudentLogin() {

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
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value });
    };

    // toggle password visibility


    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // formData.email;
        // formValues.password = "sfdlgnsdfgj"
        // let userCredentials = {
        //     formValues.email, formValues.password
        // }
        // dispatch(loginUser(userCredentials))
        try {
            //  Axios POST    
            const response = await axios.post("http://localhost:3000/students/login", formValues);
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





    return (
        <>
            <NavBar links={StudentNavlinks} />
            <LoginForm
                title="Student Login"
                fields={StduentLoginfields}
                formData={formData}
                formValues={formValues}
                onSubmit={handleSubmit}
                handleChange={handleChange}
                userExists={userExists}
            />
        </>
    );
}

export default StudentLogin;
