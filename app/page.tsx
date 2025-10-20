export default function Home() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="card"><h2 className="font-semibold mb-2">Verify Certificate</h2><p className="text-sm mb-4">Upload a certificate to validate against blockchain and database.</p><a className="btn" href="/verify">Open</a></div>
      <div className="card"><h2 className="font-semibold mb-2">Issuer Portal</h2><p className="text-sm mb-4">Authorized institutions issue certificates from approved templates.</p><a className="btn" href="/issuer">Open</a></div>
      <div className="card"><h2 className="font-semibold mb-2">Admin Portal</h2><p className="text-sm mb-4">Approve issuers and manage PPTX templates and themes.</p><a className="btn" href="/admin">Open</a></div>
    </div>
  );
}
