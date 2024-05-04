import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { interviewComposition } from '@/assets';
const InterviewerSignUp = () => {
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Register', url: '/signup' },
        { label: 'Contact', url: '/' },
    ];

    // State to hold selected days and times
    const [selectedDays, setSelectedDays] = useState(['Monday']);
    const [selectedTimes, setSelectedTimes] = useState({
        Monday:'',
    });

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
    useEffect(()=>{
        setSelectedTimes(prevState =>({
            ...prevState,
            Monday:'09:00',
        }));
    },[]);
    return (
        <>
            <NavBar links={links} />
            <div className="max-w-2xl mx-auto p-8 bg-zinc-800 mt-10 rounded-lg mb-10 ">
                <h1 className="text-xl font-bold mb-6 text-white flex  justify-center">Interviewer SignUp</h1>
                <form className="grid grid-cols-2 gap-10">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-white">Full Name:</label>
                        <input type="text" id="name" className="w-full p-2 bg-zinc-700 rounded text-white" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-white">Email:</label>
                        <input type="email" id="email" className="w-full p-2 bg-zinc-700 rounded text-white" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-white">Phone:</label>
                        <input type="tel" id="phone" className="w-full p-2 bg-zinc-700 rounded text-white" />
                    </div>
                    <div>
                        <label htmlFor="idcard" className="block mb-2 text-white">ID Card:</label>
                        <input type="file" id="idcard" className="w-full p-2 bg-white rounded cursor-pointer text-red-400" />
                    </div>
                    <div>
                        <label htmlFor="days" className="block mb-2 text-white">Days Of Week You're Available:</label>
                        <select id="days" className="w-full p-2 bg-zinc-700 rounded" multiple onChange={handleDayChange}>
                            <option selected>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                        </select>
                    </div>
                    {selectedDays.map((day, index) => (
                        <div key={index}>
                            <label htmlFor={`time-${day}`} className="block mb-2 text-white">{day} Preferred Interview Time:</label>
                            <input
                                type="time"
                                id={`time-${day}`}
                                className="w-full p-2 bg-zinc-700 rounded text-white"
                                onChange={(e) => handleTimeChange(e, day)}
                                value={selectedTimes[day] || ''}
                            />
                        </div>
                    ))}
                   
                    <button type="submit" className="ml-80 px-16 py-2  bg-yellow-500 rounded hover:bg-yellow-600 flex justify-self-center whitespace-nowrap text-center">Sign Up</button>
                   
                </form>
            </div>
            <div>
                <img src={interviewComposition} alt="" />
            </div>
        </>
    );
};

export default InterviewerSignUp;
