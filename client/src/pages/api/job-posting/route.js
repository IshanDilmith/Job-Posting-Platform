import { NextResponse } from "next/server";
import jobPost from "@/db/models/jobPosts";

export async function POST(request) {
    try {
        const body = await request.json();
        const { title, description, category, questions, emailForNotifications } = request.json();

        if(!title || !description || !category || !emailForNotifications) {
            return NextResponse.json({ success: false, error: "Without questions other fields are required" }, { status: 400 });
        }

        const newJobPost = new jobPost({
            title,
            description,
            category,
            questions,
            emailForNotifications
        });

        await newJobPost.create();

        return NextResponse.json({ success: true, data: newJobPost }, { status: 201 });
        
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const jobPosts = await jobPost.find({});
        return NextResponse.json({ success: true, data: jobPosts }, { status: 200 });
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}