import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavBar from '../NavBar/NavBar';
import { ProfileImage, CameraIcon } from '@/assets/index.js';
import StudentLogin from '../Login/StudentLogin';
import { fileInputClasses } from '@/components/styles/sharedStyles';
import { StudentProfileNavlinks } from '@/components/variables/formVariables';


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
    // State to store form data
    const [formData, setFormData] = useState({
        name: '',
        prn:'',
        password:'',
        phone: '',
        email: '',
        dept: '',
        class: ''
    });

    //   form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //  form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data  
            const response = await fetch('/api/v1/auth/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <input type="text" placeholder="Full Name" className="border p-2 rounded w-full" />
                    <input type="text" placeholder="Phone" className="border p-2 rounded w-full" />
                    <input type="email" placeholder="Email" className="border p-2 rounded w-full" />
                    <input type="text" placeholder="Department" className="border p-2 rounded w-full" />
                    <input type="text" placeholder="Class" className="border p-2 rounded w-full" />
                </div>
                <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"onSubmit={handleSubmit}>
                    Save Changes
                </button>
            </form>
        </div>
    );
};


const ProfilePicture = () => {
    const [selectedPicture, setSelectedPicture] = useState(null);


    //To send the updated picture to backend
    // const handlePictureChange = async (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('image', file);

    //         try {
    //             // Send the image to the server
    //             const response = await axios.post('/api/upload', formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //             });

    //             // Update profile picture URL 
    //             if (response.result) {
    //                 setSelectedPicture(response.result);
    //             }
    //         } catch (error) {
    //             console.error('Error uploading image:', error);
    //         }
    //     }
    // };

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


    // //to change the user picture on page 
    // const handlePictureChange = (e) => {
    //     const file = e.target.files[0];
    //     // Validate if file is selected
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             // Update the selected picture in state
    //             setSelectedPicture(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">Profile Picture</h3>
            <div className="relative">

                <img src={selectedPicture || ProfileImage} alt="Profile Picture" className="rounded-full mx-auto" />
                {/* <input 
                type="file"
                accept='image/*'
                className='absolute inset-0 w-full opacity-0 cursor-pointer'
                onChange={handlePictureChange}
                /> */}
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

    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setResumeFile(file);
    };
   
    const handleSubmit = async (e) => {
        e.preventdefault();
        try {
            //formdata object
            const formData = new FormData();
            formData.append('resume', resumeFile);
            //send formdata to backend API
            const response = await axios.post('', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            });
            if (response.status === 200) {
                //success
                alert('Resume upload successful');
            }
            else {
                //error from backend
                alert('Failed to upload resume')
            }
        }
        catch (error) {
            //network error 
            console.error('Error uploading resume: ', error);
            alert('An error occurred while uploading')
        }

    }
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
   
    
    return (
        <>


            <NavBar links={StudentProfileNavlinks} />
            <div className="max-w-4xl mx-auto p-5">
                <div className="flex items-center bg-yellow-400 p-4 rounded-lg mb-6">
                    <img src={ProfileImage} alt="User Profile" className="rounded-full w-10 h-10" />
                    <span className="ml-3 font-semibold text-lg">Pramod  Mahajan</span>
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
