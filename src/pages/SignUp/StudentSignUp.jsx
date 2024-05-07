import React ,{useState}from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router";
import axios from "axios";
import { stdFieldsStage1, stdFieldsStage2, StudentNavlinks } from '@/components/variables/formVariables.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentSignUp() {
    const [stage, setStage] = useState(1);
    const navigate = useNavigate();
   
    const studentSignup =  true
    const IsInterviwerSignUp = false;

    // const handleSubmit = (data) => {
    //     //  student sign up success 
    //     navigate('/StudentHome');
    // };
    const handleSubmit = async  (formData) => {
        // Perform validation and processing for each stage
        if (stage === 1) {
            // Validation for stage 1
            // Proceed to stage 2
            setStage(2);
        } else if (stage === 2) {
            // Validation for stage 2
            // Proceed to stage 3
            
            formData.preventDefault();
            const formDataToSend = new FormData();
            fields.forEach((field) => {
                formDataToSend.append(field.name, formData[field.name]);
            });

            try {
                // Axios POST
                const response = await axios.post(
                    "http://localhost:5000/signup",
                    formDataToSend,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log("Response from server:", response.data);
                // console.log("success: " + data);
                toast.success('Signup Successful!', { position: toast.POSITION.TOP_CENTER });

                navigate("/login/student");
                // Success
                // Can send data to parent component
            } catch (error) {
                console.error("Error submitting form:", error);
                // Error handle
                // Error page
            }
            // setStage(3);
        } else {
            // Final stage submission
            // Process form data
           
        }
    };
    
    
    return (
        <>
            <NavBar links={StudentNavlinks} />
            <ToastContainer />
            <CommonSignUp
                // title={`Student SignUp - Stage ${stage}`}
                title={"Student SignUp" }
                fields={stage === 1 ? stdFieldsStage1 : stdFieldsStage2 }
                // fields={ stdFieldsStage1  }
                onSubmit={handleSubmit}
                className="pt-20"
                currentStage={stage} 
                onPrev={() => setStage(stage - 1)} // Pass current stage to the form component
                studentSignup={studentSignup}
                IsInterviwerSignUp={IsInterviwerSignUp}
            />
        </>
    );
}

export default StudentSignUp;
