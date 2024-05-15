import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import '@/App.css'
import { StudentHomeNavlinks } from '@/components/variables/formVariables';
import Schedule from '@/components/ui/Schedules';
import axios from 'axios';

const StudentHome = () => {
    const drop = true;
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        fetchInterviews();
    }, []);

    const fetchInterviews = async (filterOption) => {
        try {
            const response = await axios.get(`/api/interview/all?filter=${filterOption}`);
            setInterviews(response.data.interviews);
        } catch (error) {
            console.error('Error fetching interviews:', error);
        }
    };

    const handleFilterChange = async (option) => {
        try {
            await fetchInterviews(option);
        } catch (error) {
            console.error('Error fetching interviews:', error);
        }
    };

    return (
        <>
            <NavBar links={StudentHomeNavlinks} drop={drop} />
            <div className="bg-zinc-100 h-screen">
                <div className="flex h-screen">
                    {interviews !== null && <Schedule interviews={interviews} onFilterChange={handleFilterChange} />}
                </div>
            </div>
        </>
    );
};

export default StudentHome;
