import './globals.css';
import React from 'react';

export const metadata = { title: 'Certificate System', description: 'Verification, Issuer, Admin' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <nav className="container py-4 flex items-center gap-6">
            <a href="/" className="font-semibold">CertifyX</a>
            <a href="/verify" className="text-sm">Verify</a>
            <a href="/issuer" className="text-sm">Issuer</a>
            <a href="/admin" className="text-sm">Admin</a>
          </nav>
        </header>
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
