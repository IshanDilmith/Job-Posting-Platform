import { connectDB } from "@/db/config";
import { User } from "@/db/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authOptions);

        if (session?.user?.role !== "admin") {
            return res.status(403).json({ 
                success: false, 
                error: "Access denied. Admin only." 
            });
        }

        await connectDB();

        if (req.method === "GET") {
            const users = await User.find({}, "-password");
            return res.status(200).json({ 
                success: true, 
                data: users 
            });
        } 

        return res.status(405).json({ 
            success: false, 
            error: "Method not allowed" 
        });

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({ 
            success: false, 
            error: "Internal server error",
            message: error.message 
        });
    }
}