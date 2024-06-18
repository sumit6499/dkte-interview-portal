import React, { useEffect, useState, useMemo } from "react";
import { MaleUser } from "@/assets";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectAllUsers, selectCurrentToken } from "@/redux/authSlice";
import '@/App.css';

const Schedule = ({
    interviews = [],
    onFilterChange,
    isStudentSchedules,
    studentsInterviews = [],
    loading,
    TimeOption,
    isAdmin,
}) => {
  console.log("tiomner ooption sis ",TimeOption)
    const users = useSelector(selectAllUsers);
    const token = useSelector(selectCurrentToken);
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('today');
    const [error, setError] = useState(null);
    const [isSmallScreen, setIsSmallerScreen] = useState(false);
    const [isPrevious,setIsPrevious] = useState(false);
    function handleStudentName(studentId) {
        let Name;
        users.forEach((user) => {
            if (user.Uid === studentId) {
                Name = user.Name;
            }
        });
        return Name;
    }

    function handleStudentPRN(studentId) {
        let prn;
        users.forEach((user) => {
            if (user.Uid === studentId) {
                prn = user.PRN;
            }
        });
        return prn;
    }

    function handleStudentDept(studentId) {
        let dept;
        users.forEach((user) => {
            if (user.Uid === studentId) {
                dept = user.Dept;
            }
        });
        return dept;
    }

    const handleFilterChange = (option) => {
        setSelectedOption(option);
      
        console.log("the changes is ",selectedOption)
        if (onFilterChange && option!='previous') {
            onFilterChange(option);
        }
        else if(option=="previous")
            {
                console.log("hi i m here dear ")
                setIsPrevious(true);
            }
        console.log("the isprevious is in fuction", isPrevious)
    };
    function PreviousChange() {
        setIsPrevious(true);
    }
    const handleHistory =()=>{
        PreviousChange();
        handleFilterChange('previous');
        console.log("the isprevious is in fuction in hisotry ", isPrevious)
    }
   
    const handleDate = (Fulldate) => {
        const today = new Date(Fulldate);
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    };

    const handleTime = (FullTime) => {
        const today = new Date(FullTime);
        const hh = String(today.getHours()).padStart(2, '0');
        const mm = String(today.getMinutes()).padStart(2, '0');
        const ss = String(today.getSeconds()).padStart(2, '0');
        return `${hh}:${mm}:${ss}`;
    };

    const memoizedStudentInterviews = useMemo(() => {
        return studentsInterviews.map(interview => ({
            ...interview,
            handleDate: handleDate(interview.date),
            handleTime: handleTime(interview.startedAt)
        }));
    }, [studentsInterviews]);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallerScreen(window.innerWidth <= 640);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);
    useEffect(() => {
        if(isPrevious)
            {
                // onFilterChange('previous');
                // setIsPrevious(false);
            console.log("the isprevious is in effect", isPrevious)///gives true
            onFilterChange('previous');
            console.log("the isprevious is in effect after", isPrevious)
            }
    }, [isPrevious]);

    console.log("tiomner ooption sis after", TimeOption)

console.log("the isprevious outside",isPrevious)//gives false why?

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
                        className={`bg-yellow-400 text-white px-12 py-3 rounded m-2 ${selectedOption === 'previous' && 'bg-yellow-300'}`}
                        onClick={() => handleFilterChange('previous')
                            
                        }
                    >
                        Interviews History
                    </button>
                </div>
            </div>

            {!isStudentSchedules ? (
                isSmallScreen ? (
                    <div className="mt-20 bg-zinc-100" id="scheduleAdInt">
                        {loading && <p className="text-center text-lg font-semibold">Loading...</p>}
                        {error && <p className="text-center text-lg text-red-500">{error}</p>}
                        {!loading && !error && interviews.length === 0 && <p className="text-center text-lg">No interviews available.</p>}
                        {interviews.length > 0 && interviews.map((interview) => {
                            return (
                                <div key={interview.id} className="p-4 rounded-lg shadow-md mb-4 bg-white border border-zinc-200">
                                    <div className="flex flex-col items-start space-y-2 pb-2 border-b border-zinc-200 mb-2">
                                        <div className="flex items-center space-x-4 mb-2">
                                            <img src={MaleUser} alt="Profile" className="rounded-full h-10 w-10" />
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-base text-zinc-800 font-semibold">{handleStudentName(interview.studentId)}</p>
                                                <p className="text-sm text-zinc-600">{handleStudentPRN(interview.studentId)}</p>
                                                <p className="text-sm text-zinc-600">{handleStudentDept(interview.studentId)}</p>
                                                <p className="text-sm text-zinc-600">{handleDate(interview.date)}</p>
                                                <p className="text-sm text-zinc-600">Starts At {handleTime(interview.startedAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <button onClick={async () => {
                                            const linkToJoin = interview.link;
                                            window.open(linkToJoin, '_blank');
                                            if (!isAdmin) {
                                                setTimeout(() => {
                                                    navigate('/eval', {
                                                        state: { interview }
                                                    });
                                                }, 500);
                                            }
                                        }} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200 ease-in-out">
                                            Join Link
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="mt-20 bg-zinc-100" id="scheduleAdInt">
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {!loading && !error && interviews.length === 0 && <p>No interviews available.</p>}
                        {interviews.length > 0 && interviews.map((interview) => {
                            return (
                                <div key={interview.id} className="bg-white p-4 rounded-lg shadow-md mb-1">
                                    <div className="flex items-center justify-between space-x-4 py-2 border-b border-zinc-200 h-6">
                                        <div className="flex items-center space-x-6">
                                            <img src={MaleUser} alt="Profile" className="rounded-full h-6" />
                                            <div className="flex space-x-6">
                                                <p className="text-sm text-zinc-600">{handleStudentName(interview.studentId)}</p>
                                                <p className="text-sm text-zinc-600">{handleStudentPRN(interview.studentId)}</p>
                                                <p className="text-sm text-zinc-600">{handleStudentDept(interview.studentId)}</p>
                                                <p className="text-sm text-zinc-600">{handleDate(interview.date)}</p>
                                                <p className="text-sm text-zinc-600">Starts At {handleTime(interview.startedAt)}</p>
                                            </div>
                                        </div>
                                        <button onClick={async () => {
                                            const linkToJoin = interview.link;
                                            window.open(linkToJoin, '_blank');
                                            if (!isAdmin) {
                                                setTimeout(() => {
                                                    navigate('/eval', {
                                                        state: { interview }
                                                    });
                                                }, 500);
                                            }
                                        }} className="bg-blue-500 text-white pb-1 mb-3 px-2 py-0.6 rounded">
                                            Join Link
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            ) : (
                isSmallScreen ? (
                    <div className="mt-20 bg-zinc-100">
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {!loading && !error && interviews.length === 0 && <p>No interviews available.</p>}
                        {interviews.length > 0 && interviews.map((interview) => {
                            return (
                                <div key={interview.id} className="p-4 rounded-lg shadow-md mb-4 bg-white border border-zinc-200">
                                    <div className="flex flex-col items-start space-y-2 pb-2 border-b border-zinc-200 mb-2">
                                        <div className="flex items-center space-x-4 mb-2">
                                            <img src={MaleUser} alt="Profile" className="rounded-full h-10 w-10" />
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-base text-zinc-800 font-semibold">{handleDate(interview.date)}</p>
                                                {TimeOption == "previous" ? (
                                                    <p className="text-sm text-zinc-600">Started At {handleTime(interview.startedAt)}</p>
                                                ) : (
                                                    <p className="text-sm text-zinc-600">Starts At {handleTime(interview.startedAt)}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        {TimeOption == "previous"  ? (
                                            <button onClick={() => {
                                                navigate('/login/student/dashboard', {
                                                    state: { interview }
                                                });
                                            }} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200 ease-in-out">
                                                Performance
                                            </button>
                                        ) : (
                                            <button onClick={() => {
                                                console.log("THe previous is ",isPrevious)
                                                const linkToJoin = interview.link;
                                                window.open(linkToJoin, '_blank');
                                            }} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200 ease-in-out">
                                                Join Link
                                            </button>
                                        )}
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
                        {interviews.length > 0 && interviews.map((interview) => {
                            return (
                                <div key={interview.id} className="bg-white p-4 rounded-lg shadow-md mb-1">
                                    <div className="flex items-center justify-between space-x-4 py-2 border-b border-zinc-200 h-6">
                                        <div className="flex items-center space-x-6">
                                            <img src={MaleUser} alt="Profile" className="rounded-full h-6" />
                                            <div className="flex space-x-6">
                                                <p className="text-sm text-zinc-600">{handleDate(interview.date)}</p>
                                                {TimeOption == "previous" ? (
                                                    <p className="text-sm text-zinc-600">Started At {handleTime(interview.startedAt)}</p>
                                                ) : (
                                                    <p className="text-sm text-zinc-600">Starts At {handleTime(interview.startedAt)}</p>
                                                )}
                                            </div>
                                        </div>
                                        {TimeOption =="previous" ? (
                                            
                                            <button onClick={() => {
                                                navigate('/login/student/dashboard', {
                                                    state: { interview }
                                                });
                                            }} className="bg-blue-500 text-white pb-1 mb-3 px-2 py-0.6 rounded">
                                                Performance
                                            </button>
                                        ) : (
                                            <button onClick={() => {
                                                    console.log("the TimeOption us ", TimeOption);
                                                const linkToJoin = interview.link;
                                                window.open(linkToJoin, '_blank');
                                            }} className="bg-blue-500 text-white pb-1 mb-3 px-2 py-0.6 rounded">
                                                Join Link
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            )}
        </div>
    );
};

export default Schedule;
