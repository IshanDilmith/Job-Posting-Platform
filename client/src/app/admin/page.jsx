'use client';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import UserDashboard from '@/components/userDashboard';
import JobDashboard from '@/components/jobDashboard';
import { signOut } from 'next-auth/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Register from '@/components/Register';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [admins, setAdmins] = useState([]);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [jobPosts, setJobPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogOut = async () => {
        await signOut({
            callbackUrl: '/admin/login',
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (activeTab === 'dashboard') {
                    const response = await fetch('/api/admin/users', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include'
                    });
                    const data = await response.json();
                    
                    if (data.success) {
                        setAdmins(data.data);
                        setTotalAdmins(data.data.length);
                    } else {
                        toast.error(data.error || 'Failed to fetch data');
                    }
                    setIsLoading(false);
                }
            } catch (error) {
                toast.error('Failed to fetch data');
            }
        };

        fetchData();
    }, [activeTab]);

    const tabs = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'jobs', label: 'Manage Job Posts' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster />
            
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-[#1F2937]">Admin Dashboard</h1>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-4 py-2 text-sm font-medium text-white bg-[#10B981] rounded-lg 
                                hover:bg-[#059669] focus:outline-none focus:ring-2 focus:ring-offset-2 
                                focus:ring-[#10B981] transition-colors duration-200"
                            >
                                Add Admin
                            </button>
                            <button
                                onClick={handleLogOut}
                                className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] rounded-lg 
                                hover:bg-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-offset-2 
                                focus:ring-[#2563EB] transition-colors duration-200"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <>
                    {/* Modal Backdrop with blur */}
                    <div 
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Modal Container with animation */}
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div 
                                className="w-full max-w-2xl transform overflow-hidden rounded-xl 
                                bg-gradient-to-br from-[#F9FAFB] to-[#E5E7EB] text-left 
                                shadow-2xl transition-all animate-modal"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="flex items-center justify-end px-3 pt-3">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="rounded-full p-2 hover:bg-white/50 transition-colors duration-200"
                                    >
                                        <XMarkIcon className="h-6 w-6 text-[#1F2937]" />
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="px-6 pb-6">
                                    <Register onClose={() => setIsModalOpen(false)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Tab Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                                    ${activeTab === tab.id
                                        ? 'border-[#2563EB] text-[#2563EB]'
                                        : 'border-transparent text-[#6B7280] hover:text-[#1F2937] hover:border-[#6B7280]'
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'dashboard' && (
                    <div>
                        <UserDashboard
                            admins={admins}
                            totalAdmins={totalAdmins}
                            totalJobs={totalJobs}
                            isLoading={isLoading}/>
                    </div>
                )}

                {activeTab === 'jobs' && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <JobDashboard 
                            jobPosts={jobPosts}/>
                    </div>
                )}
            </div>
        </div>
    );
}