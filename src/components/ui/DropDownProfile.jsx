import React, { useState } from "react";
import { MaleUser } from '@/assets/index'
import { useNavigate } from "react-router";

const DropDownProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const logout = () =>{
        navigate("/")
    }
    
    return (
        <div className="relative">
            <button className="flex items-center text-white focus:outline-none" onClick={toggleMenu}>
                <img src={MaleUser} alt="Profile" className="h-8 w-8 rounded-full" />
                <span className="ml-2">Your Name</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 1.414L10 10.414l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded shadow-lg z-10">
                    {/* <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</a> */}
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={logout}>Logout</a>
                </div>
            )}
        </div>
    );
}

export default DropDownProfile;
