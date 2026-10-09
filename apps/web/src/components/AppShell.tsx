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
  const isPublicPage = pathname === '/' || pathname === '/login';

  const allErpModules = [
    { name: 'Student Mgmt', href: '/student-management', desc: '4-Tab Dossier & KYC' },
    { name: 'Staff Mgmt', href: '/staff-management', desc: 'Faculty, Admin & Support' },
    { name: 'Exam Controller', href: '/exam-management', desc: 'Datesheets & Marks' },
    { name: 'Fixed Inventory', href: '/inventory-management', desc: 'Hardware & Lab Assets' },
    { name: 'Fee Management', href: '/fee-management', desc: 'Challan & Online Dues' },
    { name: 'Enquiry CRM', href: '/enquiry-crm', desc: 'Prospect Leads Funnel' },
    { name: 'CBSE Studio', href: '/cbse-studio', desc: 'Curriculum & Rubrics' },
    { name: 'LMS E-Learning', href: '/lms', desc: 'Digital Lessons & Studio' },
    { name: 'Transport Fleet', href: '/transport-management', desc: 'Bus Fleet & Telematics' },
    { name: 'Staff & Payroll', href: '/staff-payroll', desc: 'Salary & Allowances' },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col relative">
      
      {/* 1. TOP HEADER & TENANT BAR */}
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

        {/* 2. EXACT MAIN NAVIGATION BAR (ALWAYS VISIBLE TO EVERYONE) */}
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

            {/* ERP Modules Dropdown */}
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
            {!isAuthenticated ? (
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
              >
                Protected Login
              </Link>
            ) : (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-bold transition-all"
              >
                Sign Out ⎋
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 3. GLOBAL ROUTE PROTECTION */}
      <main className="flex-1">
        {!isPublicPage && !isAuthenticated ? (
          /* UN-AUTHENTICATED PROMOTIONAL VIEW (BLOOMBYTE-STYLE) */
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
                  Enterprise-grade academic management, dynamic CBSE matrix mapping, APAAR/PEN synchronization, and zero-trust data governance.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <Link
                    href="/login"
                    className="inline-block px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
                  >
                    Protected Institutional Login →
                  </Link>
                </div>
              </div>

              {/* Showcase Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-6 space-y-3">
                  <div className="text-cyan-400 text-3xl">⚡</div>
                  <h3 className="text-xl font-bold text-white">99.98% High Availability</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Serverless Neon cloud architecture powering real-time synchronization across hundreds of classrooms.
                  </p>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest pt-2">• Zero Latency</div>
                </div>

                <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-6 space-y-3">
                  <div className="text-emerald-400 text-3xl">📜</div>
                  <h3 className="text-xl font-bold text-white">CBSE Curriculum Engine</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Full K-12 coverage: Nursery to Class 12th, skill subjects (IT 402, AI 417), CS 083, and co-scholastics.
                  </p>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest pt-2">• NEP 2020 Aligned</div>
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

              <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-8 space-y-4 text-center">
                <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/50">
                  🔒 Confidential Institutional Records Protected
                </span>
                <p className="text-xs text-gray-400 max-w-lg mx-auto">
                  Live student dossiers, marks registers, and inventory records are protected under institutional compliance. Authenticate to unlock workspace.
                </p>
              </div>

            </div>
          </div>
        ) : (
          /* AUTHENTICATED OR PUBLIC (HOMEPAGE/LOGIN) VIEW */
          children
        )}
      </main>

      {/* 4. EXACT FOOTER */}
      <footer className="border-t border-gray-900 bg-[#020617] text-gray-300 pt-12 pb-8 px-6 mt-16 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-900 text-xs">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-black text-sm">
                DG
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">DEVGYAN INNOVATION</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              Enterprise K-12 Institutional Management Platform with strict multi-tenant boundary, CBSE curriculum engine and biometric cloud sync.
            </p>
            <div className="text-[11px] font-mono text-cyan-400 pt-1">
              Haldwani • Nainital District • Uttarakhand
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider flex items-center gap-2">
              <span className="w-1 h-3.5 bg-cyan-400 rounded-sm inline-block"></span>
              ACADEMIC CORE
            </h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li><Link href="/student-management" className="hover:text-cyan-400 transition-colors">Student Management</Link></li>
              <li><Link href="/staff-management" className="hover:text-cyan-400 transition-colors">Staff Management</Link></li>
              <li><Link href="/library-management" className="hover:text-cyan-400 transition-colors">Library Management</Link></li>
              <li><Link href="/staff-payroll" className="hover:text-cyan-400 transition-colors">Staff & Payroll</Link></li>
              <li><Link href="/fee-management" className="hover:text-cyan-400 transition-colors">Fee Management</Link></li>
              <li><Link href="/exam-management" className="hover:text-cyan-400 transition-colors">Exam Management</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider flex items-center gap-2">
              <span className="w-1 h-3.5 bg-blue-500 rounded-sm inline-block"></span>
              OPERATIONS & LIVING
            </h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li><Link href="/attendance-leave" className="hover:text-cyan-400 transition-colors">Attendance & Leave</Link></li>
              <li><Link href="/admission-enquiry" className="hover:text-cyan-400 transition-colors">Admission & Fee</Link></li>
              <li><Link href="/lms" className="hover:text-cyan-400 transition-colors">Learning Management (LMS)</Link></li>
              <li><Link href="/hostel-management" className="hover:text-cyan-400 transition-colors">Hostel Management</Link></li>
              <li><Link href="/transport-management" className="hover:text-cyan-400 transition-colors">Transport Fleet (GPS)</Link></li>
              <li><Link href="/alerts-notification" className="hover:text-cyan-400 transition-colors">SMS & Email Alerts</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider flex items-center gap-2">
              <span className="w-1 h-3.5 bg-purple-500 rounded-sm inline-block"></span>
              PORTALS & GOVERNANCE
            </h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li>
                <Link href="/student-app" className="text-cyan-400 font-bold hover:underline flex items-center gap-1.5">
                  <span>📱</span> Student App
                </Link>
              </li>
              <li>
                <Link href="/staff-app" className="text-cyan-400 font-bold hover:underline flex items-center gap-1.5">
                  <span>📱</span> Staff App
                </Link>
              </li>
              <li>
                <Link href="/management-app" className="text-cyan-400 font-bold hover:underline flex items-center gap-1.5">
                  <span>📱</span> Management App
                </Link>
              </li>
              <li className="pt-1"><Link href="/inventory-management" className="hover:text-cyan-400 transition-colors">Inventory Management</Link></li>
              <li><Link href="/exam-controller" className="hover:text-cyan-400 transition-colors">Controller of Examination</Link></li>
              <li><Link href="/enquiry-crm" className="hover:text-cyan-400 transition-colors">Enquiry Management CRM</Link></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 font-mono">
          <div>
            © 2026 DevGyan Innovation. Engineered by Nitin Tripathi. All Rights Reserved.
          </div>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span>CBSE NEP-2020 Validated</span>
            <span>•</span>
            <span>Serverless Neon Cloud</span>
            <span>•</span>
            <span>Multi-Tenant Vault Active</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
