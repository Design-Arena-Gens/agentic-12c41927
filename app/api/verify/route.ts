import { NextRequest, NextResponse } from 'next/server';
import { verifyExtracted } from '@/lib/verify';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) return NextResponse.json({ error: 'multipart required' }, { status: 400 });
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'file required' }, { status: 400 });
  const buf = Buffer.from(await file.arrayBuffer());
  const result = await verifyExtracted(buf);
  return NextResponse.json(result);
}
