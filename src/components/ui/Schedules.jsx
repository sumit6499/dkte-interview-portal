import React, { useEffect, useState, useMemo } from "react";
import { MaleUser } from "@/assets";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectAllUsers, selectCurrentToken } from "@/redux/authSlice";
import axios from "axios";

const Schedule = ({ interviews = [], onFilterChange, isStudentSchedules, studentsInterviews = [], loading, error1, stdLoading, stdError }) => {
    const users = useSelector(selectAllUsers)
    const token = useSelector(selectCurrentToken);
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('today');
    const [error, setError] = useState(null);
    const [studentData, setStudentData] = useState([]);
    const [newCombineData, setNewCombineData] = useState([]);
    const [ObtainedData, setObtainedData] = useState([]);

    function handleStudentName(studentId) {
        let Name;
        users.map((user, index) => {
            if (user.Uid == studentId) {
                console.log("hi i m here finall")
                console.log("the name is " + user.Name);
                Name = user.Name
            }
        })
        return Name;
    }
    function handleStudentPRN(studentId) {
        let prn;
        users.map((user, index) => {
            if (user.Uid == studentId) {
                prn = user.PRN
            }
        })
        return prn;
    }
    function handleStudentDept(studentId) {
        let dept;
        users.map((user, index) => {
            if (user.Uid == studentId) {
                dept = user.Dept
            }
        })
        return dept;
    }
    const handleFilterChange = (option) => {
        onFilterChange(option);
        setSelectedOption(option);
    };

    const handleDate = (Fulldate) => {
        var today = new Date(Fulldate);
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = dd + '-' + mm + '-' + yyyy;
        return today;
    };

    const handleTime = (FullTime) => {
        var today = new Date(FullTime);
        var hh = String(today.getHours()).padStart(2, '0');
        var mm = String(today.getMinutes()).padStart(2, '0');
        var ss = String(today.getSeconds()).padStart(2, '0');
        today = hh + ':' + mm + ':' + ss;
        return today;
    };

    const memoizedStudentInterviews = useMemo(() => {
        return studentsInterviews.map(interview => ({
            ...interview,
            handleDate: handleDate(interview.date),
            handleTime: handleTime(interview.startedAt)
        }));
    }, [studentsInterviews]);

   

   

    console.log("the interviews in here ", interviews)
    return (
        <div className="flex-1 p-10 justify-center items-center bg-zinc-100">
            <div className="flex justify-center items-center">
                <div className="StudentHome flex space-x-4">
                    <button
                        className={`bg-yellow-400 text-white px-12 py-3 rounded m-2 ml-6 ${selectedOption === 'today' && 'bg-yellow-300'}`}
                        onClick={() => handleFilterChange('today')}
                    >
                        Today's Interview
                    </button>
                    <button
                        className={`bg-yellow-400 text-white px-12 py-3 rounded m-2 ${selectedOption === 'upcoming' && 'bg-yellow-300'}`}
                        onClick={() => handleFilterChange('upcoming')}
                    >
                        Upcoming Interview
                    </button>
                    <button
                        className={`bg-yellow-400 text-white px-12 py-3 rounded m-2 ${selectedOption === 'history' && 'bg-yellow-300'}`}
                        onClick={() => handleFilterChange('previous')}
                    >
                        Interviews History
                    </button>
                </div>
            </div>
            {!isStudentSchedules ? (
                <div className="mt-20 bg-zinc-100">
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && interviews.length === 0  && <p>No interviews available.</p>}
                    {interviews.length > 0 && interviews.map((interview, index) => {
                        const student = interviews[index];
                        return (
                            <div key={interview.id} className="bg-white p-4 rounded-lg shadow-md mb-1">
                                <div className="flex items-center justify-between space-x-4 py-2 border-b border-zinc-200 h-6">
                                    <div className="flex items-center space-x-6">
                                        <img src={MaleUser} alt="Profile" className="rounded-full h-6" />
                                        <div className='flex space-x-6'>
                                            <p className="text-sm text-zinc-600">{handleStudentName(student.studentId)}</p>
                                            <p className="text-sm text-zinc-600">{handleStudentPRN(student.studentId)}</p>
                                            <p className="text-sm text-zinc-600">{handleStudentDept(student.studentId)}</p>
                                            <p className="text-sm text-zinc-600">{handleDate(student.date)}</p>
                                            <p className="text-sm text-zinc-600">Starts At      {handleTime(student.startedAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-10">
                                       
                                    </div>
                                    
                                    <button onClick={async () => {
                                        const linkToJoin = student.link;
                                        const studentIdForResume = interview.studentId;
                                        const ResumeLink = await getResumeLink(studentIdForResume);
                                        console.log("The resume link is", ResumeLink);
                                        // window.open(ResumeLink, '_blank');
                                        window.open(linkToJoin, '_blank');
                                        
                                        // window.open(ResumeLink, '_blank');
                                        setTimeout(() => {
                                            
                                            navigate('/eval', {
                                                state: {
                                                    interview: interview
                                                }
                                            });
                                        }, 500); // Delay for 500 milliseconds
                                    }} className="bg-blue-500 text-white pb-1 mb-3 px-2 py-0.6 rounded">
                                        Join Link
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                    <div className="mt-20 bg-zinc-100">
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {!loading && !error && interviews.length === 0 && <p>No interviews available.</p>}
                        {interviews.length > 0 && interviews.map((interview, index) => {
                            const student = interviews[index];
                            console.log("THe std i s", student.date)
                            return (
                                <div key={interview.id} className="bg-white p-4 rounded-lg shadow-md mb-1">
                                    <div className="flex items-center justify-between space-x-4 py-2 border-b border-zinc-200 h-6">
                                        <div className="flex items-center space-x-6">
                                            <img src={MaleUser} alt="Profile" className="rounded-full h-6" />
                                            <div className='flex space-x-6'>
                                                
                                                <p className="text-sm text-zinc-600">{handleDate(student.date)}</p>
                                                {selectedOption === "previous" ? <p className="text-sm text-zinc-600">Started At      {handleTime(student.startedAt)}</p> : <p className="text-sm text-zinc-600">Starts At      {handleTime(student.startedAt)}</p>}
                                               
                                            </div>
                                        </div>
                                        {selectedOption === "previous" ? <button onClick={() => {
                                            navigate('/login/student/dashboard', {
                                                state: {
                                                    interview: interview
                                                }
                                            });
                                            
                                        }} className="bg-blue-500 text-white pb-1 mb-3 px-2 py-0.6 rounded">
                                           Performance
                                        </button> : <button onClick={() => {
                                            const linkToJoin = student.link;
                                            window.open(linkToJoin, '_blank');
                                            // navigate('/eval', {
                                            //     state: {
                                            //         interview: interview
                                            //     }
                                            // });
                                        }} className="bg-blue-500 text-white pb-1 mb-3 px-2 py-0.6 rounded">
                                            Join Link
                                        </button>}
                                       
                                    </div>
                                </div>
                            );
                        })}
                    </div>
            )}
        </div>
    );
};

export default Schedule;
