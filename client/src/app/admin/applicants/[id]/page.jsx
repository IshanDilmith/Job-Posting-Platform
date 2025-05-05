"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export default function ApplicantDetails() {

    const router = useRouter();
    const [applicants, setApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const { id } = params;

    const handleLogOut = async () => {
        await signOut({
            callbackUrl: '/admin/login',
        });
    };

    const [expandedRows, setExpandedRows] = useState(new Set());

    const toggleRow = (id) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(id)) {
            newExpandedRows.delete(id);
        } else {
            newExpandedRows.add(id);
        }
        setExpandedRows(newExpandedRows);
    };

    const fetchApplicants = async () => {
        try {
            const response = await fetch(`/api/applyJob/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const res = await response.json()
            if (res.success) {
                setApplicants(res.data)
            } else {
                setError(res.error || 'Failed to fetch applicants')
                router.push('/')
            }
        } catch (error) {
            setError('Failed to fetch applicants')
            router.push('/')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchApplicants()
    }, [id])

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

                
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <button
                    onClick={() => router.push('/admin')}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#2563EB] rounded-lg hover:bg-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] transition-colors duration-200"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back
                </button>
            </div>

            {/* Applicants Table */}
            {isLoading ? (
                <div className="min-h-screen flex items-center justify-center">
                    <Spinner />
                </div>
            ) : (
                <div className="overflow-x-auto mx-10 mt-8 bg-white shadow-sm rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Full Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phone Number
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Questions and Answers
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {applicants.map((applicant) => (
                                <React.Fragment key={applicant._id}>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {applicant.fullName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {applicant.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {applicant.phoneNumber}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => toggleRow(applicant._id)}
                                                className="text-blue-600 hover:text-blue-900 "
                                            >
                                                {expandedRows.has(applicant._id) ? (
                                                    <ChevronUpIcon className="h-5 w-5" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5" />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedRows.has(applicant._id) && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 bg-gray-50">
                                                <div className="space-y-4">
                                                    {applicant.questions.length > 0 ? (
                                                        applicant.questions.map((question, index) => (
                                                            <div key={index} className="space-y-1">
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    {question}
                                                                </p>
                                                                <p className="text-sm text-gray-600 ml-4">
                                                                    {applicant.answers[index]}
                                                                </p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-sm text-gray-600">
                                                            No questions provided for this Job post.
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}