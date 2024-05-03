import React,{useState} from "react"
import axios from "axios"
import { interviewComposition } from "@/assets"


function CommonSignUp({title,fields,onSubmit})
{
    //state variable
    const [formData, setFormData] = useState(fields.reduce((acc, field) => {
        acc[field.name] = field.initialValue || "";
        return acc;
    }, {}));

    //input change
    const handleChange = (e) => {
        const {name , value,files} = e.target;
        setFormData(prevState =>({
            ...prevState,
            [name]:name==="idcard" || name === "resume" ? files[0]:value
        }));
    }

    //submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        fields.forEach(field => {
            formDataToSend.append(field.name, formData[field.name]);
        });

        try {
            //axios POST
            const response = await axios.post("http://localhost:5000/signup", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Response from server:", response.data);

            //success
            onSubmit(response.data); //can send data to parent component

        } catch (error) {
            console.error("Error submitting form:", error);
            //error handle
            //error page
        }
    };

    return (
        <div>
          
            <div className="white text-white font-sans animate-slideFromBottom">
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-full max-w-4xl p-8 bg-zinc-800 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold mb-8 text-center">{title}</h1>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {fields.map(field => (
                                    <div key={field.name}>
                                        <label htmlFor={field.name} className="block text-sm font-medium">{field.label}:</label>
                                        {field.type === "file" ? (
                                            <input type="file" id={field.name} name={field.name} onChange={handleChange} required className="mt-1 block w-full text-sm text-zinc-900  file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600" />
                                        ) : (
                                            <input type={field.type} id={field.name} name={field.name} value={formData[field.name]} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className="block mx-auto py-3 px-6 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600">
                                SignUp
                            </button>
                        </form>
                    </div>
                </div>
                <img src={interviewComposition} alt="" />
            </div>
        </div>
    );
}

export default CommonSignUp;