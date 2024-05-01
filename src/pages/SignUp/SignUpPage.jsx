
import React, { useEffect, useState } from "react";
import { StudentMale, AdministratorMale } from '@/assets/';
import NavBar from "../NavBar/NavBar";
import AuthButton from "@/components/ui/AuthButton";

function SignUpPage() {
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/loginPage' },
        { label: 'Register', url: '/SignUpPage' },
        { label: 'Contact', url: '/' },
    ];
    const [isSmallScreen, setIsSmallerScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallerScreen(window.innerWidth <= 1024);
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
            <div className="flex flex-row items-center justify-center h-screen bg-zinc-100 dark:bg-zinc-800 space-x-16">
                <AuthButton
                    imageUrl={StudentMale}
                    altText="Student SignUp"
                    buttonText="Student SignUp"
                    buttonUrl="/StudentSignUp"
                    isSmallScreen={isSmallScreen}
                    // className={isSmallScreen ? "w-8 h-12":"w-20 h-20"}
                />
                <AuthButton
                    imageUrl={AdministratorMale}
                    altText="Admin SignUp"
                    buttonText="Admin SignUp"
                    buttonUrl="/AdminSignUp"
                    isSmallScreen={isSmallScreen}
                    className="ml-4"
                />
            </div>
        </div>
    );
}

export default SignUpPage;
