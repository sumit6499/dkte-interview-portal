import React from 'react';

function InterviewSchedule() {
    return (
        <div className="bg-zinc-900 text-white">
            <nav className="bg-black p-4 flex justify-between items-center">
                <div className="text-yellow-300 font-bold text-lg">DKTE Ascendere</div>
                <div className="flex gap-4">
                    <a href="#" className="text-white hover:text-zinc-300">Home</a>
                    <a href="#" className="text-white hover:text-zinc-300">Students</a>
                    <a href="#" className="text-white hover:text-zinc-300">Schedules</a>
                    <a href="#" className="text-white hover:text-zinc-300">Contact</a>
                    <div className="relative">
                        <button className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                            <img src="" alt="Profile" className="rounded-full" />
                        </button>
                        <div className="absolute right-0 mt-10 hidden bg-zinc-700 p-2 rounded-md">
                            <a href="#" className="block text-white hover:bg-zinc-600 p-2">Logout</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-lg mx-auto mt-10 p-6 bg-zinc-800 rounded-lg">
                <h1 className="text-xl font-bold mb-4 border-b border-zinc-600 pb-2">Schedule Interview</h1>
                <div className="space-y-2">
                    <p>Student Name : <span className="font-semibold">firstName lastName</span></p>
                    <p>PRN : <span className="font-semibold">22UAJ312</span></p>
                    <p>Department : <span className="font-semibold">CSE - AI</span></p>
                    <p>Class : <span className="font-semibold">TY</span></p>
                    <label htmlFor="date-time" className="block mt-4">Date and Time:</label>
                    <input type="datetime-local" id="date-time" name="date-time" className="bg-zinc-700 p-2 rounded-md w-full" />
                </div>
                <button className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600">Schedule</button>
            </div>
        </div>
    );
}

export default InterviewSchedule;
