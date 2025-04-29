import { connectDB } from "@/db/config";
import bcrypt from "bcrypt";
import { User, validate } from "@/db/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";

export default async function handler(req, res) {

    const session = await getServerSession(req, res, authOptions);

    try{
        if (req.method === "POST") {
            
            await connectDB();

            const { firstName, lastName, email, phoneNumber, password } = req.body;
            const { error } = validate({ email, password });

            if (session?.user?.role !== "admin") {
                return res.status(403).json({ error: "Access denied" });
            }

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ firstName, lastName, email, phoneNumber, password: hashedPassword });
            await newUser.save();

            return res.status(201).json({ message: "User registered successfully" });
        } else {
            return res.status(405).json({ error: "Method not allowed" });
        }

    } catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}