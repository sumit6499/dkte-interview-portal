
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
function MobileNav({ drop }) {
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
                                        <a href="/" className="text-primary font-">Home</a>
                                        <a href="/login" className="hover:text-primary">Login</a>
                                        <a href="/signup" className="hover:text-primary">Register</a>
                                        <a href="/" className="hover:text-primary">Contact</a>
                                    </>
                                )}

                                {drop && (<>
                                    <a href="/" className="text-primary font-">Home</a>
                                    <a href="/loginPage" className="hover:text-primary">Schedules</a>
                                    <a href="/SignUpPage" className="hover:text-primary">DashBoard</a>
                                    <a href="/" className="hover:text-primary">Contact</a>
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
