'use client';

import { useState } from 'react';
import Spinner from "./Spinner";
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Register from '@/components/Register';

export default function UserDashboard({ admins, isLoading }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if(isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner/>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-8">
            {/* Admin Users Table */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white 
                        bg-[#2563EB] rounded-lg hover:bg-[#1E40AF] focus:outline-none focus:ring-2 
                        focus:ring-offset-2 focus:ring-[#2563EB] transition-colors duration-200"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add Admin
                    </button>
                </div>

                {/* Table Container */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mobile Number
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {admins.map((admin) => (
                                <tr key={admin._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {admin.firstName} {admin.lastName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{admin.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{admin.phoneNumber}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="fixed inset-0 z-50 overflow-hidden">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div 
                                className="w-full max-w-2xl transform bg-white shadow-xl transition-all 
                                flex flex-col rounded-xl overflow-hidden my-auto min-h-[85vh] max-h-[90vh]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Add New Admin
                                        </h3>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            <XMarkIcon className="h-5 w-5 text-gray-500" />
                                        </button>
                                    </div>
                                </div>

                                {/* Modal Content - Scrollable */}
                                <div className="flex-1 overflow-y-auto">
                                    <div className="px-6 py-4">
                                        <Register onClose={() => setIsModalOpen(false)} />
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