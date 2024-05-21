import React, { useState } from 'react';
import axios from 'axios';
import { criteria, InterviewerProfileNavLinks } from '@/components/variables/formVariables';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAllUsers, selectCurrentName, selectCurrentToken, selectCurrentUid } from '@/redux/authSlice';
import NavBar from '../NavBar/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentEvaluationForm = () => {
    const location = useLocation();
    const interview = location.state.interview;
    const tok = useSelector(selectCurrentToken);
    const curname = useSelector(selectCurrentName);
    const getCurrentId = useSelector(selectCurrentUid);

    const [isNightMode, setIsNightMode] = useState(false);
    const [formData, setFormData] = useState({
        technical: null,
        communication: null,
        behaviour: null,
        apperance: null,
        feedback: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [resumeLink, setResumeLink] = useState('');

    const toggleMode = () => {
        setIsNightMode(!isNightMode);
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        const [criterion] = id.split("-");
        const selectedOption = criteria.find(c => c.label === criterion).options.find(option => option.text === value);
        setFormData({ ...formData, [criterion]: selectedOption.value });
    };

    const handleFeedbackChange = (event) => {
        const { value } = event.target;
        setFormData({ ...formData, feedback: value });
    };

    const getResumeLink = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/auth/students/${interview.studentId}/info`, {
                headers: {
                    Authorization: `Bearer ${tok}`
                }
            });
            const data = response.data.data.resume;
            setResumeLink(data);
            return data;
        } catch (error) {
            console.error("Error fetching resume link:", error);
            toast.error("Error fetching resume. Please try again.");
        }
    }

    const handleResumeButtonClick = async () => {
        const link = await getResumeLink();
        if (link) {
            window.open(link, '_blank');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formSubmitted) {
            toast.error("You cannot submit the feedback form more than once.");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/auth/interview/${interview.id}/feedback`, formData, {
                headers: {
                    Authorization: `Bearer ${tok}`,
                }
            });
            console.log('Response from server:', response.data);
            setFormSubmitted(true);
            toast.success("Feedback submitted successfully!");
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error("Error submitting feedback. Please try again.");
        }
    };

    const textClasses = isNightMode ? "text-white" : "text-gray-800";
    const selectDark = isNightMode ? "text-gray-800" : "text-gray-800";
    const BgForm = isNightMode ? "gray-800" : "white";
    const inputClasses = `shadow appearance-none border rounded w-full py-2 px-3 ${selectDark} text-bold leading-tight focus:outline-none focus:shadow-outline`;
    const labelClasses = `block ${textClasses} text-sm font-bold mb-2`;

    return (
        <>
            <NavBar links={InterviewerProfileNavLinks} />
            <ToastContainer />
            <div className={`container mx-auto p-10 px-10 ${isNightMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
                <h1 className={`text-2xl font-bold text-center mb-4 ${textClasses}`}>Student Interview Performance Evaluation</h1>
                <button className="mt-24 absolute top-0 right-0 m-4 p-2 rounded-full bg-gray-300 dark:bg-gray-700" onClick={toggleMode}>
                    {isNightMode ? 'Day Mode' : 'Night Mode'}
                </button>
                <form className={`bg-${BgForm} dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4`} onSubmit={handleSubmit}>
                    <p className={`text-sm font-bold mb-2 ${textClasses}`}>Performance Evaluation:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {criteria.map((criterion, index) => (
                            <div key={index}>
                                <label className={labelClasses} htmlFor={`${criterion.label}-${index}`}>
                                    {criterion.label}
                                </label>
                                <select id={`${criterion.label}-${index}`} className={inputClasses} onChange={handleChange}>
                                    <option value="">Select an option</option>
                                    {criterion.options.map((option, optionIndex) => (
                                        <option key={optionIndex} value={option.text}>{option.text}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <label className={labelClasses} htmlFor="feedback">Feedback</label>
                        <textarea id="feedback" className={inputClasses} onChange={handleFeedbackChange}></textarea>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <button
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${formSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                            type="submit"
                            disabled={formSubmitted}
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center mt-4">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleResumeButtonClick}
                    >
                        View Resume
                    </button>
                </div>
            </div>
        </>
    );
};

export default StudentEvaluationForm;
