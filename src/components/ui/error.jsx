import React from 'react'; 
import { useNavigate } from 'react-router';
const ErrorPage = () => {

    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white">
            <div className="text-center">
                <h1 className="text-9xl font-bold">
                    <span className="text-zinc-600">4</span>
                    <span className="text-yellow-500">0</span>
                    <span className="text-zinc-600">4</span>
                </h1>
                <p className="text-zinc-400 mt-3">
                    The page you are looking for might have been removed had its name changed or is temporarily
                    unavailable.
                </p>
                <button
                    className="mt-5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2 px-4 border border-zinc-700 rounded" onClick={()=>{
                        navigate('/')
                    }}
                >
                    HOME PAGE
                </button>
            </div>
        </div>
    );
}; 
export default ErrorPage;
