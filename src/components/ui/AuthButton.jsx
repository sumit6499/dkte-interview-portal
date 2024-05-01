import React from "react";

const AuthButton = ({ onClick, imageUrl, altText, buttonText, buttonUrl, isSmallScreen }) => {
    return (
        <button
            onClick={() => window.location.href = buttonUrl}
            className={`flex flex-col items-center bg-yellow-400 dark:bg-yellow-600 rounded-lg p-${isSmallScreen ? '2' : '4'} shadow-lg animate-slideFromLeft`}
        >
            <img
                src={imageUrl}
                alt={altText}
                className={`rounded-md ${isSmallScreen ? 'w-35 h-35' : 'w-60 h-60'}`}
            />
            <span className={`mt-2 font-semibold ${isSmallScreen ? 'text-sm' : 'text-lg'}`}>{buttonText}</span>
        </button>
    );
};

export default AuthButton;
