import { NextRequest, NextResponse } from 'next/server';
import { connectDB, User, memory } from '@/lib/db';
import { signToken } from '@/lib/jwt';
import bcrypt from 'bcryptjs';

async function ensureAdmin() {
  const connected = await connectDB();
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@certifyx.io';
  const adminPass = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(adminPass, 10);
  if (connected) {
    const admin = await User.findOne({ email: adminEmail });
    if (!admin) await User.create({ email: adminEmail, passwordHash, role: 'admin', approved: true });
  } else {
    if (!memory.users.has(adminEmail)) memory.users.set(adminEmail, { email: adminEmail, passwordHash, role: 'admin', approved: true });
  }
}

export async function POST(req: NextRequest) {
  await ensureAdmin();
  const { email, password } = await req.json();
  const connected = await connectDB();
  let user: any = null;
  if (connected) user = await User.findOne({ email });
  else user = memory.users.get(email) || null;
  if (!user) return NextResponse.json({ error: 'Invalid' }, { status: 401 });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: 'Invalid' }, { status: 401 });
  if (user.role === 'issuer' && !user.approved) return NextResponse.json({ error: 'Not approved' }, { status: 403 });
  const token = signToken({ email: user.email, role: user.role });
  return NextResponse.json({ token, role: user.role });
}
