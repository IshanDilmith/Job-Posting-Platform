import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextAuth]";

export default async function adminAuthMiddleware(req, res, next) {
    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (session.user.role !== 'admin') {
            return res.status(403).json({ message: "You don't have admin permission to access this page." });
        }

        // User is authenticated and is an admin
        next();
    } catch (error) {
        console.error("Middleware error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
