'use client';
import { useState } from 'react';

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const submit = async () => {
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/verify', { method: 'POST', body: fd });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="card">
      <h2 className="font-semibold mb-3">Verify Certificate</h2>
      <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <button className="btn mt-3" onClick={submit}>Verify</button>
      {result && (
        <div className="mt-4 text-sm">
          <p><b>Found:</b> {String(result.found)}</p>
          <p><b>Chain OK:</b> {String(result.chainOk)}</p>
          <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(result.fields, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
