import React from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router";
import axios from "axios";
import { Adminfields, AdminNavLinks } from "@/components/variables/formVariables";

function AdminSignUp() {
    const studentSignup = false;
   const isAdminSignUp = true;
const navigate = useNavigate();
    
    const handleSubmit = async (data) => {
        //  admin sign up success 
        data.preventDefault();
        const formDataToSend   = new FormData();
        fields.forEach((field) =>{
            formDataToSend.append(field.name,
                data[field.name]
            );
        })
        try{
            const response = await axios.post("http://localhost:3000/signup",
            formDataToSend,
            {
                headers:{
                    "Content-Type":"multipart/form-data",
                },
            })
        }
        catch (error) {
            console.error("Error submitting form:", error);
            // Error handle
            // Error page
        }
        console.log("success: "+response.data);
        navigate("/login/admin");
    };
  

   

    return (
        <>
            <NavBar links={AdminNavLinks} />
            <CommonSignUp title="Admin SignUp" fields={Adminfields} onSubmit={handleSubmit} 
                studentSignup={studentSignup}
                currentStage={1}
                 isAdminSignUp= {true}
                />
        </>
    );
}

export default AdminSignUp;