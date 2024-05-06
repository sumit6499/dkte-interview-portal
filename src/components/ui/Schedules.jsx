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
export default Schedule;