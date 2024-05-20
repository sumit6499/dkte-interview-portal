import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import '@/App.css'
import Schedule from '@/components/ui/Schedules';
import { AdminSchedulesNavlinks } from '@/components/variables/formVariables';
import axios from 'axios';
import { selectCurrentToken } from '@/redux/authSlice';
import { useSelector } from 'react-redux';
const AdminSchedules = () => {
    const drop = true;
    const token = useSelector(selectCurrentToken)
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchInterviews('today'); // Fetch interviews for today initially
    }, []);

    const fetchInterviews = async (filterOption) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/auth/interview/:id/all?filter=${filterOption}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success && Array.isArray(response.data.data)) {
                setInterviews(response.data.data||[]);
            } else {
                console.error('Fetched data is not an array:', response.data);
                setError('Unexpected data format received from server.');
            }
            // setInterviews(response.data.data || []); // Set interviews to an empty array if null
        } catch (error) {
            console.error('Error fetching students data:', error);
            setError('Error fetching data from server. Please check your network connection or the server URL.');
        } finally {
            setLoading(false);
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
                    {interviews !== null &&
                     <Schedule interviews={interviews} onFilterChange={handleFilterChange} />}
                </div>
            </div>
        </>
    );
};

export default AdminSchedules;
