import React, { useState,useEffect } from "react";
import axios from "axios";
import { interviewComposition } from "@/assets";
// import { Contact } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const razorpayScript = 'https://checkout.razorpay.com/v1/checkout.js';

function CommonSignUp({ title, fields, onSubmit, currentStage, className, onPrev, studentSignup }) {
    // State variable
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => {
            acc[field.name] = field.initialValue || "";
            return acc;
        }, {})
    );

    useEffect(() => {
        async function loadRazorpayScript() {
            try {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => console.log('Razorpay script loaded successfully');
                script.onerror = () => console.error('Failed to load Razorpay script');
                document.body.appendChild(script);
            } catch (error) {
                console.error('Error loading Razorpay script:', error);
            }
        }
        loadRazorpayScript();
    }, []);
    // function loadRazorpayScript() {
    //     return new Promise((resolve, reject) => {
    //         const script = document.createElement('script');
    //         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    //         script.onload = resolve;
    //         script.onerror = reject;
    //         document.body.appendChild(script);
    //     });
    // }
    async function handlePayment() {
        try {
            const response = await axios.post('http://localhost:3000/createOrder', {
                amount: 50000,
                currency: 'INR',
            });
            const options = {
                key: 'rzp_test_F6j4fjoQXNFwPB',
                amount: response.data.amount,
                currency: response.data.currency,
                order_id: response.data.id,
                name: 'Your Company Name',
                description: 'Payment for Student Signup',
                handler: function (response) {
                    alert('Payment successful');
                    console.log(response);
                    handleSubmit();
                },
                prefill: {
                    name: formData.name, 
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: {
                    color: '#F37254',
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error handling payment:', error);
        }
    }


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: name === "idcard" || name === "resume" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!Object.values(formData).every(value=>value !==''))
            {
            showToast("Please fill all the fields");
                return;
            }
        const formDataToSend = new FormData();
        fields.forEach((field) => {
            formDataToSend.append(field.name, formData[field.name]);
        });

        try {
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
            onSubmit(response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const showToast = (message) => {
        toast.error(message);
    };
    const renderFormFields = () => {
        return fields.map((field) => (
            <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium">
                    {field.label}:
                </label>
                {field.type === "select" ? (
                    <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    >
                        <option value="">Select {field.label}</option>
                        {field.options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ) : field.type === "file" ? (
                    <input
                        type="file"
                        id={field.name}
                        name={field.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full text-sm text-zinc-900 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600"
                    />
                ) : (
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                    />
                )}
            </div>
        ));
    };

    return (
        <div>
            <div className={`white text-white font-sans animate-slideFromBottom ${className}`}>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-full max-w-4xl p-8 bg-zinc-800 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold mb-8 text-center">{title}</h1>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {renderFormFields()}
                            </div>
                            <div className="flex justify-between ">
                                {currentStage === 1 && studentSignup && (
                                    <button
                                        type="button"
                                        onClick={() => onSubmit(formData)}
                                        className="block mx-auto py-3 px-6 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                            {currentStage === 1 && !studentSignup && (
                                <button
                                    type="submit"
                                    className="block mx-auto py-3 px-6 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600"
                                >
                                    SignUp
                                </button>
                            )}
                            {currentStage === 2 && studentSignup && (
                                <>
                                    <p className="text-center mt-3 text-yellow-500 font-bold">Pay ₹500 to proceed further</p>

                                    <button
                                        type="button"
                                        onClick={handlePayment}
                                        className="block mx-auto mt-3 py-3 px-6 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                                    >
                                        Pay ₹500
                                    </button>
                                    <div className="flex ">
                                        <button
                                            type="button"
                                            onClick={onPrev}
                                            className="block mx-auto py-3 px-6 bg-gray-500 text-black font-bold rounded-md hover:bg-yellow-600">
                                            Prev
                                        </button>
                                        <button
                                            type="submit"
                                            className="block mx-auto py-3 px-6 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600"
                                        >
                                            SignUp
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
                <img src={interviewComposition} alt="" className="" />
            </div>
        </div>
    );
}

export default CommonSignUp;
