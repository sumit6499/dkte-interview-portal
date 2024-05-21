import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NavBar from '../NavBar/NavBar';
import { ProfileImage, CameraIcon } from '@/assets/index.js';
import { InterviewerProfileNavLinks, days } from '@/components/variables/formVariables';
import { useSelector } from 'react-redux';
import { selectCurrentName, selectCurrentToken, selectCurrentUid } from '@/redux/authSlice';
import { fileInputClasses } from '@/components/styles/sharedStyles';
const ProfileDetailsForm = () => {
    // State to store form data
    const profileLink = 2;
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState({});
    const interviewerId = useSelector(selectCurrentUid);
    const token = useSelector(selectCurrentToken);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        profession: '',
        password: '', 
        startTime: '',
        endTime: '',
        freeday: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/v1/auth/interviewer/${interviewerId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                //  success
                alert('Profile details updated successfully!');
            } else {
                //  error  from backend
                alert('Failed to update profile details. Please try again.');
            }
        } catch (error) {
            //  network errors
            console.error('Error updating profile:', error);
            alert('An error occurred while updating profile details. Please try again later.');
        }
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-6">Update Profile Details</h3>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                        <label htmlFor="name" className='col-span-2 mb-2 text-zinc-500'>Enter Full Name:</label>
                        <input type="text" name="name" placeholder="Full Name" className="border p-2 rounded w-full" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="phone" className='col-span-2 mb-2 text-zinc-500'>Enter Contact Number:</label>
                        <input type="tel" name="phone" placeholder="Phone" className="border p-2 rounded w-full" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="email" className='col-span-2 mb-2 text-zinc-500'>Enter New Email:</label>
                        <input type="email" name="email" placeholder="Email" className="border p-2 rounded w-full" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="password" className='col-span-2 mb-2 text-zinc-500'>Enter New Password:</label>
                        <input type="text" name="password" placeholder="New Password" className="border p-2 rounded w-full" onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="profession" className='col-span-2 mb-2 text-zinc-500'>Enter  profession:</label>
                        <input type="text" name="profession" placeholder="Profession" className="border p-2 rounded w-full" onChange={handleInputChange} />

                    </div>
                    <div>
                        <label htmlFor="freeday" className='col-span-2 mb-2 text-zinc-500'>Day of Week You're Available:</label>
                        <select name="freeday" id="freeday" className='w-full p-2 bg-white rounded text-zinc-500' onChange={handleInputChange}>
                            {days.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="startTime" className='block mb-2 text-zinc-500'> Preferred Interview Start Time:</label>
                        <input type="time" id="startTime" name="startTime" className='w-auto p-2 bg-zinc-200 rounded-br-lg text-zinc-500 ' onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="endTime" className='block mb-2 text-zinc-500'> Preferred Interview End Time:</label>
                        <input type="time" id="endTime" name="endTime"className='w-auto p-2 bg-zinc-200 rounded-br-lg text-zinc-500 ' onChange={handleInputChange} />
                    </div>

                </div>
                <div className='flex justify-center'>
                    <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold mt-2 py-2 px-4 rounded"onClick={handleSubmit}>Save Changes</button>
                </div>
            </form>
        </div>
    );
};
const UpdateIDCard = () => {
    const [resumeFile, setResumeFile] = useState(null);
    const interviewerId = useSelector(selectCurrentUid);
    const token = useSelector(selectCurrentToken); 

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setResumeFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('resume', resumeFile);
            console.log("The foprmdata os ", resumeFile)
            const response = await fetch(`http://localhost:3000/api/v1/auth/interviewer/${interviewerId}/upload`, resumeFile, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
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
            <h3 className="text-lg font-semibold mb-3">Update IDcard</h3>
            <form onSubmit={handleSubmit} className='flex items-center'>
                <input type="file" onChange={handleFileChange} className={fileInputClasses} />
                <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full">
                    Upload Resume
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
               
                const response = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Update profile picture URL 
                if (response.data.result) {
                    setSelectedPicture(response.data.result);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }

            // Read the file to display on the page
            const reader = new FileReader();
            reader.onload = () => {
                // Update the selected picture in state
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

const InterviwerPorfile = () => {
    const profileLink = 2;
    const drop = true
    const UserName = useSelector(selectCurrentName);
    
    return (
        <>
            <NavBar links={InterviewerProfileNavLinks} profileLink={profileLink} drop={drop} />
            <div className="max-w-4xl mx-auto p-5">
                <div className="flex items-center bg-yellow-400 p-4 rounded-lg mb-6">
                    <img src={ProfileImage} alt="User Profile" className="rounded-full w-10 h-10" />
                    <span className="ml-3 font-semibold text-lg">{UserName}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <ProfilePicture />
                    <UpdateIDCard/>
                </div>
                <ProfileDetailsForm />
            </div>
        </>
    );
};
export default InterviwerPorfile;
