"use client"
import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useParams } from 'next/navigation'
import JobApply from '@/components/jobApplyForm'
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '@/components/NavBar'

export default function JobDetails() {
    const router = useRouter();
    const [job, setJob] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const { id } = params;
    const [selectedJobId, setSelectedJobId] = useState(null);

    const fetchJobDetails = async () => {
        
        try {
            const response = await fetch(`/api/job-posting/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const res = await response.json()
            if (res.success) {
                setJob(res.data)
            } else {
                setError(res.error || 'Failed to fetch job details')
                router.push('/')
            }
        } catch (error) {
            setError('Failed to fetch job details')
            router.push('/')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchJobDetails()
    }, [id])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    if (error || !job) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {error || 'Job not found'}
                    </h2>
                    <button
                        onClick={() => router.push('/')}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Return to home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Toaster />
            <NavBar />
            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="group mb-8 inline-flex items-center px-4 py-2 text-sm font-medium 
                            text-gray-700 hover:text-blue-600 bg-white rounded-lg shadow-sm 
                            hover:shadow transition-all duration-200 ease-in-out"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 
                            transition-transform duration-200 ease-in-out" />
                        Back to Jobs
                    </button>

                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        {/* Header Section */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {job.title}
                                    </h1>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {job.category}
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedJobId(job._id)
                                    }}
                                    className="px-6 py-3 bg-[#2563EB] text-white rounded-lg hover:bg-[#1E40AF] 
                                    transition-colors duration-200 focus:outline-none focus:ring-2 
                                    focus:ring-offset-2 focus:ring-[#2563EB]"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>

                        {selectedJobId && (
                            <JobApply
                                job={job}
                                onClose={() => setSelectedJobId(null)}
                            />
                        )}

                        {/* Content Section */}
                        <div className="p-6 space-y-6">
                            {/* Description */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Job Description
                                </h2>
                                <div 
                                    className="prose max-w-none text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: job.description }}
                                />
                            </div>

                            {/* Questions */}
                            {job.questions.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                        Screening Questions
                                    </h2>
                                    <div className="space-y-3">
                                        {job.questions.map((question, index) => (
                                            <div 
                                                key={index}
                                                className="flex items-start"
                                            >
                                                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mr-3">
                                                    {index + 1}
                                                </span>
                                                <p className="text-gray-700">{question}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}