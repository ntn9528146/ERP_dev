"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { useTenant } from '../context/TenantContext';

export default function FloatingActions() {
  const pathname = usePathname();
  const { isAuthenticated, currentUser } = useTenant();

  // STRICT RULE 5:
  // 1. Agar koi bhi user logged in hai (chahe Admin ho ya Teacher), ye bar PERMANENTLY GAYAB rahega.
  // 2. Sirf landing page ("/") par unauthenticated public visitors ko attraction ke liye dikhega.
  if (isAuthenticated || !!currentUser || pathname !== '/') {
    return null;
  }

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col rounded-l-2xl overflow-hidden shadow-2xl border-y border-l border-white/10 text-xs font-semibold">
      <a
        href="tel:+917351324716"
        className="bg-amber-500 hover:bg-amber-400 text-white px-4 py-3 flex items-center gap-2 transition-all"
      >
        <span>📞</span>
        <span>Call Us Now</span>
      </a>
      <a
        href="mailto:contact@example.com"
        className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-3 flex items-center gap-2 transition-all border-y border-white/15"
      >
        <span>✉️</span>
        <span>Mail To Us</span>
      </a>
      <a
        href="#contact"
        className="bg-[#D97706] hover:bg-amber-600 text-white px-4 py-3 flex items-center gap-2 transition-all"
      >
        <span>❓</span>
        <span>Inquiry</span>
      </a>
    </div>
  );
}
