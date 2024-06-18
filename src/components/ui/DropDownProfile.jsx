import React, { useState, useRef } from "react";
import { MaleUser } from '@/assets/index';
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentName, logOut, selectCurrentUid, selectCurrentRole } from "@/redux/authSlice";
import '@/App.css';
const DropDownProfile = ({ profileLink, isAdmin }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const UserName = useSelector(selectCurrentName);
    const timeoutRef = useRef(null);
    const id = useSelector(selectCurrentRole)
    const logout = () => {
        dispatch(logOut());
        navigate("/");
    };

    const Profile = () => {
        if (profileLink === 1) {
            navigate('/login/student/profile');
        } else if (profileLink === 2) {
            navigate('/login/interviewer/profile');
        }
    };

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 3000);
    };
    let isclick = true;

    const ProfileClicked = () => {
        isclick = !isclick;
    }
    return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={ProfileClicked()}>
            <button className="flex items-center text-white focus:outline-none">
                <img src={MaleUser} alt="Profile" className="h-10 w-10 rounded-full border-2 border-white ml-7" />
                <span className="ml-2 ">{UserName}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 1.414L10 10.414l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isAdmin ? (isOpen || isclick) && (
                <div className="absolute top-0 left-20 w-40 bg-white rounded-md shadow-lg z-10 ">
                    <a
                        href="#"
                        id="logoutsyb"
                        className="block px-4 text-center pl-1 py-2 text-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:to-red-500 rounded-md shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                        onClick={logout}
                    >
                        Logout
                    </a>
                </div>
            ) : (isOpen || isclick) && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded shadow-lg z-10">
                        {!isAdmin && <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-green-500 transition duration-300 ease-in-out transform hover:scale-105 rounded-md " onClick={Profile}>Profile</a>}
                        <a
                            href="#"
                            id="logoutsyb"
                            className="block px-4 py-2 text-gray-800 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 rounded-md"
                            onClick={logout}
                        >
                            Logout
                        </a>
                </div>
            )}
        </div>
    );
};



export default DropDownProfile;
