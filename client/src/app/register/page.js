'use client';
import React, { useState } from 'react';

const Register = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const checkConfirmPassword = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);

        if (value !== password) {
            setError('Passwords do not match');
        } else {
            setError(null);
        }
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] p-4 sm:p-6 lg:p-8">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
                <div className="space-y-4">
                    <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#1F2937]">
                        Create an Account
                    </h2>
                    <p className="text-center text-sm sm:text-base text-[#6B7280]">
                        Fill in the details to create a new account
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form className="space-y-6">
                    <div className="space-y-4">
                        {/* Replace the existing firstName div with this grid layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="block text-sm font-medium text-[#1F2937]">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#1F2937] placeholder-[#6B7280] text-sm sm:text-base
                                    focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your First Name"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="block text-sm font-medium text-[#1F2937]">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#1F2937] placeholder-[#6B7280] text-sm sm:text-base
                                    focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your Last Name"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-[#1F2937]">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#1F2937] placeholder-[#6B7280] text-sm sm:text-base
                                focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-[#1F2937]">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                onChange={handlePasswordChange}
                                value={password}
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#1F2937] placeholder-[#6B7280] text-sm sm:text-base
                                focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
                                placeholder="Create a password"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-[#1F2937]">
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                onChange={checkConfirmPassword}
                                value={confirmPassword}
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#1F2937] placeholder-[#6B7280] text-sm sm:text-base
                                focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-sm sm:text-base font-medium text-white bg-[#2563EB] rounded-lg 
                            hover:bg-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] 
                            transform transition-all duration-200 hover:scale-[1.02]"
                        >
                            Sign up
                        </button>

                        <p className="text-center text-sm text-[#6B7280]">
                            Already have an account?{' '}
                            <a href="/login" className="font-medium text-[#2563EB] hover:text-[#1E40AF] transition-colors duration-200">
                                Sign in
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;