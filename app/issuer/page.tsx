'use client';
import { useState } from 'react';

export default function IssuerPage() {
  const [email, setEmail] = useState('issuer@college.edu');
  const [password, setPassword] = useState('Passw0rd!');
  const [token, setToken] = useState('');
  const [registering, setRegistering] = useState(false);
  const [fields, setFields] = useState({ NAME: '', DATE_OF_BIRTH: '', DEGREE: '' });
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const register = async () => {
    setRegistering(true);
    await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) });
    alert('Submitted. Await approval.');
  };

  const login = async () => {
    const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (data.token) setToken(data.token); else alert('Login failed or not approved');
  };

  const generate = async () => {
    const res = await fetch('/api/certificate/generate', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify({ fields }) });
    if (!res.ok) { alert('Generate failed'); return; }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
  };

  return (
    <div className="grid gap-8">
      <section className="card">
        <h2 className="font-semibold mb-2">Issuer Account</h2>
        <div className="grid gap-2 md:grid-cols-4">
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn" onClick={register}>Register</button>
          <button className="btn" onClick={login}>Login</button>
        </div>
      </section>
      <section className="card">
        <h2 className="font-semibold mb-2">Certificate Fields</h2>
        <div className="grid gap-2 md:grid-cols-3">
          <input className="input" placeholder="{NAME}" value={fields.NAME} onChange={e=>setFields({ ...fields, NAME: e.target.value })} />
          <input className="input" placeholder="{DATE_OF_BIRTH}" value={fields.DATE_OF_BIRTH} onChange={e=>setFields({ ...fields, DATE_OF_BIRTH: e.target.value })} />
          <input className="input" placeholder="{DEGREE}" value={fields.DEGREE} onChange={e=>setFields({ ...fields, DEGREE: e.target.value })} />
        </div>
        <button className="btn mt-3" onClick={generate} disabled={!token}>Generate PPTX</button>
        {downloadUrl && <a className="btn mt-2" href={downloadUrl} download={`certificate-${Date.now()}.pptx`}>Download Certificate</a>}
      </section>
    </div>
  );
}
