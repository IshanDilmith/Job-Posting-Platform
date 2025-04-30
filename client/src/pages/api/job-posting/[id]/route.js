import { NextResponse } from "next/server";
import jobPost from "@/db/models/jobPosts";

export async function GET(request, { params }) {
    try {
        const { id } = params;
        const jobPostData = await jobPost.findById(id);

        if (!jobPostData) {
            return NextResponse.json({ success: false, error: "Job post not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: jobPostData }, { status: 200 });
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const { title, description, category, questions, emailForNotifications } = body;

        if (!title || !description || !category || !emailForNotifications) {
            return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
        }

        const updatedJobPost = await jobPost.findByIdAndUpdate(id, {
            title,
            description,
            category,
            questions,
            emailForNotifications
        }, { new: true });

        if (!updatedJobPost) {
            return NextResponse.json({ success: false, error: "Job post not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedJobPost }, { status: 200 });
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const deletedJobPost = await jobPost.findByIdAndDelete(id);

        if (!deletedJobPost) {
            return NextResponse.json({ success: false, error: "Job post not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Job post deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}

