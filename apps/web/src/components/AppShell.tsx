"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTenant } from '../context/TenantContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { activeSchool, availableSchools, setActiveSchool, currentUser, isAuthenticated, logout } = useTenant();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#030712] text-white">{children}</div>;
  }

  const isSuperAdmin = currentUser?.role === 'DEVELOPER' || currentUser?.role === 'SUPER_ADMIN';

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col relative">
      
      {/* GLOBAL NAVBAR */}
      <header className="border-b border-gray-800 bg-[#030712]/95 backdrop-blur sticky top-0 z-30">
        <div className="bg-[#020617] border-b border-gray-800/80 px-6 py-1.5 flex flex-wrap justify-between items-center text-[11px] font-mono">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-bold tracking-wider">DEVGYAN INNOVATION</span>
            <span className="text-gray-600">|</span>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Campus Tenant:</span>
                {isSuperAdmin ? (
                  <select
                    value={activeSchool.id}
                    onChange={(e) => {
                      const s = availableSchools.find((x) => x.id === e.target.value);
                      if (s) setActiveSchool(s);
                    }}
                    className="bg-[#030712] text-cyan-300 font-bold border border-cyan-800/60 rounded px-2 py-0.5 focus:outline-none"
                  >
                    {availableSchools.map((s) => (
                      <option key={s.id} value={s.id} className="bg-gray-900 text-white">
                        {s.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="text-cyan-300 font-bold">{activeSchool.name}</span>
                )}
              </div>
            ) : (
              <span className="text-gray-400">Enterprise Cloud Portal</span>
            )}
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <span>Central Support: +91 73513 24716</span>
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-2.5">
                <span className="text-emerald-400 font-bold">● {currentUser.name} ({currentUser.role})</span>
                <button
                  onClick={logout}
                  className="bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 px-2 py-0.5 rounded text-[10px] font-bold transition-all"
                  title="Logout from session"
                >
                  Sign Out ⎋
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-cyan-400 hover:underline">
                Sign In / Enter Secret Code →
              </Link>
            )}
          </div>
        </div>

        {/* Main Navbar: NO DUPLICATE SIGN OUT BUTTON */}
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-black text-base shadow-lg shadow-cyan-500/20">
              DG
            </div>
            <div>
              <div className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                DEVGYAN <span className="text-cyan-400">INNOVATION</span>
              </div>
              <div className="text-[10px] text-gray-400 font-mono tracking-wider truncate max-w-[200px] sm:max-w-none">
                {isAuthenticated ? activeSchool.name.toUpperCase() : 'ENTERPRISE SCHOOL CLOUD ERP'}
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-gray-300">
            <Link href="/" className={`${pathname === '/' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}>Home</Link>
            <Link href="/student-management" className={`${pathname === '/student-management' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}>Student Mgmt</Link>
            <Link href="/staff-management" className={`${pathname === '/staff-management' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}>Staff Mgmt</Link>
            <Link href="/exam-management" className={`${pathname === '/exam-management' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}>Exam Controller</Link>
            <Link href="/inventory-management" className={`${pathname === '/inventory-management' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}>Inventory</Link>
            {isSuperAdmin && (
              <Link href="/admin/cockpit" className={`${pathname === '/admin/cockpit' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}>Root Cockpit</Link>
            )}
          </nav>

          <div>
            {!isAuthenticated && (
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
              >
                Protected Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {children}
      </main>

    </div>
  );
}
