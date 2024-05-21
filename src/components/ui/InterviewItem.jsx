import React from 'react';
import { sharedClasses } from '../styles/sharedStyles';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@/redux/authSlice';
import { useState } from 'react';
const InterviewItem = ({ interview, onPerformanceClick, feedbackData }) => {
    
    const token = useSelector(selectCurrentToken)
    const handleDate = (Fulldate) => {
        var today = new Date(Fulldate);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = dd + '-' + mm + '-' + yyyy;
        return today;
    };

    const handleTime = (FullTime) => {
        var today = new Date(FullTime);
        var hh = String(today.getHours()).padStart(2, '0');
        var mm = String(today.getMinutes()).padStart(2, '0');
        var ss = String(today.getSeconds()).padStart(2, '0');
        today = hh + ':' + mm + ':' + ss;
        return today;
    };
    const fetchFeedBack = async (interviewerId) => {

        try {
            const response = await axios.get(`http://localhost:3000/api/v1/auth/interview/${interviewerId}/feedback`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data.data.feedback;
            const idData = response.data.data;
            console.log("for")
            console.log("feedback data is", data)
            feedbackData(data)
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleClick = async() => {
        onPerformanceClick(interview);
        console.log("i m inside handleclick ")
        console.log("THe interivew id is ",interview.id)
        await fetchFeedBack(interview.id)
    };
console.log("The interivew are ",interview)
    
    return (
        <li className={`${sharedClasses.flexItemsCenter} ${sharedClasses.justifyBetweenPy2} ${sharedClasses.borderB}`}>
            <div className={sharedClasses.flexItemsCenter}>
                <span className={`${sharedClasses.bgBlue500} ${sharedClasses.roundedFull} ${sharedClasses.w8} ${sharedClasses.h8} ${sharedClasses.mr4}`}></span>
                <div>
                    <p>Date: {handleDate(interview.startedAt)}</p>
                    <p >Start Time: {handleTime(interview.startedAt)}</p>
                </div>
            </div>
            <button onClick = {handleClick}className={`${sharedClasses.bgBlue500TextWhite} ${sharedClasses.px4} ${sharedClasses.py2} ${sharedClasses.roundedLg}`}>Performance</button>
        </li>
    );
};

export default InterviewItem;


