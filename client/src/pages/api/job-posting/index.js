import { connectDB } from "@/db/config";
import jobPost from "@/db/models/jobPosts";

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "POST") {
        try {
            const { title, description, category, questions, emailForNotifications } = req.body;
            console.log("Received data:", req.body);

            if (!title || !description || !category || !emailForNotifications) {
                return res.status(400).json({
                    success: false,
                    error: "Without questions, other fields are required",
                });
            }

            const newJobPost = new jobPost({
                title,
                description,
                category,
                questions,
                emailForNotifications,
            });

            await newJobPost.save();

            return res.status(201).json({ success: true, data: newJobPost });
        } catch (error) {
            console.error("Error in POST:", error);
            return res.status(500).json({ success: false, error: "Internal server error" });
        }
    }

    if (req.method === "GET") {
        try {
            const jobPosts = await jobPost.find({});
            return res.status(200).json({ success: true, data: jobPosts });
        } catch (error) {
            console.error("Error in GET:", error);
            return res.status(500).json({ success: false, error: "Internal server error" });
        }
    }

    return res.status(405).json({ success: false, error: "Method not allowed" });
}
