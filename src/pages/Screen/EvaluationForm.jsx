import React, { useState } from 'react';
import axios from 'axios';
import { criteria, InterviewerProfileNavLinks } from '@/components/variables/formVariables';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAllUsers, selectCurrentName, selectCurrentToken, selectCurrentUid } from '@/redux/authSlice';
import NavBar from '../NavBar/NavBar';

const StudentEvaluationForm = () => {
    const location = useLocation();
    const interview = location.state.interview;
    const users = useSelector(selectAllUsers);
    console.log("THe st id is ",interview.studentId)
    let token;
    const tok = useSelector(selectCurrentToken);
    const curname = useSelector(selectCurrentName);
    console.log("The currentname is ",curname);
    console.log("THe tok is ",tok);
    const getCurrentId = useSelector(selectCurrentUid)
    users.forEach((user) => {
        if (user.Uid == interview.studentId) {
            token = user.token;
            console.log("The token of shive is ", user.token)
            return;
        }
        else{
            console.log("does not exists")
        }
    });
    console.log("The token of interviewer is ", token)
    console.log("The interview received is", interview);

    const [isNightMode, setIsNightMode] = useState(false);
    const [formData, setFormData] = useState({
        technical: null,
        communication: null,
        behaviour: null,
        apperance: null,
        feedback: ''
    });

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/auth/interview/${interview.id}/feedback`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
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
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default StudentEvaluationForm;
