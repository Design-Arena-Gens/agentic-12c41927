import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Template, memory } from '@/lib/db';
import { verifyToken } from '@/lib/jwt';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth) return NextResponse.json({ error: 'No token' }, { status: 401 });
  const token = auth.replace('Bearer ', '');
  const payload = verifyToken(token);
  if (payload.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) return NextResponse.json({ error: 'multipart required' }, { status: 400 });
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'file required' }, { status: 400 });
  const arrayBuffer = await file.arrayBuffer();
  const buf = Buffer.from(arrayBuffer);
  const connected = await connectDB();
  if (connected) {
    await Template.updateMany({}, { $set: { active: false } });
    await Template.create({ name: file.name, data: buf, mime: file.type, active: true });
  } else {
    memory.templates.clear();
    memory.templates.set('active', { name: file.name, data: buf, mime: file.type, active: true });
  }
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const connected = await connectDB();
  if (connected) {
    const tpl = await Template.findOne({ active: true });
    if (!tpl) return NextResponse.json({ error: 'No template' }, { status: 404 });
    return new NextResponse(tpl.data, { headers: { 'content-type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation' } });
  } else {
    const tpl = memory.templates.get('active');
    if (!tpl) return NextResponse.json({ error: 'No template' }, { status: 404 });
    return new NextResponse(tpl.data, { headers: { 'content-type': tpl.mime || 'application/vnd.openxmlformats-officedocument.presentationml.presentation' } });
  }
}
