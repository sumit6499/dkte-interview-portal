import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import { MaleUser } from '@/assets/';
import { useNavigate } from 'react-router-dom';
import { AdminStudentsNavlinks } from '@/components/variables/formVariables';
import { selectCurrentToken } from '@/redux/authSlice';
import { useSelector } from 'react-redux';
import '@/App.css'
function StudentsList() {
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken);
    const [searchInput, setSearchInput] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [studentsData, setStudentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSmallScreen, setIsSmallerScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallerScreen(window.innerWidth <= 640);
        };
        checkScreenSize();
        window.addEventListener("resize",
            checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://dkte-interview-portal-api.vercel.app/api/v1/auth/students/all', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.success && Array.isArray(response.data.data)) {
                    setStudentsData(response.data.data);
                } else {
                    console.error('Fetched data is not an array:', response.data);
                    setError('Unexpected data format received from server.');
                }
            } catch (error) {
                console.error('Error fetching students data:', error);
                setError('Error fetching data from server. Please check your network connection or the server URL.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const filteredStudents = studentsData.filter(student =>
        student.PRN?.includes(searchInput) &&
        (selectedBranch === '' || student.dept === selectedBranch)
        //&& (selectedClass === '' || student.class === selectedClass)
    );

    const gotoSchedule = (student) => {
        navigate('/login/admin/interviewschedules', {
            state: {
                student: student
            }
        });
    };

    // console.log("student data is ", studentsData);

    return (
        <>
            <NavBar links={AdminStudentsNavlinks} drop={true} isAdmin={true} />

            <div className="container mx-auto px-4 bg-zinc-100">
                <header className="py-5">
                    <h1 className="text-3xl font-bold text-center">Students</h1>
                </header>
                <div>
                    <div className="bg-yellow-400 p-5 rounded-lg shadow-md fixed top-20 left-0 w-full z-50">
                        <div className="flex gap-4 mb-4 mr-3">
                            <input
                                type="text"
                                placeholder="Search by PRN"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="flex-1 p-2 rounded border border-zinc-300"
                            />
                        </div>
                        <div className='flex space-x-4'>
                            <select
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                className="p-2 rounded border border-zinc-300"
                            >
                                <option value="">All Branches</option>
                                <option value="CSE">CSE</option>
                                <option value="AI">AI</option>
                                <option value="AIDS">AIDS</option>
                                <option value="ENTC">ENTC</option>
                                <option value="MECH">MECH</option>
                                <option value="ELECTRIC">ELECTRIC</option>
                                <option value="ECE">ECE</option>
                                <option value="CIVIL">CIVIL</option>
                            </select>
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="p-2 rounded border border-zinc-300"
                            >
                                <option value="">All Classes</option>
                                <option value="TY">TY</option>
                                <option value="SY">SY</option>
                                <option value="FY">FY</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-20 bg-zinc-100">
                    {loading ? (
                        <p>Loading students...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : filteredStudents.length === 0 ? (
                        <p>No students found.</p>
                    ) : (
                        filteredStudents.map(student => (

                            <div key={student.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                {isSmallScreen ? <> <div className="flex items-center justify-between space-x-4 py-8 border-b border-zinc-200 h-6" id="student-card">
                                    <div className="flex items-center space-x-2">
                                        <img src={MaleUser} alt="Profile" className="rounded-full h-6" />
                                        <div className='flex '>
                                            <p className="font-semibold pr-2 mx-2">{student.name}</p>
                                            <p className="text-sm text-zinc-600 mx-2">{student.PRN}</p>
                                            <p className="text-sm mx-2">{student.dept}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm">{student.class}</p>
                                    </div>
                                </div>
                                    <div className='flex justify-center'>
                                        <button
                                            onClick={() => gotoSchedule(student)}
                                            className="bg-blue-500 text-white pb-1 mb-3 px-2 py-0.6 rounded h-auto w-auto " id="schedule-button"
                                        >
                                            Schedule meeting
                                        </button>
                                    </div>

                                </> : <div className="flex items-center justify-between space-x-4 py-2 border-b border-zinc-200 h-6" id="student-card">
                                    <div className="flex items-center space-x-2">
                                        <img src={MaleUser} alt="Profile" className="rounded-full h-6" />
                                        <div className='flex '>
                                            <p className="font-semibold pr-2">{student.name}</p>
                                            <p className="text-sm text-zinc-600">{student.PRN}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm">{student.dept}</p>
                                        <p className="text-sm">{student.class}</p>
                                    </div>
                                    <button
                                        onClick={() => gotoSchedule(student)}
                                        className="bg-blue-500 text-white pb-1 mb-3 px-2 py-0.6 rounded h-auto w-auto" id="schedule-button"
                                    >
                                        Schedule meeting
                                    </button>
                                </div>}

                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default StudentsList;
