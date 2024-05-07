import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { interviewComposition } from '@/assets';
import axios from 'axios';
import { InterviewerNavLinks } from '@/components/variables/formVariables';
import { ToastContainer, toast } from 'react-toastify'; // Make sure to import toast from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '@/App.css';

const InterviewerSignUp = () => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        profession: '',
        idcard: '',
    });

    const handleTimeRangeChange = (e, day, field) => {
        const newSelectedTimes = { ...selectedTimes };
        newSelectedTimes[day][field] = e.target.value;
        setSelectedTimes(newSelectedTimes);
        setFormData(prevState => ({ ...prevState, selectedTimes: newSelectedTimes }));
    };

    //to display time in time boxes
    useEffect(() => {
        const initialSelectedTimes = {};
        selectedDays.forEach(day => {
            initialSelectedTimes[day] = {
                start: '',
                end: ''
            };
        });
        setSelectedTimes(initialSelectedTimes);
    }, [selectedDays]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!Object.values(formData).every(value => value !== '')) {
            // toast.error('Please fill in all fields!', { position: toast.POSITION.TOP_CENTER });
            showToast("Please fill all the fields");

            return;
        }

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key =>{
                formDataToSend.append(key,formData[key]);
            })
            const response = await axios.post('http://localhost:5000/submit-form', formDataToSend);
            console.log(response.data);
            // toast.success('Signup Successful!', { position: toast.POSITION.TOP_CENTER });
        } catch (error) {
            console.error('Error submitting form:', error);
            // toast.error('An error occurred while submitting the form!', { position: toast.POSITION.TOP_CENTER });
        }
    };
    const showToast = (message) => {
        toast.error(message);
    };

    return (
        <>
            <NavBar links={InterviewerNavLinks} />
            <ToastContainer />
            <div className="max-w-2xl mx-auto p-8 bg-zinc-800 mt-10 rounded-lg mb-10 ">
                <h1 className="text-xl font-bold mb-6 text-white flex justify-center">Interviewer SignUp</h1>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-white">Full Name:</label>
                        <input type="text" id="name" className="w-full p-2 bg-zinc-700 rounded text-white" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-white">Email:</label>
                        <input type="email" id="email" className="w-full p-2 bg-zinc-700 rounded text-white" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-white">Phone:</label>
                        <input type="tel" id="phone" className="w-full p-2 bg-zinc-700 rounded text-white" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-white">Password:</label>
                        <input type="text" id="password" className="w-full p-2 bg-zinc-700 rounded text-white" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                    </div>
                    <div>
                        <label htmlFor="profession" className="block mb-2 text-white">Profession:</label>
                        <input type="text" id="profession" className="w-full p-2 bg-zinc-700 rounded text-white" value={formData.profession} onChange={(e) => setFormData({ ...formData, profession: e.target.value })} required />
                    </div>
                    <div>

                        <label htmlFor="idcard" className="block mb-2 text-white">ID Card:</label>
                        <input type="file" id="idcard" className="mt-1 block w-full text-sm  file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600 hover:pointer text-white" onChange={(e) => setFormData({ ...formData, idcard: e.target.files[0] })} />
                    </div>
                    <div>
                        <label htmlFor="days" className="block mb-2 text-white">Days Of Week You're Available:</label>
                        <select id="days" className="w-full p-2 bg-zinc-700 rounded text-white" multiple onChange={(e) => setSelectedDays(Array.from(e.target.selectedOptions, option => option.value))} defaultValue={['Monday']}>
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
                            <label htmlFor={`start-time-${day}`} className="block mb-2 text-white">{day} Preferred Interview Start Time:</label>
                            <input
                                type="time"
                                id={`start-time-${day}`}
                                className="w-full p-2 bg-zinc-700 rounded text-white"
                                onChange={(e) => handleTimeRangeChange(e, day, 'start')}
                                value={selectedTimes[day]?.start || ''}
                            />
                            <label htmlFor={`end-time-${day}`} className="block mb-2 text-white">{day} Preferred Interview End Time:</label>
                            <input
                                type="time"
                                id={`end-time-${day}`}
                                className="w-full p-2 bg-zinc-700 rounded text-white"
                                onChange={(e) => handleTimeRangeChange(e, day, 'end')}
                                value={selectedTimes[day]?.end || ''}
                            />
                        </div>
                    ))}

                </form>
                <div className='grid grid-cols-1 '>
                    <button type="button" onClick={handleSubmit} className={"mt-10 block mx-auto py-3 px-6 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600"}>Sign Up</button>
                </div>
            </div>
            <div>
                <img src={interviewComposition} alt="" />
            </div>
        </>
    );
};

export default InterviewerSignUp;
