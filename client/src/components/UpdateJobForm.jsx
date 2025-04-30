import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateJobForm ({ job, onClose, fetchJobs, jobCategory  }) {

    const [formData, setFormData] = useState({
        title: job.title,
        description: job.description,
        category: job.category,
        questions: job.questions || [],
        emailForNotifications: job.emailForNotifications,
    });

    const handleArrayFieldAdd = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const handleArrayFieldRemove = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleArrayFieldChange = (field, index, value) => {
        setFormData(prev => {
            const newArray = [...prev[field]];
            newArray[index] = value;
            return {
                ...prev,
                [field]: newArray
            };
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/job-posting/${job._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Job post updated successfully!');
                await fetchJobs();
                onClose();
            } else {
                console.error(data.error || 'Failed to update job post');
            }
        } catch (error) {
            console.error('Error updating job post:', error);
        }
    }


    return (
        <div>
            <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                onClick={() => {
                    onClose();
                }}
            />
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <div 
                        className="w-full max-w-4xl transform overflow-hidden rounded-xl 
                        bg-white p-6 text-left shadow-xl transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                            Update the Job
                        </h3>

                        {/*Add Job Form*/}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="mt-1 h-10 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm 
                                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    rows={4}
                                    className="mt-1 bg-gray-100 block w-full rounded-md border-gray-300 shadow-sm 
                                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="mt-1  bg-gray-100 h-10 block w-full rounded-md border-gray-300 shadow-sm 
                                        focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        {jobCategory.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
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
                                            className="block  bg-gray-100 h-10 w-full rounded-md border-gray-300 shadow-sm 
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
                                    className="mt-1  bg-gray-100 h-10 block w-full rounded-md border-gray-300 shadow-sm 
                                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>


                            {/* Form Actions */}
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        onClose();
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-[#2563EB] rounded-lg 
                                    hover:bg-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-offset-2 
                                    focus:ring-[#2563EB] transition-colors duration-200"
                                >
                                    Update Job Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}