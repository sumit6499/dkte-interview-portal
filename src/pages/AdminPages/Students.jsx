import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "../NavBar/NavBar"
import { MaleUser } from '@/assets/';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AdminStudentsNavlinks } from '@/components/variables/formVariables';
function Students() {
    // const history = useHistory();
    const navigate = useNavigate();
    

    const [searchInput, setSearchInput] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [studentsData, setStudentsData] = useState([]);

    // const [selectedStudent,setSelectedStudent] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('');
    //         if (Array.isArray(response.data)) {
    //             setStudentsData(response.data);
    //         } else {
    //             console.error('Error: Response data is not an array:', response.data);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching the data:', error);
    //     }
    // };

    //Testing
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/students');
            if (Array.isArray(response.data)) {
                setStudentsData(response.data);
            } else {
                console.error('Error: Response data is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching the data:', error);
        }
    };

    
    const filteredStudents = studentsData.filter(student =>
        student.prn.includes(searchInput) &&
        (selectedBranch === '' || student.branch === selectedBranch) &&
        (selectedClass === '' || student.class === selectedClass)
    );

    return (
        <>
            <NavBar links={AdminStudentsNavlinks} />

            {/* <div className="bg-zinc-100"> */}
                <div className="container mx-auto px-4 bg-zinc-100">
                    <header className="py-5">
                        <h1 className="text-3xl font-bold text-center">Students</h1>
                    </header>
                    <div>
                        <div className="bg-yellow-400 p-5 rounded-lg  shadow-md  fixed top-20 left-0 w-full   z-50">
                        <div className="flex gap-4 mb-4 mr-3">
                            <input type="text" placeholder="Search by PRN" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="flex-1 p-2 rounded border border-zinc-300" />

                        </div>
                        <div className='flex space-x-4'>
                            <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} className="p-2 rounded border border-zinc-300">
                                <option value="">All Branches</option>
                                <option value="CSE - AI">CSE - AI</option>
                                <option value="ECE">ECE</option>
                            </select>
                            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="p-2 rounded border border-zinc-300">
                                <option value="">All Classes</option>
                                <option value="TY">TY</option>
                                <option value="SY">SY</option>
                                <option value="FY">FY</option>
                            </select>
                        </div>
                    </div>
                    </div>
                    <div className="mt-20 bg-zinc-100">
                        {filteredStudents.map(student => (
                            <div key={student.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                <div className="flex items-center justify-between space-x-4 py-2 border-b border-zinc-200 h-6">
                                    <div className="flex items-center space-x-2">
                                        <img src={MaleUser} alt="Profile" className="rounded-full h-6" />
                                        <div className='flex '>
                                            <p className="font-semibold pr-2">{student.name}</p>
                                            <p className="text-sm text-zinc-600">{student.prn}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm">{student.branch}</p>
                                        <p className="text-sm">{student.class}</p>
                                    </div>
                                    <button onClick={() => {
                                        const gotoSchedule = (student) => {
                                            navigate('/login/admin/interviewschedules', {
                                                state: {
                                                    student: student
                                                }
                                            });
                                        };
                                        gotoSchedule(student);
                                    }} className="bg-blue-500 text-white pb-1 mb-3 px-2 py-0.6 rounded">
                                        Schedule meeting
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
           
        </>
    );

}


export default Students;