import React, { useEffect, useRef, useState } from 'react'
import '@/App.css';
import NavBar from '@/pages/NavBar/NavBar';
import { Navlink } from '../variables/formVariables';
const OtpInput = ({ length = 4, onOtpSubmit = () => { } }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const handleChange = (index,e) => {
        var value = e.target.value;
        if(isNaN(value)) return;

        const newOtp = [...otp];
        //allow only one input
        newOtp[index] = value.substring(value.length-1);
        setOtp(newOtp);

        //submit trigger
        const combinedOtp = newOtp.join("");
       if(combinedOtp.length===length) onOtpSubmit(combinedOtp);

       //Move to next input if current field is filled 
        if(value && index<length-1 && inputRefs.current[index+1])
            {
                inputRefs.current[index+1].focus();
            }
    }
    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(0,1);
    }
    const handleKeyDown = (index,e) => {
        if(e.key==="Backspace"&& !otp[index]&& index>0&& inputRefs.current[index-1])
            {
            inputRefs.current[index - 1].focus();
            }
    }
    const inputRefs = useRef([]);

    useEffect(()=>{
        if(inputRefs.current[0])
            {
                inputRefs.current[0].focus();
            }
    },[])
    console.log(inputRefs);
    return (
        <>
      <NavBar links ={Navlink}/>
        <div>
            {otp.map((value, index) => {
                return <input type="text" key={index} value={value} ref={(input)=>(inputRefs.current[index]=input)} onChange={(e) => handleChange(index, e)} onClick={() => handleClick(index)}
                    onKeyDown={(e) => handleKeyDown(index, e)} className='otpInput' />
            })}
        </div>
        </>
    )
}

export default OtpInput;