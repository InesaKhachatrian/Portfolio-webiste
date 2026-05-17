import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCaseStudies, createCaseStudy } from '@/lib/data';
import type { CaseStudy } from '@/lib/types';

function isAuthed(): boolean {
  const cookieStore = cookies();
  const auth = cookieStore.get('auth');
  return auth?.value === 'authenticated';
}

export async function GET() {
  const studies = getCaseStudies();
  return NextResponse.json(studies);
}

export async function POST(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json() as CaseStudy;

  // Validate required fields
  if (!body.title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  // Auto-generate id/slug
  if (!body.id) {
    body.id = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  if (!body.slug) {
    body.slug = body.id;
  }

  const created = createCaseStudy(body);
  return NextResponse.json(created, { status: 201 });
}
