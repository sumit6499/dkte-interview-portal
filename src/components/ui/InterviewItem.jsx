import React from 'react';
import { sharedClasses } from '../styles/sharedStyles';
import { useNavigate } from 'react-router';

const InterviewItem = ({ interview , onPerformanceClick}) => {
    // const {interview}  = props;
    // console.log(interview);
    // const navigate = useNavigate();

    const handleClick = () =>{
        onPerformanceClick(interview);
    };


    
    return (
        <li className={`${sharedClasses.flexItemsCenter} ${sharedClasses.justifyBetweenPy2} ${sharedClasses.borderB}`}>
            <div className={sharedClasses.flexItemsCenter}>
                <span className={`${sharedClasses.bgBlue500} ${sharedClasses.roundedFull} ${sharedClasses.w8} ${sharedClasses.h8} ${sharedClasses.mr4}`}></span>
                <div>
                    <p>Date: {interview.date}</p>
                    <p >Time: {interview.time}</p>
                </div>
            </div>
            <button onClick = {handleClick}className={`${sharedClasses.bgBlue500TextWhite} ${sharedClasses.px4} ${sharedClasses.py2} ${sharedClasses.roundedLg}`}>Performance</button>
        </li>
    );
};

export default InterviewItem;


