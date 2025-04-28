import { connectDB } from "@/db/config";
import bcrypt from "bcrypt";
import { User, validate } from "@/db/models/user";

export default async function handler(req, res) {
    try{
        if (req.method === "POST") {
            
            await connectDB();

            const { firstName, lastName, email, password } = req.body;
            const { error } = validate({ firstName, lastName, email, password });

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ firstName, lastName, email, password: hashedPassword });
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