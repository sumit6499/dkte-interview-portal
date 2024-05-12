import React, { useState } from "react";
import { HomePicture, MaleUser } from "@/assets";
import { useNavigate } from "react-router";
const Schedule = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('today');
    const interviews = [
        { id: 0, name: "Pramod Mahajan", prn: "21uai1", branch: "ai", class: "TY", dateTime: "2024-05-07T09:00:00" },
        { id: 1, name: "Interview 2", prn: "21uai2", branch: "ai", class: "TY", dateTime: "2024-05-08T10:00:00" },
        { id: 2, name: "Interview 3", prn: "21uai3", branch: "ai", class: "TY", dateTime: "2024-05-09T11:00:00" },
        { id: 3, name: "Pramod Mahajan", prn: "21uai4", branch: "cs", class: "FY", dateTime: "2024-05-10T09:30:00" },
        { id: 4, name: "Interview 5", prn: "21uai5", branch: "cs", class: "FY", dateTime: "2024-05-11T10:30:00" },
        { id: 5, name: "Interview 6", prn: "21uai6", branch: "cs", class: "FY", dateTime: "2024-05-12T11:30:00" },
        { id: 6, name: "Interview 7", prn: "21uai7", branch: "ec", class: "SY", dateTime: "2024-05-13T09:45:00" },
        { id: 7, name: "Interview 8", prn: "21uai8", branch: "ec", class: "SY", dateTime: "2024-05-14T10:45:00" },
        { id: 8, name: "Interview 9", prn: "21uai9", branch: "ec", class: "SY", dateTime: "2024-05-6T11:45:00" },
        { id: 9, name: "Interview 10", prn: "21uai10", branch: "mech", class: "FY", dateTime: "2024-05-7T22:00:00" },
        // Add more entries as needed
    ];


    const filterInterviews = () => {
        switch (selectedOption) {
            case 'today':
                return interviews.filter(interview => {
                    const today = new Date().toISOString().split('T')[0];
                    return interview.dateTime.split('T')[0] === today;
                });

            case 'upcoming':
                return interviews.filter(interview => {
                    const today = new Date();
                    const interviewDate = new Date(interview.dateTime);
                    return interviewDate > today;
                });
            case 'history':
                return interviews.filter(interview => {
                    const today = new Date();
                    const interviewDate = new Date(interview.dateTime);
                    return interviewDate < today;
                });
            default:
                return [];
        }
    };

    const filteredInterviews = filterInterviews();

    return (
        <>

            <div className=" flex-1 p-10 justify-center items-center bg-zinc-100">
                <div className=" flex justify-center items-center ">
                    <div className="StudentHome flex  space-x-4 ">

                        <button className={`bg-yellow-400 text-white px-12  py-3 rounded m-2 ml-6 ${selectedOption === 'today' && 'bg-yellow-300'}`} onClick={() => setSelectedOption('today')}>Today's Interview</button>

                        <button className={`bg-yellow-400 text-white px-12 py-3 rounded m-2 ${selectedOption === 'upcoming' && 'bg-yellow-300'}`} onClick={() => setSelectedOption('upcoming')}>Upcoming Interview</button>
                        <button className={`bg-yellow-400 text-white px-12 py-3 rounded m-2 ${selectedOption === 'history' && 'bg-yellow-300'}`} onClick={() => setSelectedOption('history')}>Interviews History</button>
                    </div>
                </div>
                <div>
                    <div className="mt-20 bg-zinc-100">
                        {filteredInterviews.map(interview => (
                            <div key={interview.id} className="bg-white p-4 rounded-lg shadow-md mb-1    ">
                                <div className="flex items-center justify-between space-x-4 py-2 border-b border-zinc-200 h-6">
                                    <div className="flex items-center space-x-6">
                                        <img src={MaleUser} alt="Profile" className="rounded-full h-6" />
                                        <div className='flex space-x-6 '>
                                            <p className="font-semibold pr-2">{interview.name}</p>
                                            <p className="text-sm text-zinc-600">{interview.prn}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-10">
                                        <p className="text-sm">{interview.branch}</p>
                                        <p className="text-sm">{interview.class}</p>
                                    </div>
                                    <button onClick={() => {
                                        const gotoSchedule = (interview) => {
                                            navigate('/', {
                                                state: {
                                                    interview: interview
                                                }
                                            });
                                        };
                                        gotoSchedule(interview);
                                    }} className="bg-blue-500 text-white pb-1 mb-3 px-2 py-0.6 rounded">
                                        Join Link
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="mt-10 flex justify-center w-full ">
                            <img src={HomePicture} alt="Interview Illustration" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Schedule;
