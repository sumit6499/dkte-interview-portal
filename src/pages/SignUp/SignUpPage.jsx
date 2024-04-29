import React from "react";
import { StudentMale } from '@/assets/';
import { AdministratorMale } from '@/assets/';
import NavBar from "../NavBar/NavBar"
import '@/App.css'
function SignUpPage() {
    return (
        <div>
            <div><NavBar /></div>

            <div className="flex flex-row items-center justify-center h-screen bg-zinc-100 dark:bg-zinc-800">

                {/* <img src={StudentMale} alt="Admin Login" className="rounded-md" /> */}

                <button
                    onClick={() => window.location.href = '/StudentSignUp'}
                    className="flex flex-col items-center bg-yellow-400 dark:bg-yellow-600 rounded-lg p-4 shadow-lg animate-slideFromLeft">
                    <img
                        src={StudentMale}
                        alt="Student Login"
                        className="rounded-md"
                    />
                    <span className="mt-2 font-semibold">Student SignUp</span>
                </button>
                <button
                    onClick={() => window.location.href = '/AdminSignUp'}
                    className="ml-4 flex flex-col items-center bg-yellow-400 dark:bg-yellow-600 rounded-lg p-4 shadow-lg animate-slideFromLeft">
                    <img
                        src={AdministratorMale}
                        alt="Admin Login"
                        className="rounded-md"
                    />
                    <span className="mt-2 font-semibold">Admin SignUp</span>
                </button>
            </div>
        </div>
    )
}

export default SignUpPage;
