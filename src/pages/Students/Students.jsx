import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "../NavBar/NavBar"
import { MaleUser } from '@/assets/';

function Students() {
    const [searchInput, setSearchInput] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [studentsData, setStudentsData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            //  GET request 
            const response = await axios.get('');
            //  fetched data 
            setStudentsData(response.data);
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
        <div className="bg-zinc-100">
            <div className="container mx-auto px-4">
                <header className="py-5">
                    <h1 className="text-3xl font-bold text-center">Students</h1>
                </header>
                <div className="bg-yellow-400 p-5 rounded-lg shadow-md">
                    <div className="flex gap-4 mb-4">
                        <input type="text" placeholder="Search by PRN" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="flex-1 p-2 rounded border border-zinc-300" />
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
                <div className="mt-6">
                    {filteredStudents.map(student => (
                        <div key={student.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                            <div className="flex items-center space-x-4 py-2 border-b border-zinc-200">
                                <img src={MaleUser} alt="Profile" className="rounded-full" />
                                <div className="flex-1">
                                    <p className="font-semibold">{student.name}</p>
                                    <p className="text-sm text-zinc-600">{student.prn}</p>
                                </div>
                                <p className="text-sm">{student.branch}</p>
                                <p className="text-sm">{student.class}</p>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded">Schedule meeting</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Students;
