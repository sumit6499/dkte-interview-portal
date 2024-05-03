import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
// Shared Tailwind CSS classes
const inputClasses = 'w-full p-2 bg-zinc-700 rounded';
const buttonClasses = 'w-full bg-yellow-500 p-3 rounded hover:bg-yellow-600';

const InterviewerSignUp = () => {
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/loginPage' },
        { label: 'Register', url: '/SignUpPage' },
        { label: 'Contact', url: '/' },
    ];
    // State to hold selected days and times
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState({});

    // Handler for selecting days
    const handleDayChange = (e) => {
        setSelectedDays(Array.from(e.target.selectedOptions, option => option.value));
    };

    // Handler for selecting time for a specific day
    const handleTimeChange = (e, day) => {
        setSelectedTimes({
            ...selectedTimes,
            [day]: e.target.value
        });
    };

    return (
        <>
        <NavBar links={links}/>
        <div className="max-w-lg mx-auto p-8 bg-zinc-800 mt-10 rounded-lg">
            <h1 className="text-xl font-bold mb-6">Admin Signup</h1>
            <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Full Name:</label>
                    <input type="text" id="name" className={inputClasses} />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email:</label>
                    <input type="email" id="email" className={inputClasses} />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-2">Phone:</label>
                    <input type="tel" id="phone" className={inputClasses} />
                </div>
                <div className="mb-4">
                    <label htmlFor="idcard" className="block mb-2">ID Card:</label>
                    <input type="file" id="idcard" className={`${inputClasses} cursor - pointer`} />
                </div>
                <div className="mb-4">
                    <label htmlFor="days" className="block mb-2">Days Of Week You're Available:</label>
                    <select id="days" className={inputClasses} multiple onChange={handleDayChange}>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                    </select>
                </div>
                {selectedDays.map((day, index) => (
                    <div className="mb-6" key={index}>
                        <label htmlFor={`time-${day}`} className="block mb-2">{day} Preferred Interview Time:</label>
                        <select id={`time-${day}`} className={inputClasses} onChange={(e) => handleTimeChange(e, day)}>
                            <option>Morning 9 to 12</option>
                            <option>Afternoon 12 to 3</option>
                            <option>Evening 3 to 6</option>
                        </select>
                    </div>
                ))}
                <button type="submit" className={buttonClasses}>Sign Up</button>
            </form>
        </div>
        </>
    );
};

export default InterviewerSignUp;
