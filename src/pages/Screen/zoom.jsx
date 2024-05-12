import React from 'react';
// Importing Tailwind CSS directly in JavaScript
import 'tailwindcss/tailwind.css';
import { ZoomMtg } from '@zoom/meetingsdk/embedded';
// import { ZoomMtg } from '@zoom/meetingsdk';
import StudentEvaluationForm from './EvaluationForm';

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();

function Zoom() {
    var authEndpoint = '';
    var sdkKey = '';
    var meetingNumber = '123456789';
    var passWord = '';
    var role = 0;
    var userName = 'React';
    var userEmail = '';
    var registrantToken = '';
    var zakToken = '';
    var leaveUrl = 'http://localhost:3000';

    function getSignature(e) {
        e.preventDefault();

        fetch(authEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                meetingNumber: meetingNumber,
                role: role
            })
        }).then(res => res.json())
            .then(response => {
                startMeeting(response.signature);
            }).catch(error => {
                console.error(error);
            });
    }

    function startMeeting(signature) {
        document.getElementById('zmmtg-root').style.display = 'block';

        ZoomMtg.init({
            leaveUrl: leaveUrl,
            patchJsMedia: true,
            success: (success) => {
                console.log(success);

                ZoomMtg.join({
                    signature: signature,
                    sdkKey: sdkKey,
                    meetingNumber: meetingNumber,
                    passWord: passWord,
                    userName: userName,
                    userEmail: userEmail,
                    tk: registrantToken,
                    zak: zakToken,
                    success: (success) => {
                        console.log(success);
                    },
                    error: (error) => {
                        console.log(error);
                    }
                });

            },
            error: (error) => {
                console.log(error);
            }
        });
    }
    return (
        <div className="w-full mx-auto text-center flex justify-between">
            <div className='flex justify-center w-4/5'>
                <div className="w-full md:w-1/2">
                    <h1 className="text-2xl mb-4">Zoom Meeting SDK Sample React</h1>
                    <button onClick={getSignature} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Join Meeting
                    </button>
                </div>
            </div>
            <div className='flex justify-end'>
            <div className="evaluation-form ">
                <StudentEvaluationForm />
            </div>
            </div>
        </div>
      
    );
}

export default Zoom;
