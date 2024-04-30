
import React, { useRef, useState, useEffect } from "react";
import { logo } from '@/assets/'
import MobileNav from "./MobileNav";
import '@/App.css'

function NavBar() {
    const navRef = useRef();
    const navLinksRef = useRef(); 
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 1024);
        };

        checkScreenSize(); 
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <section className="w-full antialiased">
            <nav className="navbar flex flex-1 items-center justify-between bg-black h-[80px] max-w-screen-2xl m-auto text-white rounded-b-lg rounded-br-lg px-8 sm:px-[111px]" ref={navRef}>
                <div className="logo flex items-center text-[20px]">
                    <img src={logo} alt="" className="h-[32px] w-[126px] object-contain" />
                    <h1 className="">Ascendere</h1>
                </div>
                <div className={`navlinks flex gap-5 text-lg space-x-5 ${isSmallScreen ? 'hidden' : ''}`} ref={navLinksRef}>
                    <a href="/" className="hover:text-primary">Home</a>
                    <a href="/loginPage" className="hover:text-primary">Login</a>
                    <a href="/SignUpPage" className="hover:text-primary">Register</a>
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

