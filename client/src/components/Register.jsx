'use client';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Register = ({ onClose }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                firstName,
                lastName,
                email,
                phoneNumber,
                password 
            }),
        });

        const data = await res.json();

        if (res.status === 201) {
            toast.success('Registration successful!');
            onClose();
        } else {
            toast.error(data.error || 'Something went wrong!');
            setError(data.error || 'Something went wrong!');
        }
    }


    return (
        <div className="w-full">
            <Toaster/>

            <div className="space-y-4 mb-6">
                <h2 className="text-2xl font-bold text-[#1F2937]">
                    Register a new Admin
                </h2>
                <p className="text-sm text-[#6B7280]">
                    Fill in the details to create a new Admin
                </p>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}


            <form onSubmit={handleSubmit} className="space-y-6">
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
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
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
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#1F2937] placeholder-[#6B7280] text-sm sm:text-base
                                focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
                                placeholder="Enter your Last Name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#1F2937]">
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                            required
                            pattern="[0-9]{10}"
                            className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#1F2937] placeholder-[#6B7280] text-sm sm:text-base
                            focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-[#1F2937]">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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
                            onChange={(e) => setPassword(e.target.value)}
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
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;