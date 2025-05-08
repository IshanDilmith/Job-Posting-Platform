'use client';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import UserDashboard from '@/components/userDashboard';
import JobDashboard from '@/components/jobDashboard';
import { signOut } from 'next-auth/react';
import Dashboard from '@/components/dashboard';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [admins, setAdmins] = useState([]);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [jobPosts, setJobPosts] = useState([]);

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

    const fetchJobs = async () => {
        try {
            const response = await fetch('/api/job-posting', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const res = await response.json();

            if (res.success) {
                setJobPosts(res.data);
                setTotalJobs(res.data.length);
            }
        } catch (error) {
            toast.error('Failed to fetch jobs');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        fetchJobs();
        
    }, [activeTab]);

    const tabs = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'users', label: 'Manage Users' },
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
                            <Link 
                                href="/"
                                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium 
                                    text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 
                                    transition-all duration-200 gap-2"
                            >
                                <HomeIcon className="h-5 w-5" />
                                Home
                            </Link>
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
                        <Dashboard
                            totalAdmins={totalAdmins}
                            totalJobs={totalJobs}
                            isLoading={isLoading}/>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div>
                        <UserDashboard
                            admins={admins}
                            totalAdmins={totalAdmins}
                            totalJobs={totalJobs}
                            isLoading={isLoading}/>
                    </div>
                )}

                {activeTab === 'jobs' && (
                    <div>
                        <JobDashboard 
                            jobPosts={jobPosts}
                            isLoading={isLoading}
                            fetchJobs={fetchJobs}/>
                    </div>
                )}
            </div>
        </div>
    );
}