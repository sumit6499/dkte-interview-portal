
import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import '@/App.css'

import { StudentHomeNavlinks } from '@/components/variables/formVariables';
import Schedule from '@/components/ui/Schedules';


const StudentHome = () => {
   
    const drop = true;

    return (
        <>
            <NavBar links={StudentHomeNavlinks} drop={drop} />
            <div className="bg-zinc-100 h-screen">
                <div className="flex h-screen">

                    <Schedule />
                </div>
            </div>
        </>
    );
};

export default StudentHome;
