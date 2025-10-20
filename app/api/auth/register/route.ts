import { NextRequest, NextResponse } from 'next/server';
import { connectDB, User, memory } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { email, password, org } = await req.json();
  if (!email || !password) return NextResponse.json({ error: 'Missing' }, { status: 400 });
  const connected = await connectDB();
  const passwordHash = await bcrypt.hash(password, 10);
  if (connected) {
    const exists = await User.findOne({ email });
    if (exists) return NextResponse.json({ error: 'Exists' }, { status: 400 });
    await User.create({ email, passwordHash, role: 'issuer', approved: false });
  } else {
    if (memory.users.has(email)) return NextResponse.json({ error: 'Exists' }, { status: 400 });
    memory.users.set(email, { email, passwordHash, role: 'issuer', approved: false });
  }
  return NextResponse.json({ ok: true, message: 'Registration submitted. Await admin approval.' });
}
