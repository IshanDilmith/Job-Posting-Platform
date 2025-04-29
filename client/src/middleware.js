import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(request) {
        // Get the user's role from the token
        const token = request.nextauth.token;
        const isAdmin = token?.role === "admin";
        const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

        // Redirect non-admin users trying to access admin routes
        if (isAdminRoute && !isAdmin) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token // Requires authentication for all routes
        }
    }
);

// Specify which routes to protect
export const config = {
    matcher: [
        '/admin/:path*',  // Protect all admin routes
    ]
};