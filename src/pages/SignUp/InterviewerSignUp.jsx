import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { interviewComposition } from '@/assets';
import axios from 'axios';
import { InterviewerNavlinks } from '@/components/variables/formVariables';
const InterviewerSignUp = () => {
    

    const [selectedDays, setSelectedDays] = useState(['Monday']);
    const [selectedTimes, setSelectedTimes] = useState({
        Monday: [{ start: '', end: '' }],

    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        idcard: '',
        selectedTimes: {
            Monday: [{ start: '', end: '' }],
            Tuesday: [{ start: '', end: '' }],
            Wednesday: [{ start: '', end: '' }],
            Thursday: [{ start: '', end: '' }],
            Friday: [{ start: '', end: '' }],
            Saturday: [{ start: '', end: '' }],
            Sunday: [{ start: '', end: '' }]
        }
    });


    const handleSubmit = async (e) => {
        Object.keys(selectedTimes).forEach(day => {
            console.log(`${day}:`, selectedTimes[day]);
        });
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/submit-form', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    const handleDayChange = (e) => {
        const newSelectedDays = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedDays(newSelectedDays);

        const newSelectedTimes = { ...selectedTimes };
        newSelectedDays.forEach(day => {
            if (!newSelectedTimes[day]) {
                newSelectedTimes[day] = [{ start: '', end: '' }];
            }
        });
        setSelectedTimes(newSelectedTimes);
        // Update formData with new selectedTimes
        setFormData(prevState => ({ ...prevState, selectedTimes: newSelectedTimes }));
    };

    const handleTimeRangeChange = (e, day, index, field) => {
        const newSelectedTimes = { ...selectedTimes };
        newSelectedTimes[day][index][field] = e.target.value;
        setSelectedTimes(newSelectedTimes);
        // Update formData with new selectedTimes
        setFormData(prevState => ({ ...prevState, selectedTimes: newSelectedTimes }));
    };

    const addTimeRange = (day) => {
        const newSelectedTimes = { ...selectedTimes };
        newSelectedTimes[day].push({ start: '', end: '' });
        setSelectedTimes(newSelectedTimes);
        // Update formData with new selectedTimes
        setFormData(prevState => ({ ...prevState, selectedTimes: newSelectedTimes }));
    };

    const removeTimeRange = (day, index) => {
        const newSelectedTimes = { ...selectedTimes };
        newSelectedTimes[day].splice(index, 1);
        setSelectedTimes(newSelectedTimes);
        // Update formData with new selectedTimes
        setFormData(prevState => ({ ...prevState, selectedTimes: newSelectedTimes }));
    };

    return (
        <>
            <NavBar links={InterviewerNavlinks} />
            <div className="max-w-2xl mx-auto p-8 bg-zinc-800 mt-10 rounded-lg mb-10 ">
                <h1 className="text-xl font-bold mb-6 text-white flex justify-center">Interviewer SignUp</h1>
                <form className="grid grid-cols-2 gap-10">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-white">Full Name:</label>
                        <input type="text" id="name" className="w-full p-2 bg-zinc-700 rounded text-white" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-white">Email:</label>
                        <input type="email" id="email" className="w-full p-2 bg-zinc-700 rounded text-white" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-white">Phone:</label>
                        <input type="tel" id="phone" className="w-full p-2 bg-zinc-700 rounded text-white" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="idcard" className="block mb-2 text-white">ID Card:</label>
                        <input type="file" id="idcard" className="mt-1 block w-full text-sm text-zinc-900 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600 hover:pointer" onChange={(e) => setFormData({ ...formData, idcard: e.target.files[0] })} />
                    </div>
                    <div>
                        <label htmlFor="days" className="block mb-2 text-white">Days Of Week You're Available:</label>
                        <select id="days" className="w-full p-2 bg-zinc-700 rounded text-white" multiple onChange={handleDayChange} defaultValue={['Monday']}>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                        </select>
                    </div>

                    {selectedDays.map((day, dayIndex) => (
                        <div key={dayIndex}>
                            {selectedTimes[day].map((time, index) => (
                                <div key={index}>
                                    <label htmlFor={`start-time-${day}-${index}`} className="block mb-2 text-white">{day} Preferred Interview Start Time:</label>
                                    <input
                                        type="time"
                                        id={`start-time-${day}-${index}`}
                                        className="w-full p-2 bg-zinc-700 rounded text-white"
                                        onChange={(e) => handleTimeRangeChange(e, day, index, 'start')}
                                        value={selectedTimes[day][index].start || ''}
                                    />
                                    <label htmlFor={`end-time-${day}-${index}`} className="block mb-2 text-white">{day} Preferred Interview End Time:</label>
                                    <input
                                        type="time"
                                        id={`end-time-${day}-${index}`}
                                        className="w-full p-2 bg-zinc-700 rounded text-white"
                                        onChange={(e) => handleTimeRangeChange(e, day, index, 'end')}
                                        value={selectedTimes[day][index].end || ''}
                                    />
                                </div>
                            ))}
                            <div className='flex mt-2 justify-between'>
                                <button type='button' onClick={() => addTimeRange(day)} className="block mx-auto py-1 px-2 bg-gray-500 text-black font-bold rounded-md hover:bg-yellow-600 mr-2">
                                    Add Time Range
                                </button>
                                <button type='button' onClick={() => removeTimeRange(day)} className="block mx-auto py-1 px-2 bg-gray-500 text-black font-bold rounded-md hover:bg-yellow-600">
                                    Delete Time Range
                                </button>
                            </div>
                        </div>
                    ))}

                    <button type="submit" className="ml-80 px-16 py-2 bg-yellow-500 rounded hover:bg-yellow-600 flex justify-self-center whitespace-nowrap text-center" onClick={handleSubmit}>Sign Up</button>
                </form>
            </div>
            <div>
                <img src={interviewComposition} alt="" />
            </div>
        </>
    );
};

export default InterviewerSignUp;
