import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { deleteUploadedImage } from '@/lib/data';

function isAuthed(): boolean {
  const cookieStore = cookies();
  const auth = cookieStore.get('auth');
  return auth?.value === 'authenticated';
}

interface Params {
  params: { filename: string };
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const filename = decodeURIComponent(params.filename);
  const deleted = deleteUploadedImage(filename);

  if (!deleted) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
