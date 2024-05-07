
import React, { useEffect, useState } from "react";
import { StudentMale, AdministratorMale, Interviewer, SignUpLoginHome } from '@/assets/';
import NavBar from "../NavBar/NavBar";
import AuthButton from "@/components/ui/AuthButton";

import '@/App.css';
function SignUpPage() {
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Register', url: '/signup' },
        { label: 'Contact', url: '/' },
    ];
    const [isSmallScreen, setIsSmallerScreen] = useState(false);
   
    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallerScreen(window.innerWidth <= 600);
            
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    

    return (
        <div>
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
                    // className="p"
                    // className={isSmallScreen ? "w-8 h-12":"w-20 h-20"}
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
                <img src={SignUpLoginHome} alt="" />
            </div>
        </div>
    );
}

export default SignUpPage;
