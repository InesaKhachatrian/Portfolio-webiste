import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getContent, saveContent } from '@/lib/data';
import type { SiteContent } from '@/lib/types';

function isAuthed(): boolean {
  const cookieStore = cookies();
  const auth = cookieStore.get('auth');
  return auth?.value === 'authenticated';
}

export async function GET() {
  const content = getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json() as SiteContent;
  saveContent(body);
  return NextResponse.json(body);
}
