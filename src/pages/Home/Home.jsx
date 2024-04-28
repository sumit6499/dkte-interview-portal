import { Button } from "@/components/ui/button"
// import NavBar from "../NavBar/NavBar"
import {interview,CollaborationFemaleMale,MaleUser, logo, Instagram, Twitter, Gmail,LinkedIn} from '@/assets/index'
import '@/App.css'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
  

export default function Home() {
  return (
    <main className="min-h-screen antialiased">
        <div className="hero min-h-[calc(100vh-80px)] flex pt-12 flex-col lg:flex-row">
            <div className="p-20 hero_content ">
                <h3 className="w-full scroll-m-20 text-4xl font-semibold tracking-tight mt-16  text-[#1D1D1D]">
                Navigating Success Together: 
                Alumni Mentorship Hub
                </h3>
                <Button  className={" py-6 px-14 justify-center items-center mt-8"} size={"lg"}>Get Started</Button>
            </div>
            <div className="hero_image flex  ">
                <img src={interview} alt="interview" className="w-[50rem] h-[25rem]"/>
            </div>

        </div>
        <div className="metas mt-8 text-lg font-normal mx-8 mb-10">
            <p className="bg-[#FECC00] p-3 rounded-xl text-center ">Seize Your Moment: Connecting You with Alumni Insights and Career Opportunities. Navigate your future with ease as alumni guide your journey through tailored interviews and seamless scheduling.</p>
        </div>

        <section className="w-full min-h-[400px] bg-[#FECC00] flex items-center ">
            <div className="cards w-full px-[120px]  flex flex-col lg:flex-row  gap-12 p-8  justify-center items-center">

                {[1,2,3].map((data,index)=>{
                    return(
                        <Card className={"card w-[362px] h-[300px] flex flex-col items-center "} key={index}>
                <CardHeader>
                    <CardTitle className="flex flex-col items-center">
                        <img src={CollaborationFemaleMale}alt="" className="w-16 mb-3"/>
                        <p className="font-semibold text-center">Efficient Communication Channels</p>
                    </CardTitle>
                </CardHeader>
                <CardContent className=" text-center  w-full">
                    <div className="line h-[1px] w-full bg-[#3D3D3D]">
                    </div>
                    <p className="mt-4 leading-2 text-slate-700">Seamless communication between students,interviewers, and administrators.</p>
                </CardContent>
            </Card>

                    )
                })}
            </div>
        </section>

        <section className="testimonials w-full min-h-[350px] flex justify-center items-center text-white font-light gap-6 flex-wrap py-4 p-4 lg:p-0">

                {[1,2,3].map((data,index)=>{
                    return (

                        <div className="testMoni w-[527px] h-[120px] bg-[#3d3d3d] flex flex-col py-4 px-2 items-center rounded-lg " key={index}>
                                <div className="testimonial_header flex items-center gap-4">
                                    <img src={MaleUser} alt="" className="w-14 h-14 object-contain"/>
                                    <p className="text-sm ">Testimonial 1  lorem epsum Testimonial 1 lorem epsum</p>
                                </div>
                                <p className=" self-end px-2">- username</p>
                        </div>
                    )
                })}
        </section>

        <footer className="w-full min-h-[374px] bg-black text-white ">
            <div className="footer_logo px-6 py-4 flex items-center justify-between">
                <div className="dkte_logo flex items-center">
                    <img src={logo} alt="" className="w-20 h-8 object-contain"/>
                    <h4>Ascendere</h4>
                </div>
                <div className="social_media flex">
                    <img src={Instagram} alt="" className="w-12 h-10"/>
                    <img src={Gmail} alt="" className="w-12 h-10" />
                    <img src={Twitter} alt="" className="w-12 h-10" />
                    <img src={LinkedIn} alt="" className="w-12 h-10" />
                </div>
            </div>
        </footer>
    </main>
  )
}
