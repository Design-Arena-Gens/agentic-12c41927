import { NextRequest, NextResponse } from 'next/server';
import { connectDB, User, memory } from '@/lib/db';
import { verifyToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth) return NextResponse.json({ error: 'No token' }, { status: 401 });
  const token = auth.replace('Bearer ', '');
  const payload = verifyToken(token);
  if (payload.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { email, approved } = await req.json();
  const connected = await connectDB();
  if (connected) {
    await User.updateOne({ email }, { $set: { approved } });
  } else {
    const u = memory.users.get(email);
    if (u) memory.users.set(email, { ...u, approved });
  }
  return NextResponse.json({ ok: true });
}
