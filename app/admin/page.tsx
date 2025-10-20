'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [email, setEmail] = useState('admin@certifyx.io');
  const [password, setPassword] = useState('ChangeMe123!');
  const [token, setToken] = useState('');
  const [issuerEmail, setIssuerEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const login = async () => {
    const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (data.token) setToken(data.token);
  };

  const approve = async (approved: boolean) => {
    await fetch('/api/admin/approve', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify({ email: issuerEmail, approved }) });
    alert('Done');
  };

  const upload = async () => {
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/templates', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
    if (res.ok) alert('Template activated'); else alert('Upload failed');
  };

  return (
    <div className="grid gap-8">
      <section className="card">
        <h2 className="font-semibold mb-2">Admin Login</h2>
        <div className="grid gap-2 md:grid-cols-3">
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn" onClick={login}>Login</button>
        </div>
        {token && <p className="text-xs mt-2">Token acquired</p>}
      </section>

      <section className="card">
        <h2 className="font-semibold mb-2">Approve Issuer</h2>
        <div className="grid gap-2 md:grid-cols-3">
          <input className="input" placeholder="Issuer Email" value={issuerEmail} onChange={e=>setIssuerEmail(e.target.value)} />
          <button className="btn" onClick={()=>approve(true)}>Approve</button>
          <button className="btn" onClick={()=>approve(false)}>Revoke</button>
        </div>
      </section>

      <section className="card">
        <h2 className="font-semibold mb-2">Upload PPTX Template</h2>
        <input type="file" accept=".pptx" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <button className="btn mt-2" onClick={upload}>Activate Template</button>
      </section>
    </div>
  );
}
