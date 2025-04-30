import Tiptap from "@/components/Tiptap";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold">Welcome to the Job Posting App</h1>
            <Tiptap />
            <p className="mt-4 text-lg">This is a simple application to post and manage job listings.</p>
        </main>
    );
}