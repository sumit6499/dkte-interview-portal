
import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import '@/App.css'
import Schedule from '@/components/ui/Schedules';
import { InterviewerProfileNavLinks } from '@/components/variables/formVariables';

const InterviewerIntervieweSchedules = () => {
    
    const drop = true;

    return (
        <>
            <NavBar links={InterviewerProfileNavLinks} drop={drop} />
            <div className="bg-zinc-100 h-screen">
                <div className="flex h-screen">

                    <Schedule />
                </div>
            </div>
        </>
    );
};

export default InterviewerIntervieweSchedules;
