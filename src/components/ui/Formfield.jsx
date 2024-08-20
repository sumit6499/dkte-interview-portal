import React from "react";

const FormField = ({ field, formData, handleChange, handleFileChange, handleRemoveFile, handleSendOtp, otpSent, resendTimer, studentSignup }) => {
    return (
        <div>
            <label htmlFor={field.name} className="block text-sm font-medium">
                {field.label}:
            </label>
            {field.type === "select" ? (
                <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : field.type === "file" ? (
                <div>
                    {formData[field.name] ? (
                        <div>
                            <span>{formData[field.name].name}</span>
                            <button onClick={() => handleRemoveFile(field.name)} className="ml-2 p-1 mx-auto bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600">Remove</button>
                        </div>
                    ) : (
                        <input
                            type="file"
                            id={field.name}
                            name={field.name}
                            onChange={handleFileChange}
                            required
                            className="w-1/2 file:h-10 file:rounded text-sm text-white file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600"
                        />
                    )}
                </div>
            ) : (
                <div className="flex items-center">
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 bg-zinc-700"
                    />
                            {field.name === 'email' && studentSignup && (
                        <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={otpSent || resendTimer > 0}
                            className={`ml-2  bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600 ${otpSent || resendTimer > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Send OTP'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default FormField;
