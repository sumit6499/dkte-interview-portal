
import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import '@/App.css'


import Schedule from '@/components/ui/Schedules';


const StudentHome = () => {
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Schedules', url: '/login/student/studenthome' },
        { label: 'DashBoard', url: '/login/student/dashboard' },
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

export default StudentHome;
