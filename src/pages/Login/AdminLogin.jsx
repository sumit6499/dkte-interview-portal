import React from 'react';
import { interviewComposition } from '@/assets/';
import NavBar from "../NavBar/NavBar"

function AdminLogin() {
    return (
        <div>
            <div><NavBar /></div>
            <div className="flex justify-center items-center h-screen animate-slideFromBottom ">

                <div className="bg-zinc-800 p-8 rounded-lg w-96">
                    <h2 className="text-white text-2xl mb-6 border-b border-zinc-600 pb-2 flex justify-center" id="title" > Admin Login</h2>
                    <form action="#" method="POST">
                        <div className="mb-4 text-center">
                            <label htmlFor="prn" className="block text-white mb-2">UserName :</label>
                            <input type="text" id="prn" name="prn" className="input-field focus:border-yellow-500 focus:ring-yellow-500 " required />
                        </div>
                        <div className="mb-6 text-center">
                            <label htmlFor="password" className="block text-white mb-2 ">Password :</label>
                            <input type="password" id="password" name="password" className="input-field focus:border-yellow-500 focus:ring-yellow-500" required />
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="w-30 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <img src={interviewComposition} alt="" />

            </div>
        </div>
    );
}

export default AdminLogin;
