import React, { useEffect, useRef, useState } from 'react';
import '@/App.css';

const OtpInput = ({ length = 4, value, onChange, onOtpSubmit = () => { } }) => {
    const inputRefs = useRef([]);

    const handleChange = (index, e) => {
        var inputValue = e.target.value;
        if (isNaN(inputValue)) return;

        const newOtp = [...value];
        newOtp[index] = inputValue.substring(inputValue.length - 1);
        onChange(newOtp.join(''));

        if (inputValue && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(0, 1);
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !value[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onOtpSubmit(value);
    };

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    return (
        <>
            <label className="block text-white text-lg font-semibold mb-2 flex justify-center mt-10" htmlFor="otpInput">
                Enter OTP:
            </label>
            <form className="flex flex-col items-center">
                <div className="flex justify-center mb-4">
                    {Array.from({ length }).map((_, index) => (
                        <input
                            type="text"
                            key={index}
                            value={value[index] || ''}
                            ref={(input) => (inputRefs.current[index] = input)}
                            onChange={(e) => handleChange(index, e)}
                            onClick={() => handleClick(index)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="otpInput text-black w-12 h-12 mx-1 text-center border border-gray-300 rounded"
                            id="otpInput"
                        />
                    ))}
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-30 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default OtpInput;
