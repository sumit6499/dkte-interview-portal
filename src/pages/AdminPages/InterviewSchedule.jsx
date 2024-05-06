import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { useLocation } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AdminSchedulesNavlinks } from '@/components/variables/formVariables';
function AdminInterviewSchedule() {
    const location = useLocation();
    let student = location.state && location.state.student; 
    console.log("the student is " + student)
    if(student ==null)
    {
        student = [];
    }
    const name = student.name;
    const prn = student.prn;
    const branch = student.branch;
    const Year = student.class;

    const navigate = useNavigate();

    const [dateTime, setDateTime] = useState('');
    const [link,setlink] = useState('');
    
   
    const getLink = () => {
        window.open('https://meet.google.com/', '_blank');
    }
    const handleSchedule = async () => {
        if (!dateTime) {
           
            alert('Please select a date and time for the interview.');
            return;
        }

        try {
            // POST request
            await axios.post('', {
                name: name,
                prn: prn,
                branch: branch,
                Year: Year,
                dateTime: dateTime,
                link:link
            });
            alert('Interview scheduled successfully!');
        } catch (error) {
            console.error('Error scheduling interview:', error);
            alert('Failed to schedule interview. Please try again later.');
        }
    };

    return (
        <>
            <NavBar links={AdminSchedulesNavlinks} />
            <div className="white text-white mb-10">
                <div className="max-w-lg mx-auto mt-10 p-6 bg-zinc-800 rounded-lg">
                    <h1 className="text-xl font-bold mb-4 border-b border-zinc-600 pb-2">Schedule Interview</h1>
                    
                    <div className="space-y-2">
                        <p>Student Name: <span className="font-semibold text-white">{name}</span></p>
                        <p>PRN: <span className="font-semibold">{prn}</span></p>
                        <p>Department: <span className="font-semibold">{branch}</span></p>
                        <p>Class: <span className="font-semibold">{Year}</span></p>
                        <label htmlFor="date-time" className="block mt-4">Date and Time:</label>
                        <input type="datetime-local" id="date-time" name="date-time" className="bg-zinc-700 p-2 rounded-md w-full" onChange={(e) => setDateTime(e.target.value)} />
                        <label htmlFor="date-time" className="block mt-4">Joining Link:</label>
                        <input type="text" id="link" name="link" className="bg-zinc-700 p-2 rounded-md w-full" onChange={(e) => setlink(e.target.value)} />
                        <button className='mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-colors' onClick={getLink}>Get Link</button>
                  
                    </div>
                    <div className='flex justify-center'>
                    <button onClick={handleSchedule} className=" mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600">Schedule</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminInterviewSchedule;
