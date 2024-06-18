import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavBar from '../NavBar/NavBar';
import { ProfileImage, CameraIcon } from '@/assets/index.js';
import StudentLogin from '../Login/StudentLogin';
import { fileInputClasses } from '@/components/styles/sharedStyles';
import { StudentProfileNavlinks } from '@/components/variables/formVariables';
import { useSelector } from 'react-redux';
import { selectCurrentName, selectCurrentToken, selectCurrentUid } from '@/redux/authSlice';
import { BASE_URL } from '@/api';
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
    //  store user details
    const [user, setUser] = useState(null);

    //    user details after login
    const fetchUserDetails = async () => {
        //  backend API endpoint 
        const response = await fetch('/api/user');
        const userData = await response.json();
        setUser(userData);
    };

    useEffect(() => {
        //  user details after login
        fetchUserDetails();
    }, []);


    if (!user) return <StudentLogin />;


    return <UserProfile user={user} />;
};

const ProfileDetailsForm = () => {
    const token = useSelector(selectCurrentToken);
    const stdId = useSelector(selectCurrentUid);
    const [formData, setFormData] = useState({
        name: '',
        PRN: '',
        password: '',
        phone: '',
        email: '',
        dept: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/api/v1/auth/students/${stdId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Profile details updated successfully!');
            } else {
                console.log("hi ther ")
                alert("Failed to update profile details. Please try again.");
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating profile details. Please try again later.');
        }
    };

    const stdProfileDeptOptions = [
        "CSE",
        "AI",
        "AIDS",
        "ENTC",
        "MECH",
        "ELECTRIC",
        "CIVIL",
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-6">Update Profile Details</h3>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {/* Form fields */}
                    <div>
                        <label htmlFor="name" className='ml-1'>Enter New Full Name</label>
                        <input type="text" name="name" placeholder="Full Name" className="border mt-2 p-2 rounded w-full" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="PRN" className='ml-1'>Enter Updated PRN Number</label>
                        <input type="text" name="PRN" placeholder="PRN Number" className="border p-2 rounded w-full" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="phone" className='ml-1'>Enter the new Phone Number</label>
                        <input type="text" name="phone" placeholder="Phone" className="border p-2 rounded w-full" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="email" className='ml-1'>Enter new Email</label>
                        <input type="email" name="email" placeholder="Email" className="border p-2 rounded w-full" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="dept">Select Department</label>
                        <select name="dept" className="border p-2 rounded w-full" onChange={handleInputChange}>
                            <option value="">Select Department</option>
                            {stdProfileDeptOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="password">Enter new Password</label>
                        <input type="text" name="password" placeholder="Password" className="border p-2 rounded w-full" onChange={handleInputChange} />
                    </div>
                </div>
                <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                    Save Changes
                </button>
            </form>
        </div>
    );
};


const ProfilePicture = () => {
    const [selectedPicture, setSelectedPicture] = useState(null);

    const handlePictureChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                // image to the server
                const response = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });


                if (response.data.result) {
                    setSelectedPicture(response.data.result);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }


            const reader = new FileReader();
            reader.onload = () => {

                setSelectedPicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Profile Picture</h3>
            <div className="relative">

                <img src={selectedPicture || ProfileImage} alt="Profile Picture" className="rounded-full mx-auto" />
                <label htmlFor='profilePicture' className="absolute bottom-0 right-0 bg-zinc-700 text-white p-2 rounded-full cursor-pointer">
                    <img src={CameraIcon} alt="Camera Icon" className="w-6 h-6 hover::pointer" />
                    <input
                        type="file"
                        accept='image/*'
                        className='absolute inset-0 w-full opacity-0 cursor-pointer'
                        onChange={handlePictureChange}
                    />
                </label>
            </div>
        </div>
    );
};

const UpdateResume = () => {
    const [resumeFile, setResumeFile] = useState(null);
    const stdId = useSelector(selectCurrentUid);
    const token = useSelector(selectCurrentToken);  // Include token

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setResumeFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (formData.length==0) {
            console.log("upload file")
            alert('Select File');
        }
        try {
           
            formData.append('resume', resumeFile);
            console.log("The resumeFile os ", resumeFile)
            console.log("The foprmdata os ", formData)
            const response = await fetch(`http://13.126.95.245:3000/api/v1/auth/students/${stdId}/upload`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            if (response.status === 200) {
                alert('Resume upload successful');
            } else {
                alert('Failed to upload resume');
            }
        } catch (error) {
            console.error('Error uploading resume: ', error);
            
            alert('An error occurred while uploading');
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Update Resume</h3>
            <form onSubmit={handleSubmit} className='flex items-center'>
                <input type="file" onChange={handleFileChange} className={fileInputClasses} />
                <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full">
                    Upload Resume
                </button>
            </form>
        </div>
    );
};

const UserProfile = () => {
    const profileLink = 1
    const drop = true;
    const stdName = useSelector(selectCurrentName)
    return (
        <>
            <NavBar links={StudentProfileNavlinks} drop={drop} profileLink={profileLink} />
            <div className="max-w-4xl mx-auto p-5">
                <div className="flex items-center bg-yellow-400 p-4 rounded-lg mb-6">
                    <img src={ProfileImage} alt="User Profile" className="rounded-full w-10 h-10" />
                    <span className="ml-3 font-semibold text-lg">{stdName}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <ProfilePicture />
                    <UpdateResume />
                </div>
                <ProfileDetailsForm />
            </div>
        </>
    );
};

export default UserProfile;
