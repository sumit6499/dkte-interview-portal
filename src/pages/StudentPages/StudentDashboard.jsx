import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { sharedClasses } from '@/components/styles/sharedStyles';
import InterviewItem from '@/components/ui/InterviewItem';
import { SampleBarGraph } from '@/assets/index.js';

Chart.register(ArcElement);

const WelcomeMessage = () => {
    return (
        <div className={`${sharedClasses.mt6} ${sharedClasses.bgYellow400} ${sharedClasses.p4} ${sharedClasses.textWhite} ${sharedClasses.roundedLg}`}>
            <h1 className={`${sharedClasses.textXL} ${sharedClasses.fontBold}`}>Welcome back, DKTEian!</h1>
            <p>Ready to Conqure the world?</p>
        </div>
    );
};

const BarGraph = () => {
    return (
        <div className={`${sharedClasses.wFull} ${sharedClasses.mdW1_2} ${sharedClasses.bgWhite} ${sharedClasses.p4} ${sharedClasses.shadowLg}`}>
            <h2 className={`${sharedClasses.fontSemibold} ${sharedClasses.textZinc800}`}>Bar Graph  overall </h2>
            <img src={SampleBarGraph} alt="Bar Graph" />
        </div>
    );
};

const CircleChart = (props) => {
    const { interview } = props;
    
    if (interview === null) {
        return (
            <div className={`${sharedClasses.wFull} ${sharedClasses.mdW1_2} ${sharedClasses.bgWhite} ${sharedClasses.p4} ${sharedClasses.shadowLg}`}>
                <h2 className={`${sharedClasses.fontSemibold} ${sharedClasses.textZinc800}`}>Chart </h2>
                {/* <Pie data={data} /> */}
            </div>
        )
    } console.log("The interview is with values " + interview);
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

        <div className={`${sharedClasses.wFull} ${sharedClasses.mdW1_2} ${sharedClasses.bgWhite} ${sharedClasses.p4} ${sharedClasses.shadowLg}`}>
            <h2 className={`${sharedClasses.fontSemibold} ${sharedClasses.textZinc800}`}>Performance of Interview no {interview.id}</h2>
            <Pie data={data} />
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
            <div className={`${sharedClasses.mt6} ${sharedClasses.bgWhite} ${sharedClasses.p4} ${sharedClasses.shadowLg}`}>
                <h2 className={`${sharedClasses.fontSemibold} ${sharedClasses.textZinc800} ${sharedClasses.mb4}`}>Interviews List</h2>
                <p>No interviews available</p>
            </div>
        );
    }
    return (
        <div className={`${sharedClasses.mt6} ${sharedClasses.bgWhite} ${sharedClasses.p4} ${sharedClasses.shadowLg}`}>
            <h2 className={`${sharedClasses.fontSemibold} ${sharedClasses.textZinc800} ${sharedClasses.mb4}`}>Interviews List</h2>
            <ul>
                {interviews.map((interview, index) => (
                    <InterviewItem key={index} interview={interview} onPerformanceClick={handlePerformanceClick} />
                ))}
                {/* {selectedInterview && <CircleChart interview={selectedInterview} />} */}
            </ul>
        </div>
    );
};

const StudentDashboard = () => {
    const [interviews, setInterviews] = useState([]);
    const [selectedInterview, setSelectedInterview] = useState(null);
    const [interviewSelected, setInterviewSelected] = useState(false);

    useEffect(() => {
        fetchInterviews();
    }, []);

    const fetchInterviews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/interviews');

            if (Array.isArray(response.data)) {
                setInterviews(response.data);
            } else {
                console.log("THe response data is " + response.data);
                console.error("Invalid response format :", response);
                setInterviews([]);
            }
        } catch (error) {
            console.error("Error fetching interviews:", error);
            setInterviews([]);
        }
    };
    const handlePerformanceClick = (interview) => {
        setInterviewSelected(true);
        setSelectedInterview(interview);
    }
    console.log("Interviews:", interviews);

    const links = [
        { label: 'Home', url: '/' },
        { label: 'Schedules', url: '/StudentHome' },
        { label: 'Dashboard', url: '/StudentDashboard' },
        { label: 'Contact', url: '/' },
    ];

    return (
        <>
            <NavBar links={links} />
            <div className={sharedClasses.bgZinc100}>
                <div className={sharedClasses.container}>
                    <WelcomeMessage />
                    <div className='m-10'></div>
                    <div className={"flex justify-between-10" + sharedClasses.flexWrap}>
                        <div className='flex justify-between'>
                            <div style={{ marginLeft: '40px' }} />
                            <BarGraph />
                            <div style={{ marginLeft: '300px' }} />
                            {/* {!interviewSelected ? <CircleChart interviews={interviews[0]} /> : <CircleChart interview={selectedInterview} />} */}
                            <CircleChart interview={selectedInterview} />
                            {/* <CircleChart interviews={interviews[0]} /> */}
                            {/* <CircleChart interview={interviews.length > 0 ?interviews[0]:null}/> */}
                        </div>
                    </div>
                    <InterviewsList interviews={interviews} onPerformanceClick={handlePerformanceClick} />
                </div>
            </div>
        </>
    );
};

export default StudentDashboard;
