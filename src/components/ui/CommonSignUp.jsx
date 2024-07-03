import React, { useState } from "react";
import FormField from "./Formfield";
import PaymentComponent from "./Payment";
import SubmitButton from "./SubmitButton";
import PrevButton from "./PrevButton";
import OtpInput from "./otpInput";

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

    const handleOtpNotSend = () => {
        alert("OTP not sent");
    };

    const renderFormFields = () => {
        return fields.map((field) => (
            <FormField
                key={field.name}
                field={field}
                formData={formData}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                handleRemoveFile={handleRemoveFile}
            />
        ));
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        setIsSubmitted(true);
        onSubmit(event); // Call the onSubmit function passed as prop
    };

    return (
        <div className={`white text-white font-sans animate-slideFromBottom ${className}`}>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-4xl p-8 bg-zinc-800 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-8 text-center">{title}</h1>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {showOtpInput ? (
                            <OtpInput length={4} onOtpSubmit={verifyOtp} />
                        ) : (
                            <>
                                {currentStage === 2 && studentSignup && (
                                    <PaymentComponent />
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {renderFormFields()}
                                </div>
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
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CommonSignUp;
