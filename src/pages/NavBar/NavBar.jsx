import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo } from '@/assets/'
import MobileNav from "./MobileNav";
import '@/App.css'
import DropDownProfile from "@/components/ui/DropDownProfile";

function NavBar(props) {
    const { links, drop, profileLink, isAdmin } = props;
    console.log("Prilelink "+profileLink)
    const navRef = useRef();
    const navLinksRef = useRef();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [TitleChangeOnDrop, setTitleChangeOnDrop] = useState(false);
    useEffect(() => {
        const checkScreenSize = () => {
            if (drop) {
                setIsSmallScreen(window.innerWidth <= 1108);
            }
            else {
                setIsSmallScreen(window.innerWidth <= 1024);
            }

            setTitleChangeOnDrop(window.innerWidth <= 460);

        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, [drop]);
    // console.log(TitleChangeOnDrop)
    return (
        <section className="w-full antialiased">
            <nav className="navbar flex flex-1 items-center justify-between bg-black h-[80px] max-w-screen-2xl m-auto text-white rounded-b-lg rounded-br-lg px-8 sm:px-[111px]" ref={navRef}>

                <div className={`Navlogo flex items-center text-[20px] }`}>
                    <img src={logo} alt="" className={`h-34 w-auto object-contain ${TitleChangeOnDrop && 'w-20 h-[24]'}`} />
                    <h1 className="">Ascendere</h1>
                </div>
                <div className={`navlinks flex gap-5 text-lg space-x-5 ${isSmallScreen ? 'hidden' : ''}`} ref={navLinksRef}>
                    {links && links.length > 0 && links.map((link, index) => (
                        <Link key={index} to={link.url} className="hover:text-primary">{link.label}</Link>
                    ))}

                </div>

                {drop && <DropDownProfile profileLink={profileLink} isAdmin={isAdmin}/>}
                <div className="menu block lg:hidden">
                    <MobileNav drops={drop} links={links}  />
                </div>
            </nav>
        </section>
    );

}

export default NavBar;
