import React, { useEffect, useState } from "react";
import { StudentMale, AdministratorMale } from '@/assets/';
import NavBar from "../NavBar/NavBar";
import AuthButton from "@/components/ui/AuthButton";
import { LogIn } from "lucide-react";

function LoginPage() {
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Register', url: '/signup' },
        { label: 'Contact', url: '/' },
    ];

    const [isSmallScreen, setIsSmallerScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallerScreen(window.innerWidth <= 600); // Changed to 600px
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
                    altText="Student Login"
                    buttonText={"Student Login"}
                    buttonUrl={"/login/student"}
                    isSmallScreen={isSmallScreen}
                />
                <AuthButton
                    imageUrl={AdministratorMale}
                    altText={"Admin Login"}
                    buttonText={"Admin Login"}
                    buttonUrl="/login/admin"
                    isSmallScreen={isSmallScreen}
                    className={isSmallScreen ? "text-sm" : ""}
                />
                <AuthButton
                    imageUrl={AdministratorMale}
                    altText={"Interviewer Login"}
                    buttonText={"Interviewer Login"}
                    buttonUrl="/login/interviewer"
                    isSmallScreen={isSmallScreen}
                    className={isSmallScreen ? "text-sm" : ""}
                />
            </div>
        </div>
    );
}

export default LoginPage;
