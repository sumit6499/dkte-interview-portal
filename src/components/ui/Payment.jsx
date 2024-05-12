import React from "react";
import { paymentQR } from "@/assets";

const PaymentComponent = () => {
    return (
        <>
            <p className="text-center mt-3 text-yellow-500 font-bold">Pay ₹500 to proceed further</p>
            <div className="flex justify-center">
                <img src={paymentQR} alt="" className="w-64 h-82" />
            </div>
        </>
    );
};

export default PaymentComponent;
