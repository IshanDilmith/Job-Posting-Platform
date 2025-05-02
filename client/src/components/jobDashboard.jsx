'use client';

import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from './Spinner';
import UpdateJobForm from './UpdateJobForm';
import Tiptap from './Tiptap';

export default function jobDashboard({ jobPosts, isLoading, fetchJobs }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJobId, setEditingJobId] = useState(null);

    const jobCategory = ['Full Stack', 'Front End', 'Back End', 'Data Science', 'Machine Learning', 'DevOps'];

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: jobCategory[0],
        questions: [''],
        emailForNotifications: ''
    });

    const handleDelete = async (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                const response = await fetch(`/api/job-posting/${jobId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    toast.success('Job deleted successfully');
                    fetchJobs();
                }
            } catch (error) {
                toast.error('Failed to delete job');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            category: jobCategory[0],
            questions: [''],
            emailForNotifications: ''
        });
    };

    // Add/remove dynamic fields (requirements, questions)
    const handleArrayFieldAdd = (field) => {
        setFormData({
            ...formData,
            [field]: [...formData[field], '']
        });
    };

    const handleArrayFieldRemove = (field, index) => {
        setFormData({
            ...formData,
            [field]: formData[field].filter((_, i) => i !== index)
        });
    };

    const handleArrayFieldChange = (field, index, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData({
            ...formData,
            [field]: newArray
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/job-posting', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const res = await response.json();

            if (res.success) {
                toast.success('Job created successfully');
                fetchJobs();
                resetForm();
            } else {
                toast.error(res.error || 'Failed to save job');
            }
        } catch (error) {
            toast.error('Failed to save job');
        }
    }

    if (isLoading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-8">
            <Toaster />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] rounded-lg 
                        hover:bg-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-offset-2 
                        focus:ring-[#2563EB] transition-colors duration-200"
                    >
                        <PlusIcon className="h-5 w-5 inline-block mr-2" />
                        Add Job
                    </button>
                </div>

                {/* Jobs Table */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Questions</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">E-mail</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {jobPosts.map((job) => (
                                <tr key={job._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div 
                                            className="text-sm text-gray-900"
                                            dangerouslySetInnerHTML={{ __html: job.description }}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">{job.category}</div>
                                    </td>
                                    {job.questions.length === 0 ? (
                                        <td className="px-6 py-4 text-sm text-gray-500">No questions added</td>
                                    ) : (
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">
                                                {job.questions.map((question, index) => (
                                                    <div key={index} className="mb-1">
                                                        {index + 1}. {question}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">{job.emailForNotifications}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end space-x-3">
                                            <button
                                                onClick={() => {
                                                    setEditingJobId(job._id);
                                                }}
                                                className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            { editingJobId === job._id && (
                                                <UpdateJobForm
                                                    job={job}
                                                    onClose={() => setEditingJobId(null)}
                                                    fetchJobs={fetchJobs}
                                                    jobCategory={jobCategory}
                                                />
                                            )}

                                            <button
                                                onClick={() => handleDelete(job._id)}
                                                className="text-red-600 hover:text-red-900 inline-flex items-center"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Job Form Modal */}
            {isModalOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                        onClick={() => {
                            setIsModalOpen(false);
                            resetForm();
                        }}
                    />
                    <div className="fixed inset-0 z-50 overflow-hidden">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div 
                                className="w-full max-w-4xl transform bg-white shadow-xl transition-all 
                                    flex flex-col rounded-xl overflow-hidden my-auto min-h-[90vh] max-h-[95vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header - Fixed */}
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Add New Job
                                    </h3>
                                </div>

                                {/* Form Section - Scrollable */}
                                <div className="flex-1 overflow-y-auto px-6 py-4">
                                    <form id="jobForm" onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                            <input
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                className="px-4 py-3 mt-1 h-10 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm 
                                                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Description</label>
                                            <Tiptap
                                                content={formData.description}
                                                onChange={(newContent) => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        description: newContent
                                                    }))
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Category</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                className="px-4 py-3 mt-1 bg-gray-100 h-10 block w-full rounded-md border-gray-300 shadow-sm 
                                                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                {jobCategory.map(category => (
                                                    <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Questions */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Questions
                                            </label>
                                            {formData.questions.map((question, index) => (
                                                <div key={index} className="flex gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        value={question}
                                                        onChange={(e) => handleArrayFieldChange('questions', index, e.target.value)}
                                                        className="px-4 py-3 block bg-gray-100 h-10 w-full rounded-md border-gray-300 shadow-sm 
                                                        focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleArrayFieldRemove('questions', index)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => handleArrayFieldAdd('questions')}
                                                className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
                                            >
                                                Add Question
                                            </button>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Notification Email
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.emailForNotifications}
                                                onChange={(e) => setFormData({...formData, emailForNotifications: e.target.value})}
                                                className="px-4 py-3 mt-1 bg-gray-100 h-10 block w-full rounded-md border-gray-300 shadow-sm 
                                                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                required
                                            />
                                        </div>
                                    </form>
                                </div>

                                {/* Modal Footer - Fixed */}
                                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsModalOpen(false);
                                                resetForm();
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            form="jobForm"
                                            className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] rounded-lg 
                                            hover:bg-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-offset-2 
                                            focus:ring-[#2563EB] transition-colors duration-200"
                                        >
                                            Create Job Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}