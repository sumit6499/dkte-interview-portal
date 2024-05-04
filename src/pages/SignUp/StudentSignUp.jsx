import React ,{useState}from "react";
import CommonSignUp from "@/components/ui/CommonSignUp";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router";
function StudentSignUp() {
    const [stage, setStage] = useState(1);
    const navigate = useNavigate();
    const links = [
        { label: 'Home', url: '/' },
        { label: 'Login', url: '/login' },
        { label: 'Register', url: '/signup' },
        { label: 'Contact', url: '/' },
    ];
    // const handleSubmit = (data) => {
    //     //  student sign up success 
    //     navigate('/StudentHome');
    // };
    const handleSubmit = (formData) => {
        // Perform validation and processing for each stage
        if (stage === 1) {
            // Validation for stage 1
            // Proceed to stage 2
            setStage(2);
        } else if (stage === 2) {
            // Validation for stage 2
            // Proceed to stage 3
            setStage(3);
        } else {
            // Final stage submission
            // Process form data
            console.log("Form submitted:", formData);
            // Redirect to success page
            navigate('/login/student');
        }
    };
    const departmentOptions = [
        "CSE",
        "AI",
        "AIDS",
        "ENTC",
        "MECH",
        "ELECTRIC",
        "CIVIL",
    ]

    const fieldsStage1 = [
        { name: "name", label: "Full Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" },
        {
            name:"dept",
            label:"Department",
            type:"select",
            options:departmentOptions
        },
        { name: "class", label: "Class", type: "text" },
        { name: "PRN", label: "PRN", type: "text" },
        { name: "password", label: "Password", type: "text" },
        { name: "idcard", label: "ID Card", type: "file" },
        { name: "resume", label: "Resume", type: "file" }
    ];
    const fieldsStage2 = [
        { name: "address", label: "Address", type: "text" },
        { name: "city", label: "City", type: "text" },
        { name: "state", label: "State", type: "text" },
        { name: "zip", label: "Zip Code", type: "text" },
        { name: "country", label: "Country", type: "text" },
        { name: "dob", label: "Date of Birth", type: "date" },
        { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
        { name: "ethnicity", label: "Ethnicity", type: "text" },
        { name: "guardianName", label: "Guardian Name", type: "text" },
        { name: "guardianPhone", label: "Guardian Phone", type: "tel" }
    ];

    const fields = stage === 1 ? fieldsStage1 : fieldsStage2;
    
    return (
        <>
            <NavBar links={links} />
            <CommonSignUp
                // title={`Student SignUp - Stage ${stage}`}
                title={"Student SignUp" }
                fields={fields}
                onSubmit={handleSubmit}
                className="pt-20"
                currentStage={stage} 
                onPrev={() => setStage(stage - 1)} // Pass current stage to the form component
            />
        </>
    );
}

export default StudentSignUp;
