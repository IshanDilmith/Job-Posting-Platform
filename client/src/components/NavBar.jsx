'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, UserIcon, BriefcaseIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { getSession } from "next-auth/react";
import { signOut } from 'next-auth/react';

const NavBar = () => {
    const [session, setSession] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            setSession(session);
        };
        fetchSession();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSignOut = async () => {
        await signOut({
            callbackUrl: '/admin/login',
        });
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center space-x-2 w-1/4">
                        <BriefcaseIcon className="h-8 w-8 text-blue-600" />
                        <Link 
                            href="/" 
                            className="text-xl font-bold text-black"
                        >
                            JobPost
                        </Link>
                    </div>
                        
                    {/* Desktop Navigation Links */}
                    <div className="hidden sm:flex sm:items-center sm:justify-center flex-1 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center space-x-8">
                            <Link 
                                href="/" 
                                className="inline-flex items-center px-1 pt-1 text-gray-500 font-medium 
                                hover:text-blue-600 transition-colors duration-200 border-b-2 
                                border-transparent hover:border-blue-600"
                            >
                                Home
                            </Link>
                            <Link 
                                href="/" 
                                className="inline-flex items-center px-1 pt-1 text-gray-500 font-medium 
                                hover:text-blue-600 transition-colors duration-200 border-b-2 
                                border-transparent hover:border-blue-600"
                            >
                                Find Jobs
                            </Link>
                            <Link 
                                href="/" 
                                className="inline-flex items-center px-1 pt-1 text-gray-500 font-medium 
                                hover:text-blue-600 transition-colors duration-200 border-b-2 
                                border-transparent hover:border-blue-600"
                            >
                                Post a Job
                            </Link>
                            <Link 
                                href="/" 
                                className="inline-flex items-center px-1 pt-1 text-gray-500 font-medium 
                                hover:text-blue-600 transition-colors duration-200 border-b-2 
                                border-transparent hover:border-blue-600"
                            >
                                About
                            </Link>
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:space-x-4 w-1/4 justify-end">
                        <button
                            className="p-2 text-gray-600 hover:text-blue-600 rounded-full 
                            hover:bg-gray-100 transition-colors duration-200"
                        >
                            <MagnifyingGlassIcon className="h-5 w-5" />
                        </button>
                        {session && (
                            <>
                                <Link 
                                    href="/admin"
                                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium 
                                        text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 
                                        transition-all duration-200 gap-2"
                                >
                                    <ChartBarIcon className="h-5 w-5" />
                                </Link>
                                <button 
                                    onClick={handleSignOut}
                                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium 
                                        text-white bg-blue-600 rounded-full hover:bg-blue-700 
                                        transition-all duration-200 gap-2 hover:shadow-md"
                                >
                                    <UserIcon className="h-5 w-5" />
                                    Sign Out
                                </button>
                            </>
                        )}
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
                            href="/"
                            className="block px-3 py-2 text-gray-900 font-medium hover:bg-blue-50 
                            hover:text-blue-600 transition-colors duration-200 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Find Jobs
                        </Link>
                        <Link
                            href="/"
                            className="block px-3 py-2 text-gray-900 font-medium hover:bg-blue-50 
                            hover:text-blue-600 transition-colors duration-200 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Post a Job
                        </Link>
                        <Link
                            href="/"
                            className="block px-3 py-2 text-gray-900 font-medium hover:bg-blue-50 
                            hover:text-blue-600 transition-colors duration-200 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/"
                            className="block px-3 py-2 text-gray-900 font-medium hover:bg-blue-50 
                            hover:text-blue-600 transition-colors duration-200 rounded-md"
                            onClick={() => setIsOpen(false)}
                        >
                            <MagnifyingGlassIcon className="h-5 w-5" />
                        </Link>
                        {session && (
                            <>
                                <Link 
                                    href="/admin"
                                    className="flex w-full items-center px-3 py-2 text-gray-900 font-medium 
                                        hover:bg-blue-50 hover:text-blue-600 transition-colors 
                                        duration-200 rounded-md gap-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <ChartBarIcon className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <button 
                                    onClick={handleSignOut}
                                    className="flex w-full items-center px-3 py-2 text-gray-900 font-medium 
                                        hover:bg-blue-50 hover:text-blue-600 transition-colors 
                                        duration-200 rounded-md gap-2"
                                >
                                    <UserIcon className="h-5 w-5" />
                                    Sign Out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;