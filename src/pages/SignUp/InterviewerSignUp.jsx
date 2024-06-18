import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { interviewComposition } from '@/assets';
import axios from 'axios';
import { InterviewerNavLinks } from '@/components/variables/formVariables';
import { ToastContainer, toast } from 'react-toastify'; // Make sure to import toast from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '@/App.css';
import { capitalize } from 'lodash'; // Import lodash capitalize function
import { useNavigate } from 'react-router';
import { interviewerSignUp } from '@/api/index'; // Import interviewerSignUp function from the API file
import { useDispatch } from 'react-redux';
import { authenticate, setUserInfo } from '@/redux/authSlice'
import Loader from '@/components/ui/loading';
const InterviewerSignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userExists, setUserExists] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState({});
    const [fileData, setFileData] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        profession: '',
        freeday: '',
        startTime: '',
        endTime: '',
    });

    const handleRemoveFile = (fieldName) => {
        setFileData((prevState) => {
            const updatedFileData = { ...prevState };
            delete updatedFileData[fieldName];
            return updatedFileData;
        });
    };
    const handleFileChange = (e) => {
        if (e) {
            const { name, files } = e.target;
            setFormData((prevState) => ({
                ...prevState,
                idCard: files[0],
            }));
        } else {

            setFormData((prevState) => ({
                ...prevState,
                idCard: null,
            }));
        }
    };

    const handleTimeRangeChange = (e, day, field) => {
        const newSelectedTimes = { ...selectedTimes };
        newSelectedTimes[day][field] = e.target.value;
        // const capitalizedDay = capitalize(day);
        setSelectedTimes(newSelectedTimes);
        setFormData(prevState => ({ ...prevState, freeday: day }));
        setFormData(prevState => ({ ...prevState, startTime: newSelectedTimes[day]['start'] }));
        setFormData(prevState => ({ ...prevState, endTime: newSelectedTimes[day]['end'] }));

    };

    //to display time in time boxes
    useEffect(() => {
        const initialSelectedTimes = {};
        selectedDays.forEach(day => {
            initialSelectedTimes[day] = {
                start: '',
                end: ''
            };
        });
        setSelectedTimes(initialSelectedTimes);
    }, [selectedDays]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formDataToSend = new FormData();

        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });
        try {
            const response = await interviewerSignUp(formData)
            const { data, token } = response.data;
            const { id: interviewerId, name, role, day, startTime, endTime } = data;
            const interviewerAuthToken = token;

            localStorage.setItem("interviewerId", interviewerId);
            localStorage.setItem("interviewerAuthToken", interviewerAuthToken);

            if (response.data) {
                dispatch(authenticate(true));
                dispatch(setUserInfo({ user: data, token, Uid: interviewerId, Name: name, Role: role, Day: day, StartTime: startTime, EndTime: endTime }));
               
                toast.success("SingUp Successful")
                setLoading(false)
                navigate('/login/student/profile');
            } else {
                setUserExists(false);
            }
            navigate('/login/interviewer');
        } catch (error) {
            setLoading(false);
            if (error.response.data.msg) {
                showToast(error.response.data.msg);
                setLoading(false);
            }
        }
    };
    const showToast = (message) => {
        toast.error(message);
    };
    const handleCombinedChange = (event) => {
        handleFileChange(event);
        // handleChange(event);
    };
    const handleDaysChange = (event) => {
        const options = event.target.selectedOptions;
        const values = Array.from(options, (option) => option.value);
        setSelectedDays(values);
        setFormData({ ...formData, idCard: event.target.value });
    };

    return (
        <>
            <NavBar links={InterviewerNavLinks} />
            <ToastContainer />
            {loading ? (<Loader />) : (<>
                <div className="max-w-2xl mx-auto p-8 bg-zinc-800 mt-10 rounded-lg mb-10 ">
                    <h1 className="text-xl font-bold mb-6 text-white flex justify-center">Interviewer SignUp</h1>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-white">Full Name:</label>
                            <input type="text" id="name" className="w-full p-2 bg-zinc-700 rounded text-white" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-white">Email:</label>
                            <input type="email" id="email" className="w-full p-2 bg-zinc-700 rounded text-white" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block mb-2 text-white">Phone:</label>
                            <input type="tel" id="phone" className="w-full p-2 bg-zinc-700 rounded text-white" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-white">Password:</label>
                            <input type="text" id="password" className="w-full p-2 bg-zinc-700 rounded text-white" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                        </div>
                        <div>
                            <label htmlFor="profession" className="block mb-2 text-white">Profession:</label>
                            <input type="text" id="profession" className="w-full p-2 bg-zinc-700 rounded text-white" value={formData.profession} onChange={(e) => setFormData({ ...formData, profession: e.target.value })} required />
                        </div>
                        <div>

                            <div>
                                <label htmlFor="idcard" className="block mb-2 text-white">ID Card:</label>
                                {fileData["idcard"] ? (
                                    <div className=''>
                                        <span></span>
                                        <span className='text-white'>{fileData["idcard"].name}</span>
                                        <button onClick={() => handleRemoveFile("idcard")} className="ml-2 p-1 mx-auto  bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600">Remove</button>
                                    </div>
                                ) : (
                                    <input
                                        type="file"
                                        id="idcard"
                                        name="idcard"
                                        onChange={handleCombinedChange}
                                        required
                                        className="  file:h-10 file:rounded text-sm text-white file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600"
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="days" className="block mb-2 text-white">Days Of Week You're Available:</label>
                            <select id="days" className="w-full p-2 bg-zinc-700 rounded text-white" onChange={(e) => setSelectedDays(Array.from(e.target.selectedOptions, option => option.value))} defaultValue={['MON']}>
                                <option>MON</option>
                                <option>TUE</option>
                                <option>WED</option>
                                <option>THU</option>
                                <option>FRI</option>
                                <option>SAT</option>
                                <option>SUN</option>
                            </select>
                        </div>

                        {selectedDays.map((day) => (
                            <div key={day}>
                                <label htmlFor={`start-time-${day}`} className="block mb-2 text-white">{day} Preferred Interview Start Time:</label>
                                <input
                                    type="time"
                                    id={`start-time-${day}`}
                                    className="w-full p-2 bg-zinc-700 rounded text-white"
                                    onChange={(e) => handleTimeRangeChange(e, day, 'start')}
                                    value={selectedTimes[day]?.start || ''}
                                />
                                <label htmlFor={`end-time-${day}`} className="block mb-2 text-white">{day} Preferred Interview End Time:</label>
                                <input
                                    type="time"
                                    id={`end-time-${day}`}
                                    className="w-full p-2 bg-zinc-700 rounded text-white"
                                    onChange={(e) => handleTimeRangeChange(e, day, 'end')}
                                    value={selectedTimes[day]?.end || ''}
                                />
                            </div>
                        ))}

                    </form>
                    <div className='grid grid-cols-1 '>
                        <button type="button" onClick={handleSubmit} className={"mt-10 block mx-auto py-3 px-6 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600"}>Sign Up</button>
                    </div>
                </div>
                <div>
                    <img src={interviewComposition} alt="" />
                </div>
            </>
            )}
        </>

    );
};

export default InterviewerSignUp;