"use client"
import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner'
import JobApply from '@/components/jobApplyForm'

export default function Home() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedJobId, setSelectedJobId] = useState(null);


    const fetchJobs = async () => {
        try {
            const response = await fetch('/api/job-posting', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const res = await response.json();

            if (res.success) {
                setJobs(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
            setJobs([]);
        } finally {
            setIsLoading(false);
        }
    };

       useEffect(() => {
        fetchJobs()
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Job Positions</h1>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <div 
                            key={job._id} 
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                        >
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    {job.title}
                                </h2>
                                <div className="text-sm text-gray-600 mb-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {job.category}
                                    </span>
                                </div>
                                <div 
                                    className="text-sm text-gray-500 mb-4 line-clamp-3"
                                    dangerouslySetInnerHTML={{ __html: job.description }}
                                />
                                <div className="mt-4">
                                    <button
                                        onClick={() => setSelectedJobId(job._id)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                                        text-white bg-[#2563EB] hover:bg-[#1E40AF] focus:outline-none focus:ring-2 
                                        focus:ring-offset-2 focus:ring-[#2563EB] transition-colors duration-200"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedJobId && (
                    <JobApply
                        job={jobs.find(job => job._id === selectedJobId)}
                        onClose={() => setSelectedJobId(null)}
                    />
                )}

                {jobs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No job positions available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    )
}