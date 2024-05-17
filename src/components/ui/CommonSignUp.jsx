import React from "react";
import FormField from "./Formfield";
import PaymentComponent from "./Payment";
import SubmitButton from "./SubmitButton";
import PrevButton from "./PrevButton";

const CommonSignUp = ({ title, fields, onSubmit, currentStage, className, onPrev, studentSignup, handleChange, handleFileChange, formData, handleNext, handlePrev, handleRemoveFile }) => {

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

    return (
        <div className={`white text-white font-sans animate-slideFromBottom ${className}`}>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-4xl p-8 bg-zinc-800 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-8 text-center">{title}</h1>
                    <form onSubmit={onSubmit} className="space-y-6">
                        {currentStage === 2 && studentSignup && (
                            <PaymentComponent />
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderFormFields()}
                        </div>
                        <div className="flex justify-between">
                            {currentStage === 1 && studentSignup && (
                                <SubmitButton label="Next" onClick={handleNext} />
                            )}
                            {currentStage === 1 && !studentSignup && (
                                <SubmitButton label="SignUp" />
                            )}
                            {currentStage === 2 && studentSignup && (
                                <>
                                    <PrevButton onClick={handlePrev} />
                                    <SubmitButton label="SignUp" />
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CommonSignUp;
