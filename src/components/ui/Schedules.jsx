import React from "react";
import { HomePicture } from "@/assets";
import { BUTTON_CLASS, HOVER_CLASS, PROFILE_MENU_CLASS } from "../styles/sharedStyles";

import '@/App.css'



const Schedule = () =>{
    return (
        <>
            <div className=" flex-1 p-10 justify-center items-center">
                <div className=" flex justify-center items-center ">
                    <div className="StudentHome flex  space-x-4 ">
                        
                            <button className="bg-yellow-400 text-white px-12  py-3 rounded m-2 ml-6">Today's Interview</button>
                  
                        <button className="bg-yellow-400 text-white px-12 py-3 rounded m-2">Upcoming Interview</button>
                        <button className="bg-yellow-400 text-white px-12 py-3 rounded m-2">Interviews History</button>
                    </div>
                </div>
                <div className="mt-10 flex justify-center">
                    <img src={HomePicture} alt="Interview Illustration" />
                </div>
            </div>
        </>
    );
}
{/* <div className='flex mt-2 justify-between'>
                                <button type='button' onClick={() => addTimeRange(day)} className="block mx-auto py-1 px-2 bg-gray-500 text-black font-bold rounded-md hover:bg-yellow-600 mr-2">
                                    Add Time Range
                                </button>
                                <button type='button' onClick={() => removeTimeRange(day)} className="block mx-auto py-1 px-2 bg-gray-500 text-black font-bold rounded-md hover:bg-yellow-600">
                                    Delete Time Range
                                </button>
                            </div> */}
export default Schedule;