import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and auth API
  if (pathname === '/admin/login' || pathname === '/api/auth') {
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('auth');
    if (!authCookie || authCookie.value !== 'authenticated') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
