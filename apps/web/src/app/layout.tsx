import './globals.css';
import React from 'react';
import { TenantProvider } from '../context/TenantContext';
import AppShell from '../components/AppShell';

export const metadata = {
  title: 'DevGyan Innovation - Enterprise School Cloud ERP',
  description: 'Next-Gen Multi-Tenant CBSE K-12 Institutional Management Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#030712] text-white min-h-screen antialiased selection:bg-cyan-500 selection:text-black">
        <TenantProvider>
          <AppShell>{children}</AppShell>
        </TenantProvider>
      </body>
    </html>
  );
}
