import React from "react";

const SubmitButton = ({ onSubmit, label }) => {
    return (
        <button
            type="submit"
            onClick={onSubmit}
            className="block mx-auto py-3 px-6 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600"
        >
            {label}
        </button>
    );
};

export default SubmitButton;
