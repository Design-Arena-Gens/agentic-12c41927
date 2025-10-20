import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Template, memory, Certificate } from '@/lib/db';
import { verifyToken } from '@/lib/jwt';
import { fillPptxTemplate } from '@/lib/pptx';
import { appendToChain, hashData } from '@/lib/blockchain';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth) return NextResponse.json({ error: 'No token' }, { status: 401 });
  const token = auth.replace('Bearer ', '');
  const payload = verifyToken(token);
  if (payload.role !== 'issuer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const body = await req.json();
  const fields = body.fields as Record<string, string>;
  const connected = await connectDB();
  let tplBuf: Buffer | null = null;
  if (connected) {
    const tpl = await Template.findOne({ active: true });
    if (!tpl) return NextResponse.json({ error: 'No template' }, { status: 400 });
    tplBuf = tpl.data;
  } else {
    const tpl = memory.templates.get('active');
    if (!tpl) return NextResponse.json({ error: 'No template' }, { status: 400 });
    tplBuf = tpl.data as Buffer;
  }
  const pptx = await fillPptxTemplate(tplBuf!, fields);
  const dataHash = hashData(pptx);
  const { block, txHash } = await appendToChain(dataHash);

  if (connected) {
    await Certificate.create({ fields, issuerEmail: payload.email, templateId: null, pptxData: pptx, hash: dataHash });
  } else {
    memory.certificates.set(dataHash, { fields, issuerEmail: payload.email, pptxData: pptx, hash: dataHash });
  }

  return new NextResponse(pptx as any, { headers: { 'content-type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'x-proof-hash': dataHash, ...(txHash ? { 'x-tx-hash': txHash } : {}) } });
}
