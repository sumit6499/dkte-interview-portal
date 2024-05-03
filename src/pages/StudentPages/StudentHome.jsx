
import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { StudentHomePicture } from '@/assets/index.js';


const BUTTON_CLASS = 'bg-yellow-400 text-white px-4 py-2 rounded';
const HOVER_CLASS = 'hover:bg-zinc-700';
const PROFILE_MENU_CLASS = 'absolute right-0 top-full bg-white text-black w-32 p-2 rounded hidden';


const MainContent = () => {
   
    return (
        <>
        <div className="flex-1 p-10 justify-center">
            <div className="flex justify-center items-center ">
                <div className="flex space-x-4 just">
                    <button className={BUTTON_CLASS}>Today's Interview</button>
                    <button className={BUTTON_CLASS}>Upcoming Interview</button>
                    <button className={BUTTON_CLASS}>Interviews History</button>
                </div>
            </div>
                <div className="mt-10 flex justify-center">
                    <img src={StudentHomePicture} alt="Interview Illustration" />
            </div>
        </div>
        </>
    );
};

const StudentHome = () => {
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Schedules', url: '/StudentHome' },
        { label: 'DashBoard', url: '/StudentDashboard' },
        { label: 'Contact', url: '/' }
    ];
    const drop = true;
    
    return (
        <>
            <NavBar links={links} drop={drop} />
            <div className="bg-zinc-100 h-screen">
                <div className="flex h-screen">

                    <MainContent />
                </div>
            </div>
        </>
    );
};

export default StudentHome;
