import React from "react";
import { logo } from '@/assets/'
import MobileNav from "./MobileNav";
function NavBar() {

    return (

        <section className=" w-full antialised">
            <nav className="navbar flex flex-1 items-center  justify-between bg-black h-[80px] max-w-screen-2xl m-auto text-white rounded-b-lg rounded-br-lg px-8 sm:px-[111px] ">
                <div className="logo flex items-center text-[20px]">
                    <img src={logo} alt="" className="h-[32px] w-[126px] object-contain" />
                    <h1 className="">Ascendere</h1>
                </div>
                <div className="navlinks flex gap-5 text-lg space-x-5">
                    <a href="/" className="hover:text-primary ">Home</a>
                    <a href="/Students" className="hover:text-primary ">Students</a>
                    <a href="/SignUpPage" className="hover:text-primary">Schedules</a>
                    <a href="/" className="hover:text-primary">Contact</a>
                </div>
                <div className="menu block lg:hidden">
                    <MobileNav />
                </div>
            </nav>
        </section>
    )

}

export default NavBar;