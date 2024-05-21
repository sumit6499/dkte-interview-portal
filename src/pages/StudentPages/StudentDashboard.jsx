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
   
    const totalScores = interviews.map(interview => {
        return interview.technicalKnowledgeScore + interview.experienceScore + interview.behaviorScore;
    });

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
                type: 'category',// for x-axis (labels)
                labels: labels, //   labels
            },
            y: {
                beginAtZero: true, //y-axis 
            },
        },
    };

    return (
        <div className="w-full md:w-1/2 bg-white p-4 shadow-lg">
            <h2 className="font-semibold text-zinc-800" >Student Scores in Interviews</h2>
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
    const { interview } = props;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector(selectCurrentToken);
    const users = useSelector(selectAllUsers)
    let studentId;
    const [interviews, setInterviews] = useState(null);

    users.map((user,index)=>{
        if(user.token ===token)
            {
                studentId = user.Uid;
            }
    })

    const fetchStudentInterviews = async (studentId)=>{
        setLoading(true);
        setError(null);

        try{
             const response = await fetch(`${studentId}/info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data  = await response.data;
            setInterviews(data);
        }catch(error)
        {
            console.log("Error loading the data ",error);
            setError("Error loading the interviews")
        }
        finally {
            setLoading(false);
        }
    }
    if (interview === null) {
        return (
            <div className="w-full md:w-1/2 bg-white p-4 shadow-lg" style={{ height: '50%' }}>
                <h2 className="font-semibold text-zinc-800">Chart</h2>
                {/* <Pie data={data} /> */}
            </div>
        )
    }

    const data = {
        labels: ['Technical Knowledge', 'Behavior', 'Other'],
        datasets: [
            {
                data: [interview.technicalKnowledgeScore, interview.experienceScore, interview.behaviorScore],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div className="w-full md:w-1/2 bg-white p-4 shadow-lg md:mt-0 mt-4 " >
            <h2 className="font-semibold text-zinc-800">Performance of Interview no {interview.id}</h2>
         
            <div className='h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 flex justify-center'>
                <Pie data={data} />
            </div>
        </div>
    );
};

const InterviewsList = (props) => {
    const { interviews, onPerformanceClick } = props;
    const [selectedInterview, setSelectedInterview] = useState(null);

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
                    <InterviewItem key={index} interview={interview} onPerformanceClick={handlePerformanceClick} />
                ))}
            </ul>
        </div>
    );
};

const StudentDashboard = () => {
    const [interviews, setInterviews] = useState([]);
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

            if (Array.isArray(response.data)) {
                setInterviews(response.data);
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

   

    return (
        <>
            <NavBar links={StudentDashboardNavlinks} />
            <div className="bg-zinc-100">
                <div className="container mx-auto px-4">
                    <WelcomeMessage />
                    <div className="m-10"></div>
                    <div className="flex flex-col md:flex-row gap-10">
                        <BarGraph interviews={interviews}/>
                        <CircleChart interview={selectedInterview} />
                    </div>
                    <InterviewsList interviews={interviews} onPerformanceClick={handlePerformanceClick} />
                </div>
            </div>
        </>
    );
};

export default StudentDashboard;
