import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import '@/App.css'
import Schedule from '@/components/ui/Schedules';
import { AdminSchedulesNavlinks } from '@/components/variables/formVariables';
import axios from 'axios';
import Loader from '@/components/ui/loading';
import { selectCurrentToken,selectCurrentUid } from '@/redux/authSlice';

import { BASE_URL } from '@/api';
import { useSelector } from 'react-redux';
import {ToastContainer,toast} from 'react-toastify'
const AdminSchedules = () => {

    
    const drop = true;
    const isAdmin = true;
    const token = useSelector(selectCurrentToken)
    let localID;
    if (JSON.parse(localStorage.getItem('adminId') !== undefined).id){
        localID = JSON.parse(localStorage.getItem('adminId')).id
    }
   
    const id=useSelector(selectCurrentUid)||localID;
    console.log("The id is ",id)
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [option, setOption] = useState('today')

    useEffect(() => {
        fetchInterviews('today');
    }, []);


    const fetchInterviews = async (filterOption) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${BASE_URL}/api/v1/auth/interview/${id}/all?filter=${filterOption}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success && Array.isArray(response.data.data)) {
                console.log("The response is "+response.data.data)
                setInterviews(response.data.data || []);
            } else {
                console.error('Fetched data is not an array:', response.data);
                setError('Unexpected data format received from server.');
            }

        } catch (error) {
            console.error('Error fetching students data:', error);
            toast.error("Error fetching interviews")
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

    console.log("interviews", interviews)
    
    return (
        <>
            <NavBar links={AdminSchedulesNavlinks} drop={drop} isAdmin={isAdmin} />
            <ToastContainer/>
            {loading? (<Loader/>):(
            <div className="bg-zinc-100 h-screen">
                <div className="flex h-screen">
                    {interviews !== null &&
                        <Schedule
                            interviews={interviews}
                            onFilterChange={handleFilterChange}
                            loading1={loading}
                            error={error}
                            isAdmin={isAdmin}
                            
                        />}
                </div>
            </div>
            )}
        </>
    );
};

export default AdminSchedules;
