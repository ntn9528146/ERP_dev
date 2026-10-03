"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTenant } from '../../context/TenantContext';

export const Header: React.FC = () => {
  const { activeSchool, user, logoutUser } = useTenant();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full shadow-xl">
      {/* 1. TOP UTILITY STRIP - Displays DEVGYAN INNOVATION Parent Brand + Active School Banner */}
      <div className="bg-[#02050e] border-b border-gray-900 text-gray-300 text-xs px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          <div className="flex items-center gap-3">
            <span className="font-semibold text-cyan-400">DEVGYAN INNOVATION</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">Campus Tenant:</span>
            <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/60 text-cyan-300 font-mono text-[11px]">
              {activeSchool.name}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:inline text-gray-400">Central Support: +91 73513 24716</span>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono">● {user.name} ({user.role})</span>
                <button
                  onClick={logoutUser}
                  className="text-xs text-rose-400 hover:text-rose-300 ml-2 underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Sign In / Enter Secret Code →
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* 2. MAIN NAV BAR */}
      <div className="bg-[#030712]/95 backdrop-blur-md border-b border-gray-800 text-white px-6">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between gap-4">
          
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/25">
              DG
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white leading-none">
                DEVGYAN <span className="text-cyan-400">INNOVATION</span>
              </div>
              <div className="text-[10px] text-gray-400 tracking-wide mt-1 uppercase font-semibold">
                {activeSchool.name}
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-gray-300">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="/faculty/studio" className="hover:text-cyan-400 transition-colors">Academic Studio (CBSE)</Link>
            <Link href="/admin/cockpit" className="hover:text-cyan-400 transition-colors">Developer Cockpit</Link>
            <Link href="/student-management" className="hover:text-cyan-400 transition-colors">Student ERP</Link>
            <Link href="/staff-management" className="hover:text-cyan-400 transition-colors">Staff ERP</Link>
          </nav>

          <div className="flex items-center gap-3">
            {user?.role === 'DEVELOPER' && (
              <Link
                href="/admin/cockpit"
                className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs hover:bg-amber-500/20"
              >
                Root Cockpit (100)
              </Link>
            )}
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/25 transition-all"
            >
              {user ? 'My Dashboard' : 'Protected Login'}
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};
