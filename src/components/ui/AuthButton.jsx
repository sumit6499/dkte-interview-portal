import React from "react";
import { useNavigate } from "react-router";
const AuthButton = ({ onClick, imageUrl, altText, buttonText, buttonUrl, isSmallScreen }) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(buttonUrl)}
            className={`flex flex-col items-center bg-yellow-400 dark:bg-yellow-600 pr-2 rounded-lg p-${isSmallScreen ? '2' : '2'} shadow-lg animate-slideFromLeft`}
        >
            <img
                src={imageUrl}
                alt={altText}
                className={`rounded-md ${isSmallScreen ? 'w-40 h-35 p-3' : 'w-40 h-40 '}`}
            />
            <span className={`mt-2 font-semibold ${isSmallScreen ? 'text-sm' : 'text-lg'}`}>{buttonText}</span>
        </button>
    );
};

export default AuthButton;
