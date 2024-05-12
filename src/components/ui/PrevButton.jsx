import React from "react";

const PrevButton = ({ onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="block mx-auto py-3 px-6 bg-gray-500 text-black font-bold rounded-md hover:bg-yellow-600"
        >
            Prev
        </button>
    );
};

export default PrevButton;
