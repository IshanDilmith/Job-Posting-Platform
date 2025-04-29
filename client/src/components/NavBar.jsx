'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [session, setSession] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const session = await getSession();
            setSession(session);
        };
    
        getUser();
    }, [router]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogOut = async () => {
        await signOut({
            callbackUrl: '/login',
        });
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Desktop Navigation */}
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-2xl font-bold text-[#2563EB]">
                                JobHub
                            </Link>
                        </div>
                        
                        {/* Desktop Navigation Links */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/" className="inline-flex items-center px-1 pt-1 text-[#1F2937]">
                                Home
                            </Link>
                            <Link href="/jobs" className="inline-flex items-center px-1 pt-1 text-[#1F2937]">
                                Jobs
                            </Link>
                            {session?.user?.role === 'admin' && (
                                <Link href="/admin/dashboard" className="inline-flex items-center px-1 pt-1 text-[#1F2937]">
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                        {session ? (
                            <button
                                onClick={async () => {
                                    await handleLogOut();}}
                                className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] rounded-lg hover:bg-[#1E40AF] transition-colors duration-200"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-[#2563EB] hover:text-[#1E40AF] transition-colors duration-200"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] rounded-lg hover:bg-[#1E40AF] transition-colors duration-200"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-[#1F2937]"
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
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link
                            href="/"
                            className="block px-3 py-2 text-[#1F2937] hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/jobs"
                            className="block px-3 py-2 text-[#1F2937] hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Jobs
                        </Link>
                        {session?.user?.role === 'admin' && (
                            <Link
                                href="/admin/dashboard"
                                className="block px-3 py-2 text-[#1F2937] hover:bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}
                        {!session ? (
                            <>
                                <Link
                                    href="/login"
                                    className="block px-3 py-2 text-[#1F2937] hover:bg-gray-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="block px-3 py-2 text-[#1F2937] hover:bg-gray-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={async () => {
                                    await handleLogOut();
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 text-[#1F2937] hover:bg-gray-50"
                                >
                                Sign Out
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;