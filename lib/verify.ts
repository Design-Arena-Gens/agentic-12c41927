import { extractText } from './ai';
import { hashData, verifyInChain } from './blockchain';
import { connectDB, Certificate, memory } from './db';

export async function verifyExtracted(fileBuf: Buffer) {
  const text = await extractText(fileBuf);
  const fields = parseFields(text);
  const connected = await connectDB();
  let matched: any = null;
  if (connected) {
    matched = await Certificate.findOne({ 'fields.NAME': fields.NAME, 'fields.DATE_OF_BIRTH': fields.DATE_OF_BIRTH });
  } else {
    for (const v of memory.certificates.values()) {
      if (v.fields?.NAME === fields.NAME && v.fields?.DATE_OF_BIRTH === fields.DATE_OF_BIRTH) { matched = v; break; }
    }
  }
  const fileHash = hashData(fileBuf);
  const chainOk = verifyInChain(matched?.hash || fileHash);
  return { fields, found: !!matched, chainOk };
}

function parseFields(text: string) {
  const NAME = /Name[:\s]+([A-Z][A-Za-z\s]+)/i.exec(text)?.[1]?.trim() || '';
  const DATE_OF_BIRTH = /(DOB|Date of Birth)[:\s]+([0-9\-/\.]+)/i.exec(text)?.[2]?.trim() || '';
  const DEGREE = /Degree[:\s]+([A-Za-z\s]+)/i.exec(text)?.[1]?.trim() || '';
  return { NAME, DATE_OF_BIRTH, DEGREE };
}
