import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
console.log({token});

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next(); // allow the request to continue
}

export const config = {
  matcher: ['/dashboard/:path*'], // protect all dashboard routes
};
