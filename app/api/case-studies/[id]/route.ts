import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCaseStudy, updateCaseStudy, deleteCaseStudy } from '@/lib/data';

function isAuthed(): boolean {
  const cookieStore = cookies();
  const auth = cookieStore.get('auth');
  return auth?.value === 'authenticated';
}

interface Params {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Params) {
  const cs = getCaseStudy(params.id);
  if (!cs) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(cs);
}

export async function PUT(request: Request, { params }: Params) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const updated = updateCaseStudy(params.id, body);

  if (!updated) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const deleted = deleteCaseStudy(params.id);

  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
