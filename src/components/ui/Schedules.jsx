import React, { useState } from "react";
import { HomePicture, MaleUser } from "@/assets";
import { useNavigate } from "react-router";

const Schedule = ({ interviews, onFilterChange }) => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('today');

    const handleFilterChange = (option) => {
        setSelectedOption(option);
        onFilterChange(option);
    };

    return (
        <>
            <div className="flex-1 p-10 justify-center items-center bg-zinc-100">
                <div className="flex justify-center items-center">
                    <div className="StudentHome flex space-x-4">
                        <button className={`bg-yellow-400 text-white px-12 py-3 rounded m-2 ml-6 ${selectedOption === 'today' && 'bg-yellow-300'}`} onClick={() => handleFilterChange('today')}>Today's Interview</button>
                        <button className={`bg-yellow-400 text-white px-12 py-3 rounded m-2 ${selectedOption === 'upcoming' && 'bg-yellow-300'}`} onClick={() => handleFilterChange('upcoming')}>Upcoming Interview</button>
                        <button className={`bg-yellow-400 text-white px-12 py-3 rounded m-2 ${selectedOption === 'history' && 'bg-yellow-300'}`} onClick={() => handleFilterChange('history')}>Interviews History</button>
                    </div>
                </div>
                <div>
                    <div className="mt-20 bg-zinc-100">
                        {interviews.map(interview => (
                            <div key={interview.id} className="bg-white p-4 rounded-lg shadow-md mb-1">
                                <div className="flex items-center justify-between space-x-4 py-2 border-b border-zinc-200 h-6">
                                    <div className="flex items-center space-x-6">
                                        <img src={MaleUser} alt="Profile" className="rounded-full h-6" />
                                        <div className='flex space-x-6'>
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
