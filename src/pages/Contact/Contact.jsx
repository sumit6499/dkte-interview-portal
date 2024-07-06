import { Button } from "@/components/ui/button";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer.jsx";
import { logo, Instagram, Twitter, Gmail, LinkedIn } from "@/assets/index";
import "@/App.css";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Navlink } from "@/components/variables/formVariables";
import axios from 'axios';

function Contact() {
    const [isSmallScreen, setIsSmallerScreen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallerScreen(window.innerWidth <= 640);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('https://api/contact', formData);
            // Handle success response
            console.log('Form submitted successfully:', response.data);
            alert('Message sent successfully!');
        } catch (error) {
            // Handle error response
            console.error('Error submitting form:', error);
            setError('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen antialiased">
            <NavBar links={Navlink} />
            <div className="contact min-h-[calc(100vh-80px)] flex pt-12 flex-col lg:flex-row">
                <div className="contact_content animate-slideFromLeft">
                    <h3 className={isSmallScreen ? 'w-full scroll-m-20 text-4xl font-semibold tracking-tight mt-16 text-[#1D1D1D] pl-8' : "w-full scroll-m-20 text-4xl font-semibold tracking-tight mt-16 text-[#1D1D1D] px-9"}>
                        <div className="w-full mb-4">Get In Touch With Us</div>
                        <div>We're Here To Help</div>
                    </h3>
                    <div className={isSmallScreen ? "flex p-8" : "flex px-9"}>
                        <Button className={"py-6 px-14 justify-center items-center mt-8 font-bold"} size={"lg"}>Send Message</Button>
                    </div>
                </div>
                {/* <div className="contact_image flex animate-slideFromLeft">
                    <img src={logo} alt="contact" className="w-[45rem] h-[25rem]" />
                </div> */}
            </div>

            <div className="contact_form mt-8 text-lg font-normal mx-8 mb-10">
                <p className="bg-[#FECC00] p-3 rounded-xl text-center">We value your feedback and inquiries. Reach out to us for any questions or support. We're here to assist you!</p>
                <form className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="5" placeholder="Your message" value={formData.message} onChange={handleChange}></textarea>
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <div className="flex items-center justify-between">
                        <Button className="py-2 px-4 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send'}
                        </Button>
                    </div>
                </form>
            </div>

            <section className="w-full min-h-[400px] bg-[#FECC00] flex items-center">
                <div className="cards w-full px-[120px] flex flex-col lg:flex-row gap-12 p-8 justify-center items-center">
                    {[1].map((data, index) => {
                        return (
                            <Card className={"card w-[362px] h-[300px] flex flex-col items-center"} key={index}>
                                <CardHeader>
                                    <CardTitle className="flex flex-col items-center">
                                        <img src={logo} alt="" className="w-16 mb-3" />
                                        <p className="font-semibold text-center">Contact Information</p>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center w-full">
                                    <div className="line h-[1px] w-full bg-[#3D3D3D]"></div>
                                    <p className="mt-4 leading-2 text-slate-700">Address: 1234 Street Name, City, Country</p>
                                    <p className="mt-4 leading-2 text-slate-700">Phone: (123) 456-7890</p>
                                    <p className="mt-4 leading-2 text-slate-700">Email: contact@company.com</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            <section className="social_media w-full min-h-[350px] flex justify-center items-center text-white font-light gap-6 flex-wrap py-4 p-4 lg:p-0 my-10">
                {[Instagram, Twitter, Gmail, LinkedIn].map((icon, index) => {
                    return (
                        <div className="social_icon w-[100px] h-[100px] bg-[#3d3d3d] flex flex-col py-4 px-2 items-center rounded-lg" key={index}>
                            <img src={icon} alt="" className="w-14 h-14 object-contain" />
                        </div>
                    );
                })}
            </section>

            <Footer />
        </main>
    );
}

export default Contact;
