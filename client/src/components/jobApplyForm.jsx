"use client"
import { useState } from 'react'
import { XMarkIcon, DocumentArrowUpIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

export default function JobApply({ job, onClose }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        cv: null,
        answers: job.questions ? job.questions.map(() => '') : []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                toast.error('File size should be less than 10MB');
                e.target.value = '';
                return;
            }
            if (file.type === 'application/pdf' || 
                file.type === 'application/msword' || 
                file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                setFormData(prev => ({ ...prev, cv: file }));
            } else {
                toast.error('Please upload a PDF or Word document');
                e.target.value = '';
            }
        }
    };

    const handleAnswerChange = (index, value) => {
        setFormData(prev => ({
            ...prev,
            answers: prev.answers.map((answer, i) => i === index ? value : answer)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('jobId', job._id);
            formDataToSend.append('fullName', formData.fullName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phoneNumber', formData.phoneNumber);
            formDataToSend.append('cv', formData.cv);
            formDataToSend.append('answers', JSON.stringify(formData.answers));

            const response = await fetch('/api/applications', {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Application submitted successfully!');
                onClose();
            } else {
                toast.error(data.error || 'Failed to submit application');
            }
        } catch (error) {
            toast.error('Failed to submit application');
            console.error('Application submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!job) return null;

    return (
        <>
            <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="flex min-h-full items-center justify-center p-4">
                    <div 
                        className="w-full max-w-4xl transform bg-white shadow-xl transition-all 
                        flex flex-col rounded-xl overflow-hidden my-auto min-h-[85vh] max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Apply for {job.title}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <XMarkIcon className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="px-6 py-4 space-y-6">
                                {/* Job Details */}
                                <div>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {job.category}
                                    </span>
                                    <div 
                                        className="prose max-w-none text-gray-600 mt-4"
                                        dangerouslySetInnerHTML={{ __html: job.description }}
                                    />
                                </div>

                                {/* Application Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="px-4 py-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                            focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="px-4 py-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                            focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="px-4 py-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                                            focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50"
                                            required
                                        />
                                    </div>

                                    {/* CV Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Upload CV (PDF or Word)
                                        </label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 
                                            border-dashed rounded-md hover:border-blue-400 transition-colors duration-200 bg-gray-50">
                                            <div className="space-y-1 text-center">
                                                <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="flex justify-center text-sm text-gray-600">
                                                    <label htmlFor="cv-upload" className="relative cursor-pointer 
                                                        rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="cv-upload"
                                                            name="cv"
                                                            type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            onChange={handleFileChange}
                                                            className="sr-only"
                                                            required
                                                        />
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500">PDF or Word up to 10MB</p>
                                                {formData.cv && (
                                                    <p className="text-sm text-green-600">
                                                        Selected: {formData.cv.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Questions Section */}
                                    {job.questions?.length > 0 && (
                                        <div className="space-y-4">
                                            <h4 className="font-medium text-gray-900">Screening Questions</h4>
                                            {job.questions.map((question, index) => (
                                                <div key={index}>
                                                    <label className="block text-sm text-gray-700 mb-2">
                                                        {question}
                                                    </label>
                                                    <textarea
                                                        value={formData.answers[index]}
                                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                        rows={3}
                                                        className="px-4 py-3 block w-full rounded-md border-gray-300 shadow-sm 
                                                        focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50"
                                                        required
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Footer */}
                                    <div className="shrink-0 px-6 py-4 border-t border-gray-200 bg-gray-50">
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                disabled={isSubmitting}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 
                                                hover:text-gray-500 disabled:opacity-50"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] 
                                                rounded-lg hover:bg-[#1E40AF] focus:outline-none focus:ring-2 
                                                focus:ring-offset-2 focus:ring-[#2563EB] transition-colors 
                                                duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}