import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('auth', 'authenticated', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: 'lax',
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('auth', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}
