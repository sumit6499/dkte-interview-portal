import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { interviewComposition, NotVisibleEye, visibleEye } from '@/assets/';

function LoginForm({ title, fields, formData, onSubmit }) {
    // Use state to manage form data
    const [formValues, setFormValues] = useState(formData);
    const [showPassword, setShowPassword] = useState(false);
    const [userExists, setUserExists] = useState(true); // State variable to track user existence
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    //  form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update formValues state to reflect the changes
        setFormValues({ ...formValues, [name]: value });
    };

    // toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //  form submission
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
                toast.success('Login successful');
                onSubmit(response.data);
            } else {
                setUserExists(false);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            //  error
        }
    };

    // handle forgot password submission
    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        // Implement forgot password logic here
        console.log("Forgot Password email submitted:", forgotPasswordEmail);
        setShowForgotPassword(false);
        toast.success('Password reset instructions sent to your email');
    };

    return (
        <div>
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="flex justify-center items-center h-screen animate-slideFromBottom flex-col pt-40 space-y-10">
                <div className="bg-zinc-800 p-8 rounded-lg w-96">
                    <h2 className="text-white text-2xl mb-6 border-b border-zinc-600 pb-2 flex justify-center" id="title">{title}</h2>
                    <form onSubmit={handleSubmit}>
                        {fields.map(field => (
                            <div key={field.name} className="mb-4 text-center">
                                <label htmlFor={field.name} className="block text-white mb-2">{field.label}:</label>
                                <div className="relative">
                                    <input
                                        type={field.name === 'password' && !showPassword ? 'password' : 'text'}
                                        id={field.name}
                                        name={field.name}
                                        value={formValues[field.name]}
                                        onChange={handleChange}
                                        className="input-field font-bold p-1 focus:border-yellow-500 focus:ring-yellow-500 text-black"
                                        required
                                    />
                                    {field.name === 'password' && (
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <img src={visibleEye} alt="Hide Password" className="h-6 w-6" />
                                            ) : (
                                                <img src={NotVisibleEye} alt="Show Password" className="h-6 w-6" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {!userExists && (
                            <div className="text-red-500 text-center">User does not exist</div>
                        )}
                        <div className="flex justify-center">
                            <button type="submit" className="w-30 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Login
                            </button>
                            <button
                                type="button"
                                className="ml-2 text-sm text-yellow-500 hover:text-yellow-600 focus:outline-none"
                                onClick={() => setShowForgotPassword(true)}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </form>
                    {showForgotPassword && (
                        <form onSubmit={handleForgotPasswordSubmit}>
                            <div className="mt-4 text-center">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={forgotPasswordEmail}
                                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                    className="input-field font-bold p-1 focus:border-yellow-500 focus:ring-yellow-500 text-black"
                                    required
                                />
                            </div>
                            <div className="flex justify-center mt-4">
                                <button
                                    type="submit"
                                    className="w-30 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                <img src={interviewComposition} alt="" />
            </div>
        </div>
    );
}

export default LoginForm;
