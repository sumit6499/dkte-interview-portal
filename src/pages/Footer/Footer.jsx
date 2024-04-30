import { logo, Instagram, Twitter, Gmail, LinkedIn } from '@/assets/index'
import { useEffect } from 'react';

function Footer() {
    // const [isSmallScreen,setIsSmallScreen] = useState(false);

    // useEffect(() =>{
    //     const checkScreenSize = () =>{
    //         setIsSmallScreen(window.innerWidth <=675);
    //     };
    //     checkScreenSize();
    //     window.addEventListener("resize",checkScreenSize);

    //     return () => window.removeEventListener("resize",checkScreenSize);
    // },[])

    return (
        <footer className="w-full min-h-[374px] bg-black text-white ">
            <div className="footer_logo px-6 py-4 flex items-center justify-between">
                <div className="dkte_logo flex items-center px-10">
                    <img src={logo} alt="" className="w-20 h-8 object-contain" />
                    <h4>Ascendere</h4>
                </div>
                <div className="social_media flex space-x-50">
                    <a href="" className='px-6'>
                        <img src={Instagram} alt="" className="w-12 h-10" />
                    </a>
                    <a href="" className='px-6'>
                        <img src={Gmail} alt="" className="w-12 h-10" />
                    </a>
                    <a href="" className='px-6'>
                        <img src={Twitter} alt="" className="w-12 h-10" />
                    </a>
                    <a href="" className='px-6'>
                        <img src={LinkedIn} alt="" className="w-12 h-10" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;

