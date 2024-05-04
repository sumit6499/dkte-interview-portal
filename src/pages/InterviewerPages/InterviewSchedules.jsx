
import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import '@/App.css'
import Schedule from '@/components/ui/Schedules';


const InterviewerIntervieweSchedules = () => {
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Students', url: '/login/interviewer/students' },
        { label: 'Schedules', url: '/login/interviewer/schedules' },
        { label: 'Contact', url: '/' }
    ];


    const drop = true;

    return (
        <>
            <NavBar links={links} drop={drop} />
            <div className="bg-zinc-100 h-screen">
                <div className="flex h-screen">

                    <Schedule />
                </div>
            </div>
        </>
    );
};

export default InterviewerIntervieweSchedules;
