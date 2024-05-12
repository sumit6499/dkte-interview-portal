// import React, { useState } from "react";
// import axios from "axios";
// import { interviewComposition, paymentQR } from "@/assets";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import FormBase64 from "./form64";

// const CommonSignUp = ({ title, fields, onSubmit, currentStage, className, onPrev, studentSignup }) => {
//     const [formData, setFormData] = useState(
//         fields.reduce((acc, field) => {
//             acc[field.name] = field.initialValue || "";
//             return acc;
//         }, {})
//     );

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
       

//         try {
//             const response = await axios.post(
//                 "http://localhost:5000/signup",
//                 formData
//             );
//             console.log("Response from server:", response.data);
//             onSubmit(response.data);
//         } catch (error) {
//             console.error("Error submitting form:", error);
//         }
//     };

//     const showToast = (message) => {
//         toast.error(message);
//     };

//     const renderFormFields = () => {
//         return fields.map((field) => (
//             <div key={field.name}>
//                 <label htmlFor={field.name} className="block text-sm font-medium">
//                     {field.label}:
//                 </label>
//                 {field.type === "select" ? (
//                     <select
//                         id={field.name}
//                         name={field.name}
//                         value={formData[field.name]}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
//                     >
//                         <option value="">Select {field.label}</option>
//                         {field.options.map((option) => (
//                             <option key={option} value={option}>
//                                 {option}
//                             </option>
//                         ))}
//                     </select>
//                 ) : field.type === "file" ? (
//                     <FormBase64 onChange={handleChange} fieldName={field.name} />
//                 ) : (
//                     <input
//                         type={field.type}
//                         id={field.name}
//                         name={field.name}
//                         value={formData[field.name]}
//                         onChange={handleChange}
//                         required
//                         className="mt-1 block w-full px-3 py-2 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 bg-zinc-700"
//                     />
//                 )}
//             </div>
//         ));
//     };

//     return (
//         <div className={`white text-white font-sans animate-slideFromBottom ${className}`}>
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="w-full max-w-4xl p-8 bg-zinc-800 rounded-lg shadow-lg">
//                     <h1 className="text-2xl font-bold mb-8 text-center">{title}</h1>
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {currentStage === 2 && studentSignup && (
//                             <>
//                                 <p className="text-center mt-3 text-yellow-500 font-bold">Pay ₹500 to proceed further</p>
//                                 <div className="flex justify-center">
//                                     <img src={paymentQR} alt="" className="w-64 h-82" />
//                                 </div>
//                             </>
//                         )}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {renderFormFields()}
//                         </div>
//                         <div className="flex justify-between">
//                             {currentStage === 1 && studentSignup && (
//                                 <button
//                                     type="button"
//                                     onClick={() => onSubmit(formData)}
//                                     className="block mx-auto py-3 px-6 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600"
//                                 >
//                                     Next
//                                 </button>
//                             )}
//                         </div>
//                         {currentStage === 1 && !studentSignup && (
//                             <button
//                                 type="submit"
//                                 className="block mx-auto py-3 px-6 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600"
//                             >
//                                 SignUp
//                             </button>
//                         )}
//                         {currentStage === 2 && studentSignup && (
//                             <div className="flex">
//                                 <button
//                                     type="button"
//                                     onClick={onPrev}
//                                     className="block mx-auto py-3 px-6 bg-gray-500 text-black font-bold rounded-md hover:bg-yellow-600">
//                                     Prev
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="block mx-auto py-3 px-6 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600"
//                                 >
//                                     SignUp
//                                 </button>
//                             </div>
//                         )}
//                     </form>
//                 </div>
//             </div>
//             <img src={interviewComposition} alt="" className="" />
//         </div>
//     );
// }

// export default CommonSignUp;
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormField from "./Formfield";
import PaymentComponent from "./Payment";
import SubmitButton from "./SubmitButton";
import PrevButton from "./PrevButton";

const CommonSignUp = ({ title, fields, onSubmit, currentStage, className, onPrev, studentSignup }) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => {
            acc[field.name] = field.initialValue || "";
            return acc;
        }, {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/signup",
                formData
            );
            console.log("Response from server:", response.data);
            onSubmit(response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const renderFormFields = () => {
        return fields.map((field) => (
            <FormField
                key={field.name}
                field={field}
                formData={formData}
                handleChange={handleChange}
            />
        ));
    };

    return (
        <div className={`white text-white font-sans animate-slideFromBottom ${className}`}>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-4xl p-8 bg-zinc-800 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-8 text-center">{title}</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {currentStage === 2 && studentSignup && (
                            <PaymentComponent />
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderFormFields()}
                        </div>
                        {currentStage === 1 && studentSignup && (
                            <SubmitButton onSubmit={() => onSubmit(formData)} label="Next" />
                        )}
                        {currentStage === 1 && !studentSignup && (
                            <SubmitButton onSubmit={handleSubmit} label="SignUp" />
                        )}
                        {currentStage === 2 && studentSignup && (
                            <div className="flex">
                                <PrevButton onClick={onPrev} />
                                <SubmitButton onSubmit={handleSubmit} label="SignUp" />
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CommonSignUp;
