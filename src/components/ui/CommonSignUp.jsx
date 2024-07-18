import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FormField from "./Formfield";
import PaymentComponent from "./Payment";
import SubmitButton from "./SubmitButton";
import PrevButton from "./PrevButton";
import OtpInput from "./otpInput";
import { BASE_URL } from "@/api";
const CommonSignUp = ({
    title,
    fields,
    onSubmit,
    currentStage,
    className,
    onPrev,
    studentSignup,
    handleChange,
    handleFileChange,
    formData,
    handleNext,
    handlePrev,
    handleRemoveFile,
    showOtpInput,
    verifyOtp
}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const [roleOtp, setRoleOtp] = useState('');
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);
    useEffect(() => {
        if (studentSignup) {
            setRoleOtp('students');
        }
    }, [studentSignup,])

    const handleSendOtp = async () => {
        try {
            const response = await fetch(`${BASE_URL}/${roleOtp}/signup-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (response.ok) {
                setOtpSent(true);
                setOtpTimer(30); // Start 30-second timer
                notifySuccess('OTP sent to your email');
            } else {
                notifyError('OTP not sent');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            notifyError('OTP not sent');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await fetch(`${BASE_URL}/${roleOtp}/validate-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            if (response.ok) {
                notifySuccess('OTP verified successfully');
                setIsSubmitted(true);
                onSubmit(); // Call the onSubmit function passed as prop
            } else {
                notifyError('Invalid OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            notifyError('Error verifying OTP');
        }
    };

    useEffect(() => {
        if (otpTimer > 0) {
            const timerId = setInterval(() => {
                setOtpTimer(otpTimer - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [otpTimer]);

    const renderFormFields = () => {
        return fields.map((field) => (
            <FormField
                key={field.name}
                field={field}
                formData={formData}
                handleChange={(e) => {
                    handleChange(e);
                    if (field.name === 'email') {
                        setEmail(e.target.value);
                    }
                }}
                handleFileChange={handleFileChange}
                handleRemoveFile={handleRemoveFile}
                handleSendOtp={handleSendOtp}
                isOtpButtonDisabled={otpTimer > 0}
            />
        ));
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        if (!otpSent) {
            handleSendOtp(); // Send OTP first
        } else {
            handleVerifyOtp(); // Verify OTP if already sent
        }
    };

    console.log("currentStage:", currentStage, "studentSignup:", studentSignup);

    return (
        <div className={`white text-white font-sans animate-slideFromBottom ${className}`}>
            <ToastContainer />
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-4xl p-8 bg-zinc-800 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-8 text-center">{title}</h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <>
                            {currentStage === 2 && studentSignup && (
                                <PaymentComponent />
                            )}
                            {currentStage === 3 && studentSignup && (
                                <>
                                    <h1>This is stage 3</h1>
                                    <PrevButton onClick={handlePrev} />
                                    <SubmitButton
                                        label="SignUp"
                                        onSubmit={handleSubmit}
                                        disabled={isSubmitted}
                                    />
                                </>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderFormFields()}
                            </div>
                            {otpSent && (
                                <div className="mt-6">
                                    <OtpInput
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        numInputs={6}
                                        separator={<span>-</span>}
                                    />
                                    <div className="text-sm text-gray-400 mt-2">
                                        {otpTimer > 0 ? `You can resend OTP in ${otpTimer}s` : 'You can resend OTP now'}
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-between">
                                {currentStage === 1 && studentSignup && (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="block mx-auto py-3 px-6 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600"
                                    >
                                        Next
                                    </button>
                                )}
                                {currentStage === 1 && !studentSignup && (
                                    <SubmitButton
                                        label="SignUp"
                                        onSubmit={handleSubmit}
                                        disabled={isSubmitted}
                                    />
                                )}
                                {currentStage === 2 && studentSignup && (
                                    <>
                                        <PrevButton onClick={handlePrev} />
                                        <SubmitButton
                                            label="SignUp"
                                            onSubmit={handleSubmit}
                                            disabled={isSubmitted}
                                        />
                                    </>
                                )}
                            </div>
                        </>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CommonSignUp;
