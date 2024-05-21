import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import InterviewItem from '@/components/ui/InterviewItem';
import { StudentDashboardNavlinks } from '@/components/variables/formVariables';
import { SampleBarGraph } from '@/assets/index.js';
import {  registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { selectAllUsers, selectCurrentToken, selectCurrentUid, selectCurrentUser } from '@/redux/authSlice';
Chart.register(...registerables);
Chart.register(ArcElement);


const WelcomeMessage = () => {
    return (
        <div className="mt-6 bg-yellow-400 p-4 text-white rounded-lg">
            <h1 className="text-xl font-bold">Welcome back, DKTEian!</h1>
            <p>Ready to Conquer the world?</p>
        </div>
    );
};


const BarGraph = ({ interviews }) => {
    const token = useSelector(selectCurrentToken);
    const [totalScores, setTotalScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFeedBack = async (interviewerId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/auth/interview/${interviewerId}/feedback`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const feedbackData = response.data.data.feedback;
            return feedbackData;
        } catch (error) {
            console.error('Error fetching feedback:', error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const scoresPromises = interviews.map(async (interview) => {
                    const feedbackData = await fetchFeedBack(interview.id);
                    const sum = feedbackData.apperance + feedbackData.communication + feedbackData.behaviour + feedbackData.technical;
                    return sum;
                });
                const scores = await Promise.all(scoresPromises);
                setTotalScores(scores);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, [interviews, token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    const labels = interviews.map((interview, index) => `Interview ${index + 1}`);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Total Scores',
                data: totalScores,
                backgroundColor: '#36A2EB',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: labels,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-full md:w-1/2 bg-white p-4 shadow-lg">
            <h2 className="font-semibold text-zinc-800">Student Scores in Interviews</h2>
            <div className='h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96'>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};




// const BarGraph = () => {
//     return (
//         <div className="w-full md:w-1/2 bg-white p-4 shadow-lg">
//             <h2 className="font-semibold text-zinc-800">Bar Graph overall</h2>
//             <img src={SampleBarGraph} alt="Bar Graph" />
//         </div>
//     );
// };

const CircleChart = (props) => {
    const { interview, feedbackData } = props;
    // console.log("Tjhe feedback in circle is ", feedbackData.apperance)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector(selectCurrentToken);
    const users = useSelector(selectAllUsers)
    let studentId;
    // const [isDate,setIsDate] = useState(false);
    let gotdate = false;
    let dataTime ;

    if (interview !=null)
    {
        dataTime = interview.startedAt;
        gotdate = true;
        // setIsDate(true)
    }
    
    // console.log("The interview in chart",interview)

    users.map((user,index)=>{
        if(user.token ===token)
            {
                studentId = user.Uid;
            }
    })
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
    if (feedbackData === null) {
        
        return (
            <div className="w-full md:w-1/2 bg-white p-4 shadow-lg" style={{ height: '50%' }}>
                <h2 className="font-semibold text-zinc-800">Chart</h2>
                {/* <Pie data={data} /> */}
            </div>
        )
    }

    const data = {
        labels: ['Appearance', 'Communication', 'Behavior', 'Technical'],
        datasets: [
            {
                data: [feedbackData.apperance, feedbackData.communication, feedbackData.behaviour,feedbackData.technical],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#00FF7F'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#00FF7F'],
            },
        ],
    };

    return (
        <div className="w-full md:w-1/2 bg-white p-4 shadow-lg md:mt-0 mt-4 " >
            {!gotdate ? <span>Select an Interview to see its Performance</span> : <h2 className="font-semibold text-zinc-800">Performance of Interview on     {handleDate(dataTime)}  at  {handleTime(dataTime)} </h2>}
           
            <div className='h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 flex justify-center'>
                <Pie data={data} />
            </div>
        </div>
    );
};

const InterviewsList = ({ interviews,onPerformanceClick,feedbackData }) => {
    // const { interviews, onPerformanceClick } = props;
    const [selectedInterview, setSelectedInterview] = useState(null);
    // const [feedbackData,setFeedbackData] = useState([]);
    const handlePerformanceClick = (interview) => {
        setSelectedInterview(interview);
        onPerformanceClick(interview);
    }

    if (interviews.length === 0) {
        return (
            <div className="mt-6 bg-white p-4 shadow-lg">
                <h2 className="font-semibold text-zinc-800 mb-4">Interviews List</h2>
                <p>No interviews available</p>
            </div>
        );
    }

    return (
        <div className="mt-6 bg-white p-4 shadow-lg">
            <h2 className="font-semibold text-zinc-800 mb-4">Interviews List</h2>
            <ul>
                {interviews.map((interview, index) => (
                    <InterviewItem key={index} interview={interview} onPerformanceClick={handlePerformanceClick} feedbackData={feedbackData}/>
                ))}
            </ul>
        </div>
    );
};

const StudentDashboard = () => {
    const profileLink = 1
    const drop = true;
    const [interviews, setInterviews] = useState([]);
    const [feedbackData,setFeedbackData] = useState([]);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [interviewSelected, setInterviewSelected] = useState(false);
    const stdcurretId = useSelector(selectCurrentUid)
    const token = useSelector(selectCurrentToken);
    useEffect(() => {
        fetchInterviews();
    }, []);

    const fetchInterviews = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/auth/interview/${stdcurretId}/all?filter=previous`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            if (Array.isArray(response.data.data)) {
                setInterviews(response.data.data);
            } else {
                console.log("The response data is " + response.data);
                console.error("Invalid response format :", response);
                setInterviews([]);
            }
        } catch (error) {
            console.error("Error fetching interviews:", error);
            setInterviews([]);
        }
    };
    console.log("Obtained interivews are ", interviews)

    const handlePerformanceClick = (interview) => {
        setInterviewSelected(true);

        setSelectedInterview(interview);
    }

    console.log("Interviews:", interviews);
    
const fetchFeedBack = async (interviewerId) =>{

    try{
        const response = await axios.get(`http://localhost:3000/api/v1/auth/interview/${interviewerId}/feedback`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        const data = response.data;
        console.log("feedback data is",data)
    }
    catch(error)
    {
        console.log(error);
    }
}
   

    return (
        <>
            <NavBar links={StudentDashboardNavlinks} profileLink={profileLink} drop={drop }/>
            <div className="bg-zinc-100">
                <div className="container mx-auto px-4">
                    <WelcomeMessage />
                    <div className="m-10"></div>
                    <div className="flex flex-col md:flex-row gap-10">
                        <BarGraph interviews={interviews} feedbackData={feedbackData }/>
                        <CircleChart interview={selectedInterview} feedbackData={feedbackData}/>
                    </div>
                    <InterviewsList interviews={interviews} onPerformanceClick={handlePerformanceClick} feedbackData={setFeedbackData} />
                </div>
            </div>
        </>
    );
};

export default StudentDashboard;
