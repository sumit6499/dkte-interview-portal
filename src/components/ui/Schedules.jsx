import React, { useEffect, useState } from "react";
import { HomePicture, MaleUser } from "@/assets";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/authSlice";

const Schedule = ({ interviews = [], onFilterChange, isStudentSchedules, studentsInterviews = [], stdLoading, stdError,  }) => {
    const token = useSelector(selectCurrentToken);
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('today');
    const [loading1, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [studentData, setStudentData] = useState([]);

    const handleFilterChange = (option) => {
        onFilterChange(option);
        setSelectedOption(option);
        
    };

    const fetchStudentData = async (studentId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/auth/students/${studentId}/info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching student data:', error);
            setError('Error fetching data from server. Please check your network connection or the server URL.');
        }
    };

    useEffect(() => {
        if (!isStudentSchedules && interviews.length > 0) {
            const loadStudentData = async () => {
                setLoading(true);
                setError(null);

                try {
                    const studentDataPromises = interviews.map(interview => fetchStudentData(interview.studentId));
                    const studentDataArray = await Promise.all(studentDataPromises);
                    console.log("The student data is ", studentDataArray);
                    setStudentData(studentDataArray);
                } catch (error) {
                    console.error('Error loading student data:', error);
                    setError('Error loading student data.');
                } finally {
                    setLoading(false);
                }
            };

            loadStudentData();
        } else {
            setLoading(false);
        }
    }, [interviews, token, isStudentSchedules]);
function handleDate(Fulldate)
{
    // const dateToDisplay = new Date(Fulldate)

    var today = new Date(Fulldate);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    return today;
}
function handleTime(FullTime)
{
    var today = new Date(FullTime);
    var hh = String(today.getHours()).padStart(2, '0');
    var mm = String(today.getMinutes()).padStart(2, '0');
    var ss = String(today.getSeconds()).padStart(2, '0');
    today = hh + ':' + mm + ':' + ss;
    return today;
}

    console.log("stdinter ", studentsInterviews)
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
                    {loading1 && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {!loading1 && !error && interviews.length === 0 && <p>No interviews available.</p>}
                    {!loading1 && !error && studentData.length > 0 && interviews.length > 0 && interviews.map((interview, index) => {
                        const student = studentData[index];
                        return (
                            <div key={interview.id} className="bg-white p-4 rounded-lg shadow-md mb-1">
                                <div className="flex items-center justify-between space-x-4 py-2 border-b border-zinc-200 h-6">
                                    <div className="flex items-center space-x-6">
                                        <img src={MaleUser} alt="Profile" className="rounded-full h-6" />
                                        <div className='flex space-x-6'>
                                            <p className="text-sm text-zinc-600">{student?.data?.PRN}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-10">
                                        <p className="text-sm">{student?.data?.dept}</p>
                                        <p className="text-sm">TY</p>
                                    </div>
                                    <button onClick={() => {
                                        navigate('/', {
                                            state: {
                                                interview: interview
                                            }
                                        });
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
                    {stdLoading && <p>Loading...</p>}
                    {stdError && <p>{stdError}</p>}
                     {!stdLoading && !stdError&&studentsInterviews.length === 0 && <p>No interviews available.</p>}
                    {studentsInterviews.length > 0 && studentsInterviews.map((interview) => (
                        
                        <div key={interview.id} className="bg-white p-4 rounded-lg shadow-md mb-1">
                            <div className="flex items-center justify-between space-x-4 py-2 border-b border-zinc-200 h-6">
                                <div className="flex items-center space-x-6">
                                    <img src={MaleUser} alt="Profile" className="rounded-full h-6" />
                                    <div className='flex space-x-6'>
                                        <p className="text-sm text-zinc-600">{handleDate(interview.date)}</p>
                                        <p className="text-sm">{`Starts At `+handleTime(interview.startedAt)}</p>
                                    </div>
                                </div>
                                {/* <div className="flex items-center space-x-10">
                                    <p className="text-sm">{interview.startAt}</p>
                                    <p className="text-sm">TY</p>
                                </div> */}
                                <button onClick={() => {
                                    navigate('/', {
                                        state: {
                                            interview: interview
                                        }
                                    });
                                }} className="bg-blue-500 text-white pb-1 mb-3 px-2 py-0.6 rounded">
                                    Join Link
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Schedule;
