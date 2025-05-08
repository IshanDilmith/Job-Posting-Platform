import { connectDB } from "@/db/config";
import jobApplications from "@/db/models/jobApplications";

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "POST") {
        try {
            const { jobPostId, fullName, email, phoneNumber, questions, answers } = req.body;
            console.log("Received data:", req.body);

            if (!jobPostId || !fullName || !email || !phoneNumber) {
                return res.status(400).json({
                    success: false,
                    error: "All fields are required",
                });
            }

            const newApplication = new jobApplications({
                jobPostId,
                fullName,
                email,
                phoneNumber,
                questions,
                answers,
            });

            await newApplication.save();
            return res.status(201).json({ success: true, data: newApplication });
        } catch (error) {
            console.error("Error in POST:", error);
            return res.status(500).json({ success: false, error: "Internal server error" });
        }
    }

    if (req.method === "GET") {
        try {
            const applications = await jobApplications.find({});
            return res.status(200).json({ success: true, data: applications });
        } catch (error) {
            console.error("Error in GET:", error);
            return res.status(500).json({ success: false, error: "Internal server error" });
        }
    }

}