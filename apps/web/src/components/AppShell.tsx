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
  const isPublicPage = pathname === '/' || pathname === '/login';

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col relative">
      
      {/* GLOBAL NAVBAR WITH REAL SIGN OUT */}
      <header className="border-b border-gray-800 bg-[#030712]/95 backdrop-blur sticky top-0 z-30">
        <div className="bg-[#020617] border-b border-gray-800/80 px-6 py-1.5 flex flex-wrap justify-between items-center text-[11px] font-mono">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-bold tracking-wider">DEVGYAN INNOVATION</span>
            <span className="text-gray-600">|</span>
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

          <div className="flex items-center gap-4 text-gray-400">
            <span>Central Support: +91 73513 24716</span>
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">● {currentUser.name} ({currentUser.role})</span>
                <button
                  onClick={logout}
                  className="bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 px-2.5 py-0.5 rounded text-[10px] font-bold transition-all shadow"
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

        {/* Main Navbar */}
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
                {activeSchool.name.toUpperCase()}
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
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-bold transition-all"
              >
                Sign Out ⎋
              </button>
            ) : (
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

      {/* CONTENT AREA: GLOBAL AUTH PROTECTION */}
      <main className="flex-1">
        {/* Agar page public nahi hai aur user logged in NAHI hai -> BloomByte Promotional View */}
        {!isPublicPage && !isAuthenticated ? (
          <div className="min-h-[85vh] bg-[#030712] text-white py-12 px-6">
            <div className="max-w-6xl mx-auto space-y-12">
              
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
                  NEXT-GEN CBSE K-12 ENTERPRISE PLATFORM
                </span>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  Intelligent School Operations & Cloud Automation
                </h1>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Unified student dossiers, dynamic CBSE curriculum mapping, zero-trust cloud security, and automated multi-campus administration.
                </p>
                <div className="pt-2">
                  <Link
                    href="/login"
                    className="inline-block px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
                  >
                    Authenticate To Access Institutional Data →
                  </Link>
                </div>
              </div>

              {/* BloomByte-style Feature Cards (Dummy & Safe) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-6 space-y-3">
                  <div className="text-cyan-400 text-3xl">⚡</div>
                  <h3 className="text-xl font-bold text-white">High Availability</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Serverless cloud architecture powering real-time synchronization across hundreds of classrooms.
                  </p>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest pt-2">• 99.98% SLA</div>
                </div>

                <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-6 space-y-3">
                  <div className="text-emerald-400 text-3xl">📜</div>
                  <h3 className="text-xl font-bold text-white">CBSE Curriculum Engine</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Full K-12 coverage: Nursery to Class 12th, skill subjects (IT 402, AI 417), CS 083, and co-scholastics.
                  </p>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest pt-2">• NEP 2020 Ready</div>
                </div>

                <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-6 space-y-3">
                  <div className="text-purple-400 text-3xl">🛡️</div>
                  <h3 className="text-xl font-bold text-white">Strict Tenant Isolation</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Encrypted role-based access. Teachers view assigned classes only; student records remain strictly confidential.
                  </p>
                  <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest pt-2">• Zero Data Leakage</div>
                </div>
              </div>

              {/* Showcase Box */}
              <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-8 space-y-4 text-center">
                <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/50">
                  🔒 Confidential Institutional Records Protected
                </span>
                <p className="text-xs text-gray-400 max-w-lg mx-auto">
                  Live student dossiers, marks registers, and inventory records are protected under institutional compliance.
                </p>
              </div>

            </div>
          </div>
        ) : (
          children
        )}
      </main>

      {/* FLOATING ACTION BAR: STRICTLY VISIBLE ONLY ON HOMEPAGE ("/") AND ONLY WHEN NOT LOGGED IN */}
      {!isAuthenticated && pathname === '/' && (
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
      )}

    </div>
  );
}
