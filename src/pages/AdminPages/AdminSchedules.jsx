
import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { StudentHomePicture } from '@/assets/index.js';
import '@/App.css'

import Schedule from '@/components/ui/Schedules';


const AdminSchedules = () => {
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Students', url: '/login/admin/students' },
        { label: 'Schedules', url: '/login/admin/schedules' },
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

export default AdminSchedules;
