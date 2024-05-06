
import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import '@/App.css'
import Schedule from '@/components/ui/Schedules';
import { AdminSchedulesNavlinks } from '@/components/variables/formVariables';

const AdminSchedules = () => {
    
    const drop = true;

    return (
        <>
            <NavBar links={AdminSchedulesNavlinks} drop={drop} />
            <div className="bg-zinc-100 h-screen">
                <div className="flex h-screen">

                    <Schedule />
                </div>
            </div>
        </>
    );
};

export default AdminSchedules;
