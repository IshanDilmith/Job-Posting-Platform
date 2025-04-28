import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextAuth]";

export default async function userAuthMiddleware(req, res, next) {
    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (session.user.role !== 'user') {
            return res.status(403).json({ message: "You don't have permission to access this page." });
        }

        next();
    } catch (error) {
        console.error("Middleware error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}