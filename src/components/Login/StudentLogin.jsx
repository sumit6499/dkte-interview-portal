import React from "react";
import axios from "axios"
import { useNavigate,Link } from "react-router-dom";


function StudentLogin()
{
    return (
        <div className="login">
            <h1>Login</h1>

            <form action="POST">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" name="" id="" />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" name="" id="" />

                <input type="submit" name="" id="" />

                <br />
                <p>OR</p>
                <br />

                {/* <Link to="/signup   "></Link> */}
            </form>
        </div>
    )
}
export default StudentLogin;