import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { interviewComposition, NotVisibleEye, visibleEye } from '@/assets/';
import { useNavigate } from 'react-router';
function LoginForm({ title, fields, formData, formValues, onSubmit, handleChange, userExists }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();

        console.log("Forgot Password email submitted:", forgotPasswordEmail);
        setShowForgotPassword(false);
        toast.success('Password reset instructions sent to your email');
    };

    return (
        <div>
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="flex justify-center items-center h-screen animate-slideFromBottom flex-col pt-6 space-y-10">
                <div className="bg-zinc-800 p-8 rounded-lg w-96 pt-6">
                    <h2 className="text-white text-2xl mb-6 border-b border-zinc-600 pb-2 flex justify-center" id="title">{title}</h2>
                    <form onSubmit={onSubmit} className="">
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
                        <div className='flex justify-center pt-6'>
                            <button
                                type="button"
                                className="ml-2 text-lg text-yellow-500 hover:text-yellow-600 focus:outline-none"
                                onClick={() => navigate('/signup')}
                            >
                                Register
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

            </div>
            <img src={interviewComposition} alt="" />
        </div>
    );
}

export default LoginForm;
