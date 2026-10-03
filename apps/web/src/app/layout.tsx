import './globals.css';
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';

export const metadata = {
  title: 'DEVGYAN INNOVATION | Enterprise School & College ERP Platform',
  description: 'Scalable campus automation, AI-ready student analytics, and secure administrative engines.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#030712] min-h-screen flex flex-col text-white">
        <Header />
        <FloatingCTA />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
