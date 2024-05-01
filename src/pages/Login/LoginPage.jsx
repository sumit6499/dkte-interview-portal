import React, { useEffect, useState } from "react";
import { StudentMale, AdministratorMale } from '@/assets/';
import NavBar from "../NavBar/NavBar";
import AuthButton from "@/components/ui/AuthButton";
import { LogIn } from "lucide-react";

function LoginPage() {
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
            <div className={isSmallScreen ? "flex flex-row items-center justify-center h-screen bg-zinc-100 dark:bg-zinc-800 space-x-8" : "flex flex-row items-center justify-center h-screen bg-zinc-100 dark:bg-zinc-800 space-x-8"}  >
                <AuthButton
                    imageUrl={StudentMale}
                    altText="Student Login"
                    buttonText={"Student Login"}
                    buttonUrl={"/StudentLogin"}
                    isSmallScreen={isSmallScreen}
                />
                <AuthButton
                    imageUrl={AdministratorMale}
                    altText={"Admin Login"}
                    buttonText={"Admin Login"}
                    buttonUrl="/AdminLogin"
                    isSmallScreen={isSmallScreen}
                    className={isSmallScreen ? "text-sm ml-4" : " ml-4"}
                />
            </div>
        </div>
    );
}

export default LoginPage;
