import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import '@/App.css'
import { StudentHomeNavlinks } from '@/components/variables/formVariables';
import Schedule from '@/components/ui/Schedules';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAllUsers, selectCurrentToken } from '@/redux/authSlice';
const StudentHome = () => {
    const profileLink = 1
    const token = useSelector(selectCurrentToken);
    const drop = true;
    const [interviews, setInterviews] = useState([]);
    const [studentsInterviews, seTStudentsInterviews] = useState([]);
    const [stdLoading, setLoading] = useState(true);
    const [stdError, setError] = useState(null);
    const [isStudentSchedules, setIsStudentSchedules] = useState(true);
    const users = useSelector(selectAllUsers)
    let studentId;
    users.map((user, index) => {
        if (user.token == token) {
            studentId = user.Uid;
        }
    })
    useEffect(() => {
        fetchInterviews('today');
    }, []);

    const fetchInterviews = async (filterOption) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://dkte-interview-portal-api.vercel.app/api/v1/auth/interview/${studentId}/all?filter=${filterOption}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("the response data is " + response.data);
            setInterviews(response.data);
            seTStudentsInterviews(interviews.data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching students data:', error);
            setError('Error fetching data from server. Please check your network connection or the server URL.');
        } finally {
            setLoading(false);
        }
    };

    console.log('student interviewer', interviews.data);
    const handleFilterChange = async (option) => {
        try {
            await fetchInterviews(option);
        } catch (error) {
            console.error('Error fetching interviews:', error);
        }
    };

    return (
        <>
            <NavBar links={StudentHomeNavlinks} drop={drop} profileLink={profileLink} />
            <div className="bg-zinc-100 h-screen">
                <div className="flex h-screen">
                    {interviews !== null &&
                        <Schedule
                            interviews={interviews.data}
                            onFilterChange={handleFilterChange}
                            isStudentSchedules={true}
                            // studentsInterviews={studentsInterviews }
                            stdLoading={stdLoading}
                            stdError={stdError} />
                    }
                </div>
            </div>
        </>
    );
};

export default StudentHome;
