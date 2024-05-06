import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from '@/assets/index.js';
import { footerClasses, gridClasses, linkClasses } from '@/components/styles/sharedStyles'
import { socialMediaLinks } from '@/components/variables/formVariables';

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
            <div className={isSmallScreen ? 'text-center  ' : ''}>
                <div className={isSmallScreen ? 'space-y-8' : gridClasses}>
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

const FooterSection = ({ title, children, isSmallScreen }) => {
    return (
        <div className={isSmallScreen ? 'pb-2' : ''}>
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
