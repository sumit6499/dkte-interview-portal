import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Sample interview data
const interviews = [
  { id: 1, date: '2024-05-06', time: '10:00 AM', interviewer: 'John Doe', candidate: 'Jane Smith', status: 'Scheduled' },
  { id: 2, date: '2024-05-07', time: '11:00 AM', interviewer: 'Alice Johnson', candidate: 'Bob Brown', status: 'Scheduled' },
  { id: 3, date: '2024-05-08', time: '02:00 PM', interviewer: 'Emily Wilson', candidate: 'David Lee', status: 'Scheduled' },
  // Add more sample data as needed
];

// Sample interview history data
const interviewHistory = [
  { id: 4, date: '2024-05-01', time: '09:00 AM', interviewer: 'Michael Smith', candidate: 'Sarah Johnson', status: 'Completed' },
  { id: 5, date: '2024-04-30', time: '10:30 AM', interviewer: 'Jessica Brown', candidate: 'Daniel Wilson', status: 'Completed' },
  // Add more sample data as needed
];

// Sample upcoming interviews data
const upcomingInterviews = [
  { id: 6, date: '2024-05-09', time: '03:00 PM', interviewer: 'Thomas Anderson', candidate: 'Jennifer Lee', status: 'Scheduled' },
  { id: 7, date: '2024-05-10', time: '10:00 AM', interviewer: 'Sophia Martinez', candidate: 'James Taylor', status: 'Scheduled' },
  // Add more sample data as needed
];

// Endpoint to get today's interviews
app.get('/api/interviews/today', ({}, res) => {
  const { today } = new Date().toISOString().split('T')[0];
  const todayInterviews = interviews.filter(interview => interview.date === today);
  res.json(todayInterviews);
});

// Endpoint to get upcoming interviews
app.get('/api/interviews/upcoming', ({}, res) => {
  const { today } = new Date().toISOString().split('T')[0];
  const upcoming = interviews.filter(interview => interview.date > today);
  res.json(upcoming);
});

// Endpoint to get all interview history
app.get('/api/interviews/history', ({}, res) => {
  const { today } = new Date().toISOString().split('T')[0];
  const pastInterviews = interviews.filter(interview => interview.date < today);
  const allInterviewHistory = [...interviewHistory, ...pastInterviews];
  res.json(allInterviewHistory);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
