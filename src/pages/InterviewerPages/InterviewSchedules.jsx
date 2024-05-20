
import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import '@/App.css'
import Schedule from '@/components/ui/Schedules';
import { InterviewerProfileNavLinks } from '@/components/variables/formVariables';
import { useSelector } from 'react-redux';
import { selectAllUsers, selectCurrentToken, selectCurrentUser } from '@/redux/authSlice';
// import tokens from 'razorpay/dist/types/tokens';
import axios from 'axios';
const InterviewerIntervieweSchedules = () => {
    const token = useSelector(selectCurrentToken)
    const users = useSelector(selectAllUsers)
    // const [interviewerId,setInterviewerId] = useState('')
    const [interviewerLoading,setInterviewerLoading] = useState(true)
    const [interviewerError,setInterviewerError] = useState('');
    const [interviewersInterviews,setInterviewersInterviews] = useState([])
    const [isInterviewerInterviews,setIsInterviewerInterviews] = useState(true)
    console.log("token is ",token)
    let interviewerId;
    users.map((user,index)=>{
        if(user.token === token)
            {
            interviewerId=user.Uid;
            }
    })
    console.log("THe interviewer id is ", interviewerId)
    useEffect(()=>{
        fetchInterviews('today');
    },[])
    const fetchInterviews = async (filterOption)=>{
        setInterviewerError(true);
        setInterviewerError(false);

        try{
            const response = await axios.get(`http://localhost:3000/api/v1/auth/interview/${interviewerId}/all?filter=${filterOption}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setInterviewersInterviews(response.data.data)
        }catch(error)
        {
            console.error('Error fetching students data:', error);
            setInterviewerError('Error fetching data from server. Please check your network connection or the server URL.');
        } finally {
            setInterviewerLoading(false);
        }
    }
    const handleFilterChange = async (option)=>{
        try{
            await fetchInterviews(option);
        }catch(error)
        {
            console.error('Error fetching students data:', error);
            setInterviewerError('Error fetching data from server. Please check your network connection or the server URL.');
        }
    }
    const drop = true;
console.log("the interivew sare ",interviewersInterviews)
    return (
        <>
            <NavBar links={InterviewerProfileNavLinks} drop={drop} />
            <div className="bg-zinc-100 h-screen">
                <div className="flex h-screen">
                    {interviewersInterviews !== null &&
                    <Schedule 
                        onFilterChange={handleFilterChange }
                        stdError={interviewerError}
    
                        stdLoading={interviewerLoading}
                        studentsInterviews={interviewersInterviews}
                        isStudentSchedules={isInterviewerInterviews}
                        />
                    }
                </div>
            </div>
        </>
    );
};

export default InterviewerIntervieweSchedules;
