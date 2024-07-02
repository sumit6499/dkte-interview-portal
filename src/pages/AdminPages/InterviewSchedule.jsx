import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { AdminSchedulesNavlinks, days } from '@/components/variables/formVariables';
import { useSelector } from 'react-redux';
import { selectAllUsers, selectCurrentToken,selectCurrentUid } from '@/redux/authSlice';
import { BASE_URL } from '@/api';
import CustomAlert from '@/components/ui/CustomAlert';
function AdminInterviewSchedule() {
    const token = useSelector(selectCurrentToken);
    const facultyID=useSelector(selectCurrentUid);
    console.log(facultyID)
    const navigate = useNavigate();
    const location = useLocation();
    const users = useSelector(selectAllUsers);
    let student = location.state && location.state.student;

    if (!student) {
        student = {};
    }

    const name = student.name;
    const prn = student.PRN;
    const branch = student.dept;
    const Year = student.class;

    const [link, setLink] = useState('');
    const [dateString, setDate] = useState('');
    const [startedAt, setStartTime] = useState('');
    const [endsAt, setEndTime] = useState('');
    const [isStartTimeSet, setIsStartTimeSet] = useState(false);
    const [isEndTimeSet, setIsEndTimeSet] = useState(false);
    const [Day, setDay] = useState('');
    const [selectedInterviewer, setSelectedInterviewer] = useState('');
    const [isTimeSet, setIsTimeSet] = useState(false);
    const [interviewers, setInterviewers] = useState([]);
    const [interviewID, setInterviewId] = useState('');
    const [interviewersToDisplay, setInterviewersToDisplay] = useState([])
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    let _id = student.id;
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        const parsedDate = new Date(selectedDate);
        const dayOfWeekIndex = parsedDate.getDay();
        const dayName = days[dayOfWeekIndex];
        setDay(dayName);
        handleDayChange(dayName);
    };

    const handleStartTimeChange = (e) => {
        const selectedStartTime = e.target.value;
        setStartTime(selectedStartTime);
        console.log("Start time set as ", selectedStartTime);
        setIsStartTimeSet(true);
    };

    const handleEndTimeChange = (e) => {
        const selectedEndTime = e.target.value;
        setEndTime(selectedEndTime);
        setIsEndTimeSet(true);
    };

    useEffect(() => {
        if (isStartTimeSet && isEndTimeSet) {
            setIsTimeSet(true);
            setInterviewersToDisplay([]);

            if (interviewers && interviewers.length > 0) {
                const data = interviewers.filter((interview) => {
                    return interview.startTime <= startedAt && interview.endTime >= endsAt;
                });

                setInterviewersToDisplay(data);
            }
        }
    }, [isStartTimeSet, isEndTimeSet, startedAt, endsAt, interviewers]);
    function onClose(){
        navigate('/login/admin/students');
    }

    const closeAlert = () => {
        setShowAlert(false);
        navigate('/login/admin/students');
    };


    useEffect(() => {
        // console.log("Updated interviewers:", interviewers);
    }, [interviewers]);

    const handleSelectedInterviewer = (e) => {
        const selectedInterviewer = e.target.value;
        setSelectedInterviewer(selectedInterviewer);
        const interviewer = interviewers.find(user => user.name === selectedInterviewer);
        if (interviewer) {
            setInterviewId(interviewer.id);
        }
    };

    const getLink = () => {
        window.open('https://meet.google.com/', '_blank');
    };

    const handleSchedule = async () => {
        if (!dateString || !startedAt || !endsAt || !link) {
            alert('Please fill all the fields.');
            return;
        }

        try {
            await axios.post(`${BASE_URL}/api/v1/auth/interview/${_id}/schedule`, {
                dateString,
                startedAt,
                endsAt,
                link,
                _id, 
                interviewID,
                facultyID,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAlertMessage('Interview scheduled successfully!');
            setShowAlert(true);
            
        } catch (error) {
            console.error('Error scheduling interview:', error);
            setAlertMessage('Failed to schedule interview. Please try again later.');
            setShowAlert(true);
        }
    };

    const fetchInterviewers = async (day) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/auth/interviewer/${day}/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.data;
            console.log("Fetched interviewers data:", data);
            return data;

        } catch (error) {
            console.error('Error fetching interviewers:', error);
            alert('Failed to fetch interviewers. Please try again later.');
        }
    };

    const handleDayChange = async (day) => {
        setInterviewers([]);
        const data = await fetchInterviewers(day);
        setInterviewers(data);
    };

    return (
        <>
            <NavBar links={AdminSchedulesNavlinks} drop={true} isAdmin={true} />
            {showAlert ?( <CustomAlert message={alertMessage} onClose={closeAlert} />):(

            <div className="text-white mb-10">
                <div className="max-w-lg mx-auto mt-10 p-6 bg-zinc-800 rounded-lg">
                    <h1 className="text-xl font-bold mb-4 border-b border-zinc-600 pb-2">Schedule Interview</h1>
                    <div className="space-y-2">
                        <p>Student Name: <span className="font-semibold text-white">{name}</span></p>
                        <p>PRN: <span className="font-semibold">{prn}</span></p>
                        <p>Department: <span className="font-semibold">{branch}</span></p>
                        <p>Class: <span className="font-semibold">{Year}</span></p>

                        <label htmlFor="date" className="block mt-4">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className="bg-zinc-700 p-2 rounded-md w-full"
                            onChange={handleDateChange}
                        />

                        <label htmlFor="start-time" className="block mt-4">Start Time:</label>
                        <input
                            type="time"
                            id="start-time"
                            name="start-time"
                            className="bg-zinc-700 p-2 rounded-md w-full"
                            onChange={handleStartTimeChange}
                        />

                        <label htmlFor="end-time" className="block mt-4">End Time:</label>
                        <input
                            type="time"
                            id="end-time"
                            name="end-time"
                            className="bg-zinc-700 p-2 rounded-md w-full"
                            onChange={handleEndTimeChange}
                        />

                        {isTimeSet && (
                            <div className='mt-2'>
                                <label htmlFor="interviewers" className="text-white">Available Interviewers:</label>
                                <select
                                    id="interviewers"
                                    name="interviewers"
                                    onChange={handleSelectedInterviewer}
                                    required
                                    className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                                >
                                    <option value="">Select Interviewers</option>
                                    {interviewersToDisplay.length === 0 ? (
                                        <option disabled>No Interviewers are available</option>
                                    ) : (
                                        interviewersToDisplay.map((interviewer) => (
                                            <option key={interviewer.id} value={interviewer.name}>
                                                {interviewer.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        )}

                        <label htmlFor="link" className="block mt-4">Joining Link:</label>
                        <input
                            type="text"
                            id="link"
                            name="link"
                            className="bg-zinc-700 p-2 rounded-md w-full"
                            onChange={(e) => setLink(e.target.value)}
                        />

                        <button
                            className='mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-colors'
                            onClick={getLink}
                        >
                            Get Link
                        </button>
                    </div>

                    <div className='flex justify-center'>
                        <button
                            onClick={handleSchedule}
                            className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
                        >
                            Schedule
                        </button>
                    </div>
                </div>
            </div>
            )}
        </>
        
    );
}

export default AdminInterviewSchedule;
