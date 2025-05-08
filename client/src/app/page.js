"use client"
import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import toast, { Toaster } from 'react-hot-toast';
import { MagnifyingGlassIcon, BookmarkIcon, CalendarIcon } from '@heroicons/react/24/outline'
import Footer from '@/components/footer'
import AddJobForm from '@/components/AddJobForm'
import { Filter } from 'lucide-react'
import { getSession } from 'next-auth/react'

export default function Home() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [session, setSession] = useState(null);

    const jobCategory = ['Full Stack', 'Front End', 'Back End', 'Data Science', 'Machine Learning', 'DevOps'];
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            setSession(session);
        };
        fetchSession();
    }, []);

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

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                job.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === '' || job.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavBar />
            <Toaster/>

            <div className="bg-blue-700 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-6">
                            Find & Post Premium Job Opportunities
                        </h1>
                        <p className="text-blue-100 text-sm">
                            Connect with top talent and discover your next career opportunity with our<br/>
                            powerful job posting platform.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search jobs by Title or Category"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-11 pr-4 py-4 text-sm bg-white border-0 
                                    rounded-xl shadow-lg transition-all duration-200 ease-in-out
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-white/20 
                                    focus:outline-none hover:shadow-xl h-14"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <button
                                    className="h-10 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium
                                    hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-2"
                                >
                                    Search Jobs
                                </button>
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-blue-100 text-sm">
                                Popular searches: Designer, Developer, Marketing, Remote
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`grid grid-cols-1 ${session ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} lg:mx-15 mt-10`}>

                {session && (
                    <div className="lg:col-span-1 bg-gray-100 mr-2 mb-10">
                        <AddJobForm
                            fetchJobs={fetchJobs} />
                    </div>
                )}
                

                <div className={`${session ? 'lg:col-span-2' : 'lg:col-span-1'} min-h-screen`}>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-2 ">
                            <div>
                                <h1 className="text-xl font-bold text-gray-700 mb-5">Latest Job Postings</h1>
                            </div>

                            <div className="flex justify-end items-center">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                                        <Filter className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="h-10 pl-9 pr-3 rounded-lg text-gray-600 text-sm font-medium
                                        appearance-none"
                                    >
                                        <option value="">Filter</option>
                                        {jobCategory.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {filteredJobs.map((job) => (
                                <div 
                                    key={job._id} 
                                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                                >
                                    <Link href={`/job/${job._id}`}>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                                        {job.title}
                                                    </h2>
                                                    <div className="space-x-2 mb-4">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            {job.category}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <CalendarIcon className="h-4 w-4" />
                                                            <p>Posted On:</p>
                                                            
                                                            {new Date(job.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button 
                                                    className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}  
                                                >
                                                    
                                                    <BookmarkIcon className="h-5 w-5 text-gray-400 hover:text-blue-600" />
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {filteredJobs.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">
                                    {jobs.length === 0 
                                        ? "No job positions available at the moment."
                                        : "No jobs match your search criteria."}
                                </p>
                            </div>
                        )}
                    </div>
                    
                    {filteredJobs.length > 0 && (
                        <button
                            className="mt-6 mb-10 px-6 py-2 text-sm font-medium text-blue-600 bg-white rounded-lg 
                                hover:bg-blue-100 flex items-center gap-2
                                justify-center mx-auto border border-gray-300 h-10"
                        >
                            Load More Jobs
                        </button>
                    )}
                </div>

            </div>

            <Footer />
        </div>
    )
}