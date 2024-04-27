// LoginForm.js

import React from 'react';
import './StudentLogin.css'; // Import your CSS file

function LoginForm() {
    return (
        <div className="bg-zinc-800 p-8 rounded-lg w-96">
            <h2 className="text-white text-2xl mb-6 border-b border-zinc-600 pb-2" id="title"> Student Login</h2>
            <form action="#" method="POST">
             
                    <div className="mb-4">
                        <label htmlFor="prn" className="block text-white mb-2">PRN No. :</label>
                        <input type="text" id="prn" name="prn" className="input-field" required />
                    </div>
                    <br />
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-white mb-2 ">Password :</label>
                        <input type="password" id="password" name="password" className="input-field" required />
                    </div>
                
                <div className="Submit">
                    <button type="submit" className="btn-login">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
