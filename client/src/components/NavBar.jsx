'use client';

import { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-white to-gray-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link 
                            href="/" 
                            className="text-2xl font-extrabold text-transparent bg-clip-text 
                            bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 
                            hover:to-blue-700 transition-colors duration-300"
                        >
                            JobHub
                        </Link>
                    </div>
                        
                    {/* Desktop Navigation Links */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-8">
                        <Link 
                            href="/" 
                            className="inline-flex items-center px-1 pt-1 text-gray-900 font-medium 
                            hover:text-blue-600 transition-colors duration-200 border-b-2 
                            border-transparent hover:border-blue-600"
                        >
                            Home
                        </Link>
                        <Link 
                            href="/jobs" 
                            className="inline-flex items-center px-1 pt-1 text-gray-900 font-medium 
                            hover:text-blue-600 transition-colors duration-200 border-b-2 
                            border-transparent hover:border-blue-600"
                        >
                            Jobs
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md 
                            text-gray-600 hover:text-blue-600 hover:bg-gray-100 
                            transition-colors duration-200"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="sm:hidden bg-white border-t border-gray-100">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link
                            href="/"
                            className="block px-3 py-2 text-gray-900 font-medium hover:bg-blue-50 
                            hover:text-blue-600 transition-colors duration-200 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/jobs"
                            className="block px-3 py-2 text-gray-900 font-medium hover:bg-blue-50 
                            hover:text-blue-600 transition-colors duration-200 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Jobs
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;