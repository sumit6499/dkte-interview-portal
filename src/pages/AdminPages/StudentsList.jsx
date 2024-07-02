import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import { MaleUser } from '@/assets/';
import { useNavigate } from 'react-router-dom';
import { AdminStudentsNavlinks } from '@/components/variables/formVariables';
import { selectCurrentToken } from '@/redux/authSlice';
import { useSelector } from 'react-redux';
import '@/App.css';
import { BASE_URL } from '@/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function StudentsList() {
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken);
    const [searchInput, setSearchInput] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [studentsData, setStudentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 640);
        };

        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/auth/students/all`, {
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
                setError('Error fetching data from server. Please check your network connection or the server URL. Try Reloading the Website');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    useEffect(() => {
        const handleScroll = () => {
            const offset = 70; // Adjust this value based on the height of your navbar
            if (window.scrollY > offset) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredStudents = studentsData.filter(student =>
        student.PRN?.includes(searchInput) &&
        (selectedBranch === '' || student.dept === selectedBranch)
    );

    const gotoSchedule = (student) => {
        navigate('/login/admin/interviewschedules', {
            state: {
                student: student
            }
        });
    };

    const renderSkeletons = (count) => {
        return Array.from({ length: count }).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center justify-between space-x-4 py-2 border-b border-zinc-200 h-6">
                    <div className="flex items-center space-x-2">
                        <Skeleton circle height={24} width={24} />
                        <div className='flex flex-col'>
                            <Skeleton width={100} />
                            <Skeleton width={60} />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Skeleton width={80} />
                        <Skeleton width={40} />
                    </div>
                    <Skeleton width={120} height={30} />
                </div>
            </div>
        ));
    };

    return (
        <>
            <NavBar links={AdminStudentsNavlinks} drop={true} isAdmin={true} className="z-20" />

            <div className={`container mx-auto px-4 bg-zinc-100 ${isSticky ? 'sticky-offset' : ''}`}>
                <header className="py-5">
                    <h1 className="text-3xl font-bold text-center">Students</h1>
                </header>
                <div>
                    <div className={`bg-yellow-400 p-5 rounded-lg shadow-md ${isSticky ? 'sticky-search-bar' : 'fixed top-20 left-0 w-full z-50'}`}>
                        <div className="flex gap-4 mb-4 mr-3">
                            <input
                                type="text"
                                placeholder="Search by PRN"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="flex-1 p-2 rounded border border-zinc-300"
                            />
                        </div>
                        <div className='flex space-x-4 z-10'>
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
                <div className="mt-20 bg-zinc-100 ">
                    {loading ? (
                        renderSkeletons(5)
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : filteredStudents.length === 0 ? (
                        <p>No students found.</p>
                    ) : (
                        filteredStudents.map(student => (
                            <div key={student.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                {isSmallScreen ? (
                                    <>
                                        <div className="flex items-center justify-between space-x-4 py-8 border-b border-zinc-200 h-6" id="student-card">
                                            <div className="flex items-center space-x-2">
                                                <img src={MaleUser} alt="Profile" className="rounded-full h-6" />
                                                <div className='flex'>
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
                                                className="bg-blue-500 text-white pb-1 mb-3 px-2 py-0.6 rounded h-auto w-auto" id="schedule-button"
                                            >
                                                Schedule meeting
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-between space-x-4 py-2 border-b border-zinc-200 h-6" id="student-card">
                                        <div className="flex items-center space-x-2">
                                            <img src={MaleUser} alt="Profile" className="rounded-full h-6" />
                                            <div className='flex'>
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
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default StudentsList;
