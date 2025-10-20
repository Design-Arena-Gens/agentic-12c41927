import JSZip from 'jszip';

export async function fillPptxTemplate(pptxBuffer: Buffer, fields: Record<string, string>) {
  const zip = await JSZip.loadAsync(pptxBuffer);
  const slideFiles = Object.keys(zip.files).filter((f) => f.startsWith('ppt/slides/slide') && f.endsWith('.xml'));
  for (const f of slideFiles) {
    const xml = await zip.file(f)!.async('string');
    let replaced = xml;
    for (const [k, v] of Object.entries(fields)) {
      const token = new RegExp('\\{' + k + '\\}', 'g');
      replaced = replaced.replace(token, escapeXml(v));
    }
    zip.file(f, replaced);
  }
  return await zip.generateAsync({ type: 'nodebuffer' });
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
