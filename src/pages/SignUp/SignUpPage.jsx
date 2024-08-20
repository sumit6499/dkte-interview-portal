import React, { useEffect, useState } from "react";
import { StudentMale, AdministratorMale, Interviewer, SignUpLoginHome } from '@/assets/';
import NavBar from "../NavBar/NavBar";
import AuthButton from "@/components/ui/AuthButton";
import '@/App.css';
import { useSelector } from "react-redux";
import { selectCurrentRole } from "@/redux/authSlice";
import { useNavigate } from "react-router";

function SignUpPage() {
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Register', url: '/signup' },
        { label: 'Contact', url: '/' },
    ];
    const navigate = useNavigate();
    const role = useSelector(selectCurrentRole);
    const [isSmallScreen, setIsSmallerScreen] = useState(false);
    
    useEffect(() => {
        console.log("The roel i s",role)
        if (role) {
            if (role === "Admin") {
                navigate("/login/admin/students");
            } else if (role === "Student") {
                navigate("/login/student/studentHome");
            } else if (role === "Interviewer") {
                navigate("/login/interviewer/schedules");
            }
        }
    }, [role, navigate]);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallerScreen(window.innerWidth <= 600);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <>
            <div>
                <NavBar links={links} />
            </div>
            <div className={isSmallScreen ? "flex flex-col items-center justify-center h-screen bg-zinc-100 dark:bg-zinc-800 space-y-4" : "flex flex-row items-center justify-center h-screen bg-zinc-100 dark:bg-zinc-800 space-x-8"}>
                <AuthButton
                    imageUrl={StudentMale}
                    altText="Student SignUp"
                    buttonText="Student SignUp"
                    buttonUrl="/signup/student"
                    isSmallScreen={isSmallScreen}
                />
                <AuthButton
                    imageUrl={AdministratorMale}
                    altText="Admin SignUp"
                    buttonText="Admin SignUp"
                    buttonUrl="/signup/admin"
                    isSmallScreen={isSmallScreen}
                    className="ml-4"
                />
                <AuthButton
                    imageUrl={Interviewer}
                    altText="Interviewer SignUp"
                    buttonText="Interviewer SignUp"
                    buttonUrl="/signup/interviewer"
                    isSmallScreen={isSmallScreen}
                    className="ml-4"
                />
            </div>
            <div className="bg-zinc-100 flex justify-center">
                <img src={SignUpLoginHome} alt="Sign Up Login Home" />
            </div>
        </>
    );
}

export default SignUpPage;
