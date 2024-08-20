import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OtpInput from './otpInput';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '@/pages/NavBar/NavBar';
import { LoginNavlinks } from '../variables/formVariables';


import axios from 'axios';
import ResetPassword from './ResetPassword';
import { BASE_URL } from '@/api';
const ForgotPassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
   
    const navigate = useNavigate();

    const location = useLocation();

    const role = location.state&& location.state.role;
    
    useEffect(()=>{
        
    })
    const handleSendOtp = async  (e) => {
        console.log("The rorle is ",role);
        e.preventDefault();
        const response = await fetch(`${BASE_URL}/${role}/signup-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            setOtpSent(true);
            toast.success('OTP sent to your email');
        } else {
            toast.error('Failed to send OTP. Please try again.');
        }
        // setOtpSent(true);
        // toast.success('OTP sent to your email');
    };

    const handleOtpSubmit = async(submittedOtp) => {
        // Logic to verify OTP
        console.log("hi i min submti ")
        const response = await fetch(`${BASE_URL}/${role}/validate-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
        });

        if (response.ok) {
            setOtpVerified(true);
            toast.success('OTP verified. You can now reset your password.');
            navigate('/reset-password'); // Navigate to reset password page
        } else {
            toast.error('Invalid OTP. Please try again.');
        }


        if (submittedOtp === otp) { // Replace with actual OTP verification logic
            setOtpVerified(true);
            toast.success('OTP verified, you can now reset your password');
        } else {
            toast.error('Invalid OTP, please try again');
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        // Logic to reset the password
        toast.success('Password reset successful, redirecting to login');
        navigate('/login');
    };

    return (
        <>
      <NavBar links={LoginNavlinks}/>
        <div className="flex justify-center items-center h-screen bg-white-400">
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="bg-gray-800 p-8 rounded-lg w-96">
                {!otpSent && !otpVerified && (
                    <form onSubmit={handleSendOtp}>
                        <h2 className="text-white text-2xl mb-6 border-b border-gray-600 pb-2 text-center">
                            Forgot Password
                        </h2>
                        <label htmlFor="email" className="block text-white text-lg font-semibold mb-2">
                            Enter your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field w-full p-2 mb-4 text-black rounded"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Send OTP
                        </button>
                    </form>
                )}

                {otpSent && !otpVerified && (
                    <>
                        <h2 className="text-white text-2xl mb-6 border-b border-gray-600 pb-2 text-center">
                            Enter OTP
                        </h2>
                        <OtpInput length={4} onOtpSubmit={handleOtpSubmit} />
                    </>
                )}

                {otpVerified && (
                    <form onSubmit={handleResetPassword}>
                        <h2 className="text-white text-2xl mb-6 border-b border-gray-600 pb-2 text-center">
                            Reset Password
                        </h2>
                        <label htmlFor="newPassword" className="block text-white text-lg font-semibold mb-2">
                            Enter new password
                        </label>
                        {/* <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="input-field w-full p-2 mb-4 text-black rounded"
                            required
                        /> */}
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="input-field w-full p-2 mb-4 text-black rounded"
                                required
                            />
                            {/* <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="eye-icon"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button> */}

                        <button
                            type="submit"
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
                    {/* {otpVerified && (
                        <ResetPassword /> // Render ResetPassword component after OTP is verified
                    )} */}
            </div>
        </div>
        </>
    );
};

export default ForgotPassword;
