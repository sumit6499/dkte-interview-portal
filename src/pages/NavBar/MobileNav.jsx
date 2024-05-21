
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, logo } from '@/assets'
import DropDownProfile from "@/components/ui/DropDownProfile"
import Dropdown from "@/components/ui/MobileDropDown"
function MobileNav({ drop,links }) {
    return (
        <div>
            <Sheet  >
                <SheetTrigger>
                    <img src={Menu} alt="" className="w-8 h-8 invert" />
                </SheetTrigger>
                <SheetContent side="left" className={" bg-background w-[320px]"}>
                    <SheetHeader >
                        <SheetTitle className={"my-6 "}>
                            <div className="logo_container flex items-center">
                                <img src={logo} alt="" className='object-contain' />
                                <h3 className='text-xl font-bold'>Ascendere</h3>
                            </div>
                        </SheetTitle>
                        <SheetDescription className="text-black min-h-full ">
                            <div className="navlinks flex flex-col gap-5 text-lg ">
                                {!drop && (
                                    <>
                                        {links.map((link, index) => (
                                            <a href={link.url} key={index} className="hover:text-primary">
                                                {link.label}
                                            </a>
                                        ))}
                                    </>
                                )}

                                {drop && (<>
                                    {links.map((link, index) => (
                                        <a href={link.url} key={index} className="hover:text-primary">
                                            {link.label}
                                        </a>
                                    ))}
                                    <Dropdown />
                                    </>)}
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNav
