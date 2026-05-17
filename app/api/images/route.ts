import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { getUploadedImages } from '@/lib/data';

function isAuthed(): boolean {
  const cookieStore = cookies();
  const auth = cookieStore.get('auth');
  return auth?.value === 'authenticated';
}

export async function GET() {
  const images = getUploadedImages();
  return NextResponse.json({ images });
}

export async function POST(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif', 'image/svg+xml'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }

  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
  }

  // Sanitize filename
  const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
  const timestamp = Date.now();
  const ext = path.extname(originalName);
  const baseName = path.basename(originalName, ext);
  const filename = `${baseName}-${timestamp}${ext}`;

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(path.join(uploadsDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}`, filename }, { status: 201 });
}
