// src/pages/ResetPassword.js
import NavBar from '@/pages/NavBar/NavBar';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LoginNavlinks } from '../variables/formVariables';
const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        // Make an API request to reset the password
        const response = await fetch('https://your-api-endpoint.com/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        if (response.ok) {
            toast.success('Password reset successfully');
        } else {
            toast.error('Failed to reset password. Please try again.');
        }
    };

    return (
        <>
            <NavBar links={LoginNavlinks}/>
        <div className="flex justify-center items-center h-screen flex-col pt-6 space-y-10">
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="bg-zinc-800 p-8 rounded-lg w-96 pt-6">
                <h2 className="text-white text-2xl mb-6 border-b border-zinc-600 pb-2 flex justify-center">
                    Reset Password
                </h2>
                <form onSubmit={handleResetPasswordSubmit}>
                    <div className="mb-4 text-center">
                        <label htmlFor="password" className="block text-white mb-2">New Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field font-bold p-1 focus:border-yellow-500 focus:ring-yellow-500 text-black"
                            required
                        />
                    </div>
                    <div className="mb-4 text-center">
                        <label htmlFor="confirmPassword" className="block text-white mb-2">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-field font-bold p-1 focus:border-yellow-500 focus:ring-yellow-500 text-black"
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-30 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default ResetPassword;
