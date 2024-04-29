import { interviewComposition } from '@/assets/';
import NavBar from "../NavBar/NavBar"
function AdminSignUp() {
    return (
        <div>
            <div> <NavBar /></div>
            <div className="white text-white font-sans animate-slideFromBottom ">

                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-full max-w-4xl p-8 bg-zinc-800 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold mb-8 text-center">Admin SignUp</h1>
                        <form action="submit-admin-signup" method="POST" enctype="multipart/form-data" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullname" className="block text-sm font-medium">Full Name:</label>
                                    <input type="text" name="fullname" id="fullname" required className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                    <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:border-yellow-500" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium">Phone:</label>
                                    <input type="tel" name="phone" id="phone" required
                                        className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="idcard" className="block text-sm font-medium">ID Card:</label>
                                        <input type="file" name="idcard" id="idcard" required className="mt-1 block w-full text-sm text-zinc-990 file:mr-4
                                    file:py-2
                                    file:px-4
                                    file:border-0
                                    file:text-sm
                                    file:font-semibold
                                    file:bg-yellow-500
                                    file:text-black
                                    hover:file:bg-yellow-600" />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="block mx-auto py-3 px-6 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600">
                                SignUp
                            </button>
                        </form>
                    </div>
                </div>
                <img src={interviewComposition} alt="" />
            </div>
        </div>
    )
}
export default AdminSignUp;