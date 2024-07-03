import React from "react";

const SubmitButton = ({ label, onSubmit, disabled }) => {
    return (
        <button
            type="submit" // Change to type="submit"
            onClick={onSubmit} // This will work if onSubmit is passed down correctly
            disabled={disabled}
            className="block mx-auto py-3 px-6 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600"
        >
            {label}
        </button>
    );
};

export default SubmitButton;
