import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import '@/App.css'
import Schedule from '@/components/ui/Schedules';
import { AdminSchedulesNavlinks } from '@/components/variables/formVariables';
import axios from 'axios';

const AdminSchedules = () => {
    const drop = true;
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        fetchInterviews('today'); // Fetch interviews for today initially
    }, []);

    const fetchInterviews = async (filterOption) => {
        try {
            const response = await axios.get(`/api/interview/all?filter=${filterOption}`);
            setInterviews(response.data.interviews || []); // Set interviews to an empty array if null
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
            <NavBar links={AdminSchedulesNavlinks} drop={drop} />
            <div className="bg-zinc-100 h-screen">
                <div className="flex h-screen">
                    {interviews !== null && <Schedule interviews={interviews} onFilterChange={handleFilterChange} />}
                </div>
            </div>
        </>
    );
};

export default AdminSchedules;
