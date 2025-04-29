'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError(res.error);
            console.error(error);
        } else {
            const session = await getSession();
            toast.success('Login successful!');

            if (session?.user?.role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/');
            }
        }
    }

    return (
        <div>
            <Toaster/>
        
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] p-4 sm:p-6 lg:p-8">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#1F2937]">
                            Welcome Back
                        </h2>
                        <p className="text-center text-sm sm:text-base text-[#6B7280]">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-[#1F2937]">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] text-[#1F2937] placeholder-[#6B7280] text-sm sm:text-base
                                    focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your password"
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
                                Sign in
                            </button>

                            <p className="text-center text-sm text-[#6B7280]">
                                Don't have an account?{' '}
                                <a href="/register" className="font-medium text-[#2563EB] hover:text-[#1E40AF] transition-colors duration-200">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;