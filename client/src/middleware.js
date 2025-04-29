// src/middleware.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './pages/api/auth/[...nextauth]';

export function middleware(request) {

    const session = getServerSession(authOptions);

    const isAdmin = session?.user?.role === 'admin';
    console.log("isadmin", isAdmin);

    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

    if (isAdminRoute && !isAdmin) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}
