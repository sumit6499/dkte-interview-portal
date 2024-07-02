// PhoneOtpLogin.js

import React, { useState } from 'react';
import OtpInput from './otpInput';

const PhoneOtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneSubmit = async (event) => {
    event.preventDefault();

    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber })
      });

      const data = await response.json();

      if (data.success) {
        setShowOtpInput(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const onOtpSubmit = (otp) => {
    console.log("Login Successful", otp);
  };

  return (
    <div className='pt-100'>
      <div className='h-10'></div>
      <center>
        {!showOtpInput ? (
          <form className="mt-100 border-solid" onSubmit={handlePhoneSubmit}>
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumber}
              placeholder='Enter Phone Number'
            />
            <button type='submit'>Submit</button>
          </form>
        ) : (
          <div>
            <p>Enter OTP sent to {phoneNumber}</p>
            <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
          </div>
        )}
      </center>
    </div>
  );
};

export default PhoneOtpLogin;
