import React, { useEffect, useState } from 'react';
import axios from 'axios';

import NavBar from '../NavBar/NavBar';
import { ProfileImage, CameraIcon } from '@/assets/index.js';
import { InterviewerProfileNavLinks } from '@/components/variables/formVariables';

const ProfileDetailsForm = () => {
    // State to store form data
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        profession: '',
        password: '',
        idcard: '',
        selectedTimes: {} // Include selectedTimes in the formData state
    });

    //  handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // handle time range change
    const handleTimeRangeChange = (e, day, field) => {
        const newSelectedTimes = {
            ...selectedTimes
        };
        newSelectedTimes[day][field] = e.target.value;
        setSelectedTimes(newSelectedTimes);
        setFormData(prevState => ({
            ...prevState,
            selectedTimes: newSelectedTimes
        }));
    };

    //to display time in time boxes
    useEffect(()=>{
        const initialSelectedTimes = {};
        selectedDays.forEach(day=>{
            initialSelectedTimes[day] ={
                start:'',
                end:''
            };
        });
        setSelectedTimes(initialSelectedTimes);
    },[selectedDays]);
    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to backend API endpoint 
            const response = await axios.post('/api/update-profile', {
                ...formData
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
                    <input type="text" name="name" placeholder="Full Name" className="border p-2 rounded w-full" onChange={handleInputChange} />
                    <input type="tel" name="phone" placeholder="Phone" className="border p-2 rounded w-full" onChange={handleInputChange} />
                    <input type="email" name="email" placeholder="Email" className="border p-2 rounded w-full" onChange={handleInputChange} />
                    <input type="text" name="password" placeholder="New Password" className="border p-2 rounded w-full" onChange={handleInputChange} />
                    <input type="text" name="profession" placeholder="Profession" className="border p-2 rounded w-full" onChange={handleInputChange} />
                    <label htmlFor="days" className='col-span-2 mb-2 text-zinc-500'>Days of Week You're Available:</label>
                    <select name="days" id="days" className='w-full p-2 bg-white rounded text-zinc-500' onChange={(e) => setSelectedDays(Array.from(e.target.selectedOptions, option => option.value))}>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                    </select>
                </div>
                {selectedDays.map((day) => (
                    <div key={day}>
                        <label htmlFor={`start-time-${day}`} className='block mb-2 text-zinc-500'>{day} Preferred Interview Start Time:</label>
                        <input type="time" id={`start-time-${day}`} className='w-auto p-2 bg-zinc-200 rounded-br-lg text-zinc-500 ' onChange={(e) => handleTimeRangeChange(e, day, 'start')} value={selectedTimes[day]?.start || ''} />
                        <label htmlFor={`end-time-${day}`} className="block mb-2 text-zinc-500">{day} Preferred Interview End Time:</label>
                        <input type="time" id={`end-time-${day}`} className="w-auto p-2 bg-zinc-200 rounded text-zinc-500" onChange={(e) => handleTimeRangeChange(e, day, 'end')} value={selectedTimes[day]?.end || ''} />
                    </div>
                ))}
                <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold mt-2 py-2 px-4 rounded">Save Changes</button>
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
                // Send the image to the server
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
    return (
        <>
            <NavBar links={InterviewerProfileNavLinks} />
            <div className="max-w-4xl mx-auto p-5">
                <div className="flex items-center bg-yellow-400 p-4 rounded-lg mb-6">
                    <img src={ProfileImage} alt="User Profile" className="rounded-full w-10 h-10" />
                    <span className="ml-3 font-semibold text-lg">Pramod Mahajan</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <ProfilePicture />

                </div>
                <ProfileDetailsForm />
            </div>
        </>
    );
};
export default InterviwerPorfile;
