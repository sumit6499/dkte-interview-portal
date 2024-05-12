import React, { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk/embedded";

const ZoomComponent = () => {
    useEffect(() => {
        ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.5/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();

        const apiKey = 'YOUR_ZOOM_API_KEY';
        const meetingConfig = {
            apiKey,
            meetingNumber: 'MEETING_NUMBER',
            userName: 'YOUR_NAME',
            userEmail: 'YOUR_EMAIL',
            passWord: 'MEETING_PASSWORD',
            leaveUrl: 'URL_TO_REDIRECT_AFTER_MEETING_ENDS'
        };

        ZoomMtg.init({
            leaveUrl: meetingConfig.leaveUrl,
            isSupportAV: true,
            success: function () {
                ZoomMtg.join({
                    meetingNumber: meetingConfig.meetingNumber,
                    userName: meetingConfig.userName,
                    userEmail: meetingConfig.userEmail,
                    passWord: meetingConfig.passWord,
                    apiKey: meetingConfig.apiKey,
                    success: function () {
                        console.log("Meeting joined successfully.");
                    },
                    error: function (res) {
                        console.error("Failed to join meeting:", res);
                    }
                });
            },
            error: function (res) {
                console.error("Failed to initialize Zoom SDK:", res);
            }
        });
    }, []);

    
    return (
        <div id="zmmtg-root"></div>
    );
};

export default ZoomComponent;
