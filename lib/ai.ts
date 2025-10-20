import Tesseract from 'tesseract.js';

export async function extractText(buf: Buffer) {
  const { data } = await Tesseract.recognize(buf, 'eng');
  return data.text;
}
