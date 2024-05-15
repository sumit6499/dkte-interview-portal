import React, { useState } from 'react';
import axios from 'axios';
import { criteria } from '@/components/variables/formVariables';

const StudentEvaluationForm = () => {
    const [isNightMode, setIsNightMode] = useState(false);
    const [formData, setFormData] = useState({
        // Initialize formData with empty values for each criterion
        // You might want to update this based on your criteria structure
        criteria1: '',
        criteria2: '',
        // Add more fields as needed
    });

    const toggleMode = () => {
        setIsNightMode(!isNightMode);
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Make an HTTP POST request to your backend endpoint
            const response = await axios.post('/api/evaluation', formData);
            console.log('Response from server:', response.data);
            // Handle success or further actions
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error
        }
    };

    const textClasses = isNightMode ? "text-white" : "text-gray-800";
    const selectDark = isNightMode ? "text-gray-800" : "text-gray-800";
    const BgForm = isNightMode ? "gray-800" : "white";
    const inputClasses = `shadow appearance-none border rounded w-full py-2 px-3 ${selectDark} text-bold leading-tight focus:outline-none focus:shadow-outline`;
    const labelClasses = `block ${textClasses} text-sm font-bold mb-2`;

    return (
        <div className={`container mx-auto p-10 px-10 ${isNightMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
            <h1 className={`text-2xl font-bold text-center mb-4 ${textClasses}`}>Student Interview Performance Evaluation</h1>
            <button className="absolute top-0 right-0 m-4 p-2 rounded-full bg-gray-300 dark:bg-gray-700" onClick={toggleMode}>
                {isNightMode ? 'Day Mode' : 'Night Mode'}
            </button>
            <form className={`bg-${BgForm} dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 `} onSubmit={handleSubmit}>
                <p className={`text-sm font-bold mb-2 ${textClasses}`}>Performance Evaluation:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {criteria.map((criterion, index) => (
                        <div key={index}>
                            <label className={labelClasses} htmlFor={`criteria${index + 1}`}>
                                {criterion.label}
                            </label>
                            <select id={`criteria${index + 1}`} className={inputClasses} onChange={handleChange}>
                                <option value="">Select an option</option>
                                {criterion.options.map((option, optionIndex) => (
                                    <option key={optionIndex} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentEvaluationForm;
