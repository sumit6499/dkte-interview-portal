import React, { useState } from 'react';
import axios from 'axios';
import { interviewComposition } from '@/assets/';
import NavBar from "../NavBar/NavBar";

function AdminLogin() {
    // State variables to store form data
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make Axios POST request to your backend
            const response = await axios.post("", formData);
            console.log("Response from server:", response.data);
            // Handle success, maybe redirect or show a success message
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error, maybe show an error message to the user
        }
    };

     

    return (
        <div>
            <div><NavBar /></div>
            <div className="flex justify-center items-center h-screen animate-slideFromBottom ">
                <div className="bg-zinc-800 p-8 rounded-lg w-96">
                    <h2 className="text-white text-2xl mb-6 border-b border-zinc-600 pb-2 flex justify-center" id="title" > Admin Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 text-center">
                            <label htmlFor="username" className="block text-white mb-2">Username :</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="input-field focus:border-yellow-500 focus:ring-yellow-500 " required />
                        </div>
                        <div className="mb-6 text-center">
                            <label htmlFor="password" className="block text-white mb-2 ">Password :</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="input-field focus:border-yellow-500 focus:ring-yellow-500" required />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="w-30 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <img src={interviewComposition} alt="" />
            </div>
        </div>
    );
}

export default AdminLogin;
