"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTenant } from '../../context/TenantContext';

interface NavModule {
  title: string;
  href: string;
  category: string;
  desc: string;
}

const erpSearchIndex: NavModule[] = [
  { title: 'Student Management', href: '/student-management', category: 'Academic Core', desc: 'Admissions, student KYC & lifecycle' },
  { title: 'Staff Management', href: '/staff-management', category: 'Academic Core', desc: 'Faculty allocation & attendance logs' },
  { title: 'Library Management', href: '/library-management', category: 'Academic Core', desc: 'ISBN cataloging, RFID & book circulation' },
  { title: 'Staff & Payroll', href: '/staff-payroll', category: 'Academic Core', desc: 'Salary processing, allowances & tax slips' },
  { title: 'Fee Management', href: '/fee-management', category: 'Academic Core', desc: 'Digital challans, payments & penalties' },
  { title: 'Exam Management', href: '/exam-management', category: 'Academic Core', desc: 'Timetables, mark registers & report cards' },
  { title: 'Attendance & Leave', href: '/attendance-leave', category: 'Operations', desc: 'Biometric sync & parent SMS alerts' },
  { title: 'Admission & Fee', href: '/admission-enquiry', category: 'Operations', desc: 'Online application funnel & document desk' },
  { title: 'Learning Management (LMS)', href: '/lms', category: 'Operations', desc: 'Lectures, quizzes & study material' },
  { title: 'Hostel Management', href: '/hostel-management', category: 'Operations', desc: 'Bed allocation, warden desk & mess fees' },
  { title: 'Transport Management', href: '/transport-management', category: 'Operations', desc: 'Live GPS fleet routes & halt logs' },
  { title: 'SMS & Email Alerts', href: '/alerts-notification', category: 'Operations', desc: 'Emergency broadcast & fee triggers' },
  { title: 'Student App', href: '/student-app', category: 'Mobile Portals', desc: 'Personalized student & parent companion' },
  { title: 'Staff App', href: '/staff-app', category: 'Mobile Portals', desc: 'Faculty roll call & substitution roster' },
  { title: 'Management App', href: '/management-app', category: 'Mobile Portals', desc: 'Director executive analytics & cashflow' },
  { title: 'Inventory Management', href: '/inventory-management', category: 'Governance', desc: 'Asset tracking, hardware stocks & POs' },
  { title: 'Controller of Examination', href: '/exam-controller', category: 'Governance', desc: 'Encrypted question paper vault' },
  { title: 'Enquiry Management CRM', href: '/enquiry-crm', category: 'Governance', desc: 'Lead tracking & admissions telephony' },
];

export const Header: React.FC = () => {
  const { activeSchool, user, logoutUser } = useTenant();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredModules = erpSearchIndex.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full shadow-xl">
      {/* 1. TOP UTILITY STRIP */}
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

          {/* Quick Search Finder */}
          <div ref={searchRef} className="relative flex-1 max-w-xs md:max-w-sm hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search modules (e.g. Fees, Exams, Apps)..."
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                className="w-full bg-gray-900/90 border border-gray-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-gray-400 hover:text-white text-xs">
                  ✕
                </button>
              )}
            </div>

            {isSearchOpen && (
              <div className="absolute top-12 left-0 w-full bg-[#0B1120] border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
                <div className="p-2 bg-gray-900/80 text-[10px] uppercase font-bold text-gray-400 tracking-wider border-b border-gray-800">
                  {filteredModules.length > 0 ? `Matching Modules (${filteredModules.length})` : 'No module found'}
                </div>
                {filteredModules.length > 0 ? (
                  filteredModules.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="block p-3 hover:bg-gray-800/80 border-b border-gray-800/40 last:border-none transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white hover:text-cyan-400">{item.title}</span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/50">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
                    </Link>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-gray-400">
                    No results for "{searchQuery}".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Menus */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-gray-300">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            
            <div className="relative" onMouseEnter={() => setActiveDropdown('features')} onMouseLeave={() => setActiveDropdown(null)}>
              <button className="flex items-center gap-1 hover:text-cyan-400 py-2 transition-colors">
                <span>ERP Modules</span>
                <span className="text-[10px]">▾</span>
              </button>
              {activeDropdown === 'features' && (
                <div className="absolute top-full left-0 w-80 bg-[#0B1120] border border-gray-800 rounded-xl shadow-2xl p-3 grid grid-cols-2 gap-1 z-50 text-[11px]">
                  <Link href="/student-management" className="p-1.5 rounded hover:bg-gray-800 hover:text-cyan-400">Student Mgmt</Link>
                  <Link href="/fee-management" className="p-1.5 rounded hover:bg-gray-800 hover:text-cyan-400">Fee Mgmt</Link>
                  <Link href="/exam-management" className="p-1.5 rounded hover:bg-gray-800 hover:text-cyan-400">Exam Mgmt</Link>
                  <Link href="/lms" className="p-1.5 rounded hover:bg-gray-800 hover:text-cyan-400">LMS Studio</Link>
                  <Link href="/transport-management" className="p-1.5 rounded hover:bg-gray-800 hover:text-cyan-400">Transport GPS</Link>
                  <Link href="/hostel-management" className="p-1.5 rounded hover:bg-gray-800 hover:text-cyan-400">Hostel Living</Link>
                  <Link href="/student-app" className="p-1.5 rounded text-cyan-400 font-bold hover:bg-gray-800">Student App</Link>
                  <Link href="/staff-app" className="p-1.5 rounded text-cyan-400 font-bold hover:bg-gray-800">Staff App</Link>
                  <Link href="/inventory-management" className="p-1.5 rounded hover:bg-gray-800 hover:text-cyan-400">Inventory</Link>
                  <Link href="/exam-controller" className="p-1.5 rounded hover:bg-gray-800 hover:text-cyan-400">Exam Controller</Link>
                  <Link href="/enquiry-crm" className="p-1.5 rounded hover:bg-gray-800 hover:text-cyan-400">Enquiry CRM</Link>
                  <Link href="/faculty/studio" className="p-1.5 rounded hover:bg-gray-800 hover:text-cyan-400">CBSE Studio</Link>
                </div>
              )}
            </div>

            <Link href="/faculty/studio" className="hover:text-cyan-400 transition-colors">CBSE Studio</Link>
            <Link href="/admin/cockpit" className="hover:text-cyan-400 transition-colors">Root Cockpit</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/25 transition-all"
            >
              {user ? 'My Workspace' : 'Protected Login'}
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};
