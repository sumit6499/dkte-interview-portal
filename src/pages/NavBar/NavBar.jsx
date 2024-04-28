import React from "react";
import {logo} from '@/assets/'
function NavBar() {

    return (

        <section className=" w-full antialised">
        <nav className="navbar flex flex-1 items-center justify-between bg-black h-[80px] max-w-screen-2xl m-auto text-white rounded-b-lg rounded-br-lg px-[111px] ">
            <div className="logo flex items-center text-[20px]">
                <img src={logo} alt="" className="h-[32px] w-[126px] object-contain"/>
                <h1 className="">Ascendere</h1>
            </div>
            <div className="navlinks flex gap-5 text-lg ">
                    <a href="/" className="hover:text-primary">Home</a>
                    <a href="/loginPage" className="hover:text-primary">Login</a>
                    <a href="/SignUpPage" className="hover:text-primary">Register</a>
                <a href="/" className="hover:text-primary">Contact</a>
            </div>
        </nav>
    </section>
    )

}

export default NavBar;