import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Tiptap from './Tiptap';

export default function AddJobForm({ fetchJobs }) {
    const jobCategory = ['Full Stack', 'Front End', 'Back End', 'Data Science', 'Machine Learning', 'DevOps'];
    const [editorKey, setEditorKey] = useState(0);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: jobCategory[0],
        questions: [],
        emailForNotifications: ''
    });

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            category: jobCategory[0],
            questions: [],
            emailForNotifications: ''
        });
        setEditorKey(prev => prev + 1);
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

    return (
        <div className="bg-white rounded-xl shadow-lg">
            <div className="w-full flex flex-col rounded-xl">
                {/* Header */}
                <div className="px-6 border-b border-gray-200 py-5">
                    <h3 className="text-xl font-bold text-gray-700 pb-3 leading-6">
                        Post A New Job
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Fill out the form below to publish your job opening.
                    </p>
                </div>

                {/* Form Section */}
                <div className="overflow-y-auto px-6 py-4">
                    <form id="jobForm" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 pb-2">Job Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="px-4 py-3 mt-1 h-12 block w-full rounded-md 
                                    border border-gray-300 
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                    hover:border-gray-400 
                                    transition-colors duration-200
                                    shadow-sm sm:text-sm"
                                placeholder="e.g. Full Stack Developer"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 pb-2">Description</label>
                            <Tiptap
                                content={formData.description}
                                onChange={(newContent) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        description: newContent
                                    }))
                                }}
                                editorKey={editorKey}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 pb-2">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                className="px-4 py-3 mt-1 h-12 block w-full rounded-md 
                                    border border-gray-300 
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                    hover:border-gray-400 
                                    transition-colors duration-200
                                    shadow-sm sm:text-sm"
                            >
                                {jobCategory.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Questions */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 pb-2">
                                Questions
                            </label>
                            {formData.questions.map((question, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={question}
                                        onChange={(e) => handleArrayFieldChange('questions', index, e.target.value)}
                                        className="px-4 py-3 mt-1 h-12 block w-full rounded-md 
                                            border border-gray-300 
                                            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                            hover:border-gray-400 
                                            transition-colors duration-200
                                            shadow-sm sm:text-sm"
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
                            <label className="block text-sm font-medium text-gray-700 pb-2">
                                Notification Email
                            </label>
                            <input
                                type="email"
                                value={formData.emailForNotifications}
                                onChange={(e) => setFormData({...formData, emailForNotifications: e.target.value})}
                                className="px-4 py-3 mt-1 h-12 block w-full rounded-md 
                                    border border-gray-300 
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                    hover:border-gray-400 
                                    transition-colors duration-200
                                    shadow-sm sm:text-sm"
                                    placeholder='e.g. abc@gmail.com'
                                required
                            />
                        </div>
                    </form>
                </div>

                {/*Footer */}
                <div className="px-6 py-4 border-t border-gray-200 rounded-b-xl mb-3">
                    <div className="flex justify-center space-x-3">
                        <button
                            type="submit"
                            form="jobForm"
                            className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] rounded-lg 
                                hover:bg-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-offset-2 
                                focus:ring-[#2563EB] transition-colors duration-200 w-full h-12"
                        >
                            Publish Job Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}