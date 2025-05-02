"use client"
import { useState } from 'react'
import Tiptap from "@/components/Tiptap"

export default function Home() {
    const [content, setContent] = useState('<p>Start writing your job description here...</p>')

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold">Welcome to the Job Posting App</h1>
            <Tiptap content={content} onChange={(html) => setContent(html)} />
            <p className="mt-4 text-lg">This is a simple application to post and manage job listings.</p>
        </main>
    )
}
