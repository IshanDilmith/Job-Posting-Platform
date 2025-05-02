'use client';
import Spinner from "./Spinner";

export default function Dashboard({ totalAdmins, totalJobs, isLoading }) {
    if(isLoading) {
        return (
            <div>
                <Spinner/>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Dashboard Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-2xl font-bold text-[#1F2937]">Admin Dashboard</h1>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium text-[#1F2937]">Total Admins</h3>
                            <p className="mt-2 text-3xl font-bold text-[#2563EB]">{totalAdmins}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-medium text-[#1F2937]">Total Jobs</h3>
                            <p className="mt-2 text-3xl font-bold text-[#2563EB]">{totalJobs}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}