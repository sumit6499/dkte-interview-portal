
import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import '@/App.css'
import Schedule from '@/components/ui/Schedules';
import { InterviewerProfileNavLinks } from '@/components/variables/formVariables';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUid } from '@/redux/authSlice';
import { BASE_URL } from '@/api';
import axios from 'axios';
import Loader from '@/components/ui/loading';
const InterviewerIntervieweSchedules = () => {
    const token = useSelector(selectCurrentToken)
const isAdmin = false;
    const drop = true;
    const profileLink = 2;
    const [interviewerLoading, setInterviewerLoading] = useState(true)
    const [interviewerError, setInterviewerError] = useState('');
    const [interviewersInterviews, setInterviewersInterviews] = useState([])
    const [isInterviewerInterviews, setIsInterviewerInterviews] = useState(true)
    const interviewerId = useSelector(selectCurrentUid);


    useEffect(() => {
        fetchInterviews('today');
    }, [])
    const fetchInterviews = async (filterOption) => {
        setInterviewerLoading(true);
        setInterviewerError(false);

        try {
            const response = await axios.get(`${BASE_URL}/api/v1/auth/interview/${interviewerId}/all?filter=${filterOption}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setInterviewersInterviews(response.data.data)
        } catch (error) {
            console.error('Error fetching students data:', error);
            setInterviewerError('Error fetching data from server. Please check your network connection or the server URL.');
        } finally {
            setInterviewerLoading(false);
        }
    }
    const handleFilterChange = async (option) => {
        try {
            await fetchInterviews(option);
        } catch (error) {
            console.error('Error fetching students data:', error);
            setInterviewerError('Error fetching data from server. Please check your network connection or the server URL.');
        }
    }

    return (
        <>
            <NavBar links={InterviewerProfileNavLinks} drop={drop} profileLink={profileLink} />
            {interviewerLoading? (<Loader/>
            
            ) : (<div className="bg-zinc-100 h-screen">
                <div className="flex h-screen">
                    {interviewersInterviews !== null &&
                        <Schedule
                            onFilterChange={handleFilterChange}
                            stdError={interviewerError}
                            interviews={interviewersInterviews}
                            stdLoading={interviewerLoading}
                            studentsInterviews={interviewersInterviews}
                            isStudentSchedules={false}
                            isAdmin={isAdmin}
                        />
                    }
                </div>
            </div>)}
            
        </>
    );
};

export default InterviewerIntervieweSchedules;
