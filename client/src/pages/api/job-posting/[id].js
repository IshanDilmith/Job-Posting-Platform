import { connectDB } from "@/db/config";
import jobPost from "@/db/models/jobPosts";

export default async function handler(req, res) {
    await connectDB();
    const { id } = req.query;

    try {
        if (req.method === "GET") {
            const jobPostData = await jobPost.findById(id);
            if (!jobPostData) {
                return res.status(404).json({ success: false, error: "Job post not found" });
            }
            return res.status(200).json({ success: true, data: jobPostData });
        }

        if (req.method === "PUT") {
            const { title, description, category, questions, emailForNotifications } = req.body;
            if (!title || !description || !category || !emailForNotifications) {
                return res.status(400).json({ success: false, error: "All fields are required" });
            }

            const updatedJobPost = await jobPost.findByIdAndUpdate(
                id,
                { title, description, category, questions, emailForNotifications },
                { new: true }
            );

            if (!updatedJobPost) {
                return res.status(404).json({ success: false, error: "Job post not found" });
            }

            return res.status(200).json({ success: true, data: updatedJobPost });
        }

        if (req.method === "DELETE") {
            const deletedJobPost = await jobPost.findByIdAndDelete(id);
            if (!deletedJobPost) {
                return res.status(404).json({ success: false, error: "Job post not found" });
            }
            return res.status(200).json({ success: true, message: "Job post deleted successfully" });
        }

        return res.status(405).json({ success: false, error: "Method not allowed" });

    } catch (error) {
        console.error("API error:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}
