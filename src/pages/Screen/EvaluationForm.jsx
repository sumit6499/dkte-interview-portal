
import React from 'react';
import { criteria} from '@/components/variables/formVariables';

const inputClasses = "shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline";
const labelClasses = "block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2";

const StudentEvaluationForm = () => {
    return (
        <div className="container mx-auto p-4 bg-zinc-300">
            <h1 className="text-2xl font-bold text-center mb-4">Student Interview Performance Evaluation</h1>
            <form className="bg-white dark:bg-zinc-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* <div className="mb-4">
                    <label className={labelClasses} htmlFor="studentName">
                        Student Name
                    </label>
                    <input className={inputClasses} id="studentName" type="text" placeholder="Enter student's name" />
                </div> */}
                <p className="text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2">Performance Evaluation:</p>
                <div className="grid grid-cols-2 gap-4">
                    {criteria.map((criterion, index) => (
                        <div key={index}>
                            <label className={labelClasses} htmlFor={`criteria${index + 1}`}>
                                {criterion.label}
                            </label>
                            <select id={`criteria${index + 1}`} className={inputClasses}>
                                {criterion.options.map((option, optionIndex) => (
                                    <option key={optionIndex}>{option}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentEvaluationForm;

