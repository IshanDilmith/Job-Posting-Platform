import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/db/config";
import { User } from "@/db/models/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to the database
        await connectDB();

        // Find the user by email
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Compare the password
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Invalid email or password");
        }

        // If credentials are valid, return the user object
        return { id: user._id, email: user.email, role: user.role };
      },
    }),
  ],
  pages: {
    signIn: '/login', // Redirect to your custom login page
  },
  session: {
    strategy: 'jwt', // Use JWT tokens
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user is available, add to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role; // Store the role in the token
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the token properties to the session
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role; 
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
