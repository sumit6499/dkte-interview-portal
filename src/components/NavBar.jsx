import React from 'react'; const Navbar = () => {
    return (
        <nav className="bg-black text-white flex justify-between items-center p-4 fixed top-0 left-0 w-full">
            <div className="flex items-center space-x-4">
                <img src="https://placehold.co/100x50/yellow" alt="DKTE Logo" className="h-8" />
                <span className="text-yellow-400 font-bold">Ascendere</span>
            </div>
            <div className="flex space-x-4">
                <a href="/" className="hover:text-zinc-300">Home</a>
                <a href="/login" className="hover:text-zinc-300">Login</a>
                <a href="/register" className="hover:text-zinc-300">Register</a>
                <a href="/contact" className="hover:text-zinc-300">Contact</a>
            </div>
        </nav>
    );
}; export default Navbar;
