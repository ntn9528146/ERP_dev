"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTenant } from '../context/TenantContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { activeSchool, availableSchools, setActiveSchool, currentUser, isAuthenticated, logout } = useTenant();
  const [mounted, setMounted] = useState(false);
  const [modulesDropdownOpen, setModulesDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#030712] text-white">{children}</div>;
  }

  const isSuperAdmin = currentUser?.role === 'DEVELOPER' || currentUser?.role === 'SUPER_ADMIN';

  const allErpModules = [
    { name: 'Student Mgmt', href: '/student-management', desc: '4-Tab Dossier & KYC' },
    { name: 'Staff Mgmt', href: '/staff-management', desc: 'Faculty, Admin & Support' },
    { name: 'Exam Controller', href: '/exam-management', desc: 'Datesheets & Marks' },
    { name: 'Fixed Inventory', href: '/inventory-management', desc: 'Hardware & Lab Assets' },
    { name: 'Fee Management', href: '/fee-management', desc: 'Challan & Online Dues' },
    { name: 'Enquiry CRM', href: '/enquiry-crm', desc: 'Prospect Leads Funnel' },
    { name: 'CBSE Studio', href: '/cbse-studio', desc: 'Curriculum & Rubrics' },
    { name: 'Transport GPS', href: '/transport-gps', desc: 'Bus Fleet & Routes' },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col relative">
      
      {/* 1. TOP BAR */}
      <header className="border-b border-gray-800 bg-[#030712]/95 backdrop-blur sticky top-0 z-40">
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
                    className="bg-[#030712] text-cyan-300 font-bold border border-cyan-800/60 rounded px-1.5 py-0.5 focus:outline-none"
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
                  className="bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 px-2 py-0.5 rounded text-[10px] font-bold transition-all shadow"
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

        {/* 2. MAIN NAVIGATION BAR WITH "ERP MODULES ▾" DROPDOWN */}
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
            <Link href="/" className={`${pathname === '/' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}>
              Home
            </Link>

            {/* Comprehensive "ERP Modules ▾" Menu for Principal, Coordinator & Developer */}
            <div className="relative">
              <button
                onClick={() => setModulesDropdownOpen(!modulesDropdownOpen)}
                className="hover:text-white flex items-center gap-1 focus:outline-none"
              >
                <span>ERP Modules</span>
                <span className="text-[10px]">▾</span>
              </button>

              {modulesDropdownOpen && (
                <div
                  onMouseLeave={() => setModulesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-[#0B1120] border border-gray-800 rounded-2xl p-2 shadow-2xl space-y-1 z-50 text-left"
                >
                  {allErpModules.map((mod) => (
                    <Link
                      key={mod.href}
                      href={mod.href}
                      onClick={() => setModulesDropdownOpen(false)}
                      className="block p-2 rounded-xl hover:bg-gray-800/60 transition-colors"
                    >
                      <div className="font-bold text-white text-xs">{mod.name}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{mod.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/student-management" className={`${pathname === '/student-management' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}>
              Student Mgmt
            </Link>
            <Link href="/staff-management" className={`${pathname === '/staff-management' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}>
              Staff Mgmt
            </Link>
            <Link href="/exam-management" className={`${pathname === '/exam-management' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}>
              Exam Controller
            </Link>
            <Link href="/inventory-management" className={`${pathname === '/inventory-management' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}>
              Inventory
            </Link>
            {isSuperAdmin && (
              <Link href="/admin/cockpit" className={`${pathname === '/admin/cockpit' ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}>
                Root Cockpit
              </Link>
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

      {/* 3. MAIN CONTENT BODY */}
      <main className="flex-1">
        {children}
      </main>

      {/* 4. BLOOMBYTE-STYLE ENTERPRISE FOOTER WITH COMPLETE INTERNAL LINKS & CONTACT INFO */}
      <footer className="border-t border-gray-800/80 bg-[#020617] text-white pt-12 pb-8 px-6 mt-16 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 border-b border-gray-800/60 pb-10 text-xs">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-black text-sm">
                DG
              </div>
              <span className="font-extrabold text-base tracking-tight">DEVGYAN INNOVATION</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              DevGyan is an enterprise-grade cloud ERP platform perfectly tailored for CBSE K-12 institutions. Multi-tenant isolation, real-time APAAR sync, and zero-trust data governance.
            </p>
            <div className="text-[11px] font-mono text-cyan-400">
              Campus Tenant Active: <span className="text-white">{activeSchool.name}</span>
            </div>
          </div>

          {/* Products & Portals */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase font-mono text-[11px] tracking-wider text-cyan-400">
              Institutional Portals
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/student-management" className="hover:text-white transition-colors">Student Management SIS</Link></li>
              <li><Link href="/staff-management" className="hover:text-white transition-colors">Staff & Payroll Ledger</Link></li>
              <li><Link href="/exam-management" className="hover:text-white transition-colors">Exam & Marks Controller</Link></li>
              <li><Link href="/inventory-management" className="hover:text-white transition-colors">Fixed Asset & Inventory</Link></li>
              <li><Link href="/admin/cockpit" className="hover:text-white transition-colors">Root Security Cockpit</Link></li>
            </ul>
          </div>

          {/* ERP Features (BloomByte Style) */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase font-mono text-[11px] tracking-wider text-emerald-400">
              CBSE ERP Features
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/student-management" className="hover:text-white transition-colors">4-Tab Student Dossier</Link></li>
              <li><Link href="/cbse-studio" className="hover:text-white transition-colors">Skill Subjects (IT 402, AI 417)</Link></li>
              <li><Link href="/cbse-studio" className="hover:text-white transition-colors">Sr Sec Streams (CS 083, Yoga)</Link></li>
              <li><Link href="/exam-management" className="hover:text-white transition-colors">CBSE Bell Curve Grading</Link></li>
              <li><Link href="/enquiry-crm" className="hover:text-white transition-colors">Enquiry CRM & Walk-ins</Link></li>
            </ul>
          </div>

          {/* Contact Us (Official Haldwani Center) */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase font-mono text-[11px] tracking-wider text-amber-400">
              Contact & Support
            </h4>
            <div className="space-y-1.5 text-gray-400 text-xs">
              <p className="text-white font-medium">DevGyan Innovation Headquarters</p>
              <p>Lohariya Sal Malla, Near Block Office,</p>
              <p>Haldwani, Nainital, Uttarakhand - 263139</p>
              <p className="text-cyan-400 font-mono pt-1">Tel: +91 73513 24716</p>
              <p className="text-gray-400 font-mono">Email: contact@devgyaninnovation.com</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 font-mono">
          <div>
            © 2026 DevGyan Innovation. Engineered by Nitin Tripathi. All Rights Reserved.
          </div>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span className="hover:text-gray-300">CBSE Compliance Validated</span>
            <span>•</span>
            <span className="hover:text-gray-300">Serverless Neon PostgreSQL</span>
            <span>•</span>
            <span className="hover:text-gray-300">Tier-4 Cloud Isolation</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
