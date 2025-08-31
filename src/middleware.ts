import { NextResponse } from 'next/server';

export function middleware() {
  // For now, let the client-side authentication handle protection
  // since we're using localStorage for session management
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
