import { connectDB } from "@/db/config";
import jobApplications from "@/db/models/jobApplications";

export default async function handler(req, res) {
    await connectDB();

    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const applications = await jobApplications.find({ jobPostId: id });
            
            return res.status(200).json({ success: true, data: applications });
        } catch (error) {
            console.error("Error in GET:", error);
            return res.status(500).json({ success: false, error: "Internal server error" });
        }
    }

    return res.status(405).json({ success: false, error: "Method not allowed" });
}