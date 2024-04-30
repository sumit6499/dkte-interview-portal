import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from '@/assets/index.js';

const socialMediaLinks = [
    { name: 'Twitter', url: 'https://Twitter.com', icon: Twitter },
    { name: 'Instagram', url: 'https://instagram.com', icon: Instagram },
    { name: 'Facebook', url: 'https://Facebook.com', icon: Facebook }
];

const footerClasses = 'bg-black text-white p-8';
const gridClasses = 'max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8';
const linkClasses = 'hover:text-zinc-300';

const Footer = () => {
    const [isSmallScreen, setIsSmallerScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallerScreen(window.innerWidth <= 640);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <footer className={footerClasses}>
            <div className={isSmallScreen ? 'text-center' : ''}>
                <div className={isSmallScreen ? '' : gridClasses}>
                    <FooterSection title="About Us">
                        <FooterLink to="#" text="About DKTE Society" />
                        <FooterLink to="#" text="Chairman's Message" />
                        <FooterLink to="#" text="Director's message" />
                    </FooterSection>
                    <FooterSection title="Helpful Links">
                        <FooterLink to="#" text="FAQs" />
                        <FooterLink to="#" text="Bus Facility" />
                    </FooterSection>
                    <div className={isSmallScreen ? 'flex justify-center items-center space-x-4' : 'flex justify-end items-center space-x-4'}>
                        {socialMediaLinks.map((socialMedia, index) => (
                            <Link key={index} to={socialMedia.url} target="_blank" className={linkClasses}>
                                <img src={socialMedia.icon} alt={socialMedia.name} className="w-15 h-12" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterSection = ({ title, children }) => {
    return (
        <div>
            <h3 className="font-bold text-lg mb-3">{title}</h3>
            <ul className="space-y-2">
                {children}
            </ul>
        </div>
    );
};

const FooterLink = ({ to, text }) => {
    return (
        <li>
            <Link to={to} className={linkClasses}>{text}</Link>
        </li>
    );
};

export default Footer;
