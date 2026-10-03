import './globals.css';
import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FloatingCTA } from '../components/layout/FloatingCTA';
import { TenantProvider } from '../context/TenantContext';

export const metadata = {
  title: 'DEVGYAN INNOVATION | Multi-Tenant Enterprise Education OS',
  description: 'Scalable campus automation, role governance and secure question paper architecture.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#030712] min-h-screen flex flex-col text-white">
        <TenantProvider>
          <Header />
          <FloatingCTA />
          <main className="flex-1">{children}</main>
          <Footer />
        </TenantProvider>
      </body>
    </html>
  );
}
