"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface NavModule {
  title: string;
  href: string;
  category: string;
  desc: string;
}

const erpSearchIndex: NavModule[] = [
  { title: 'Student Management', href: '/student-management', category: 'Core Academic', desc: 'Admissions, student KYC & lifecycle' },
  { title: 'Staff Management', href: '/staff-management', category: 'Human Resources', desc: 'Faculty allocation & attendance logs' },
  { title: 'Library Management', href: '/library-management', category: 'Resources', desc: 'ISBN cataloging, RFID & book circulation' },
  { title: 'Staff and Payroll', href: '/staff-payroll', category: 'Finance HR', desc: 'Salary processing, allowances & tax slips' },
  { title: 'Fee Management', href: '/fee-management', category: 'Finance', desc: 'Digital challans, payments & penalties' },
  { title: 'Exam Management', href: '/exam-management', category: 'Academics', desc: 'Timetables, mark registers & report cards' },
  { title: 'Attendance & Leave', href: '/attendance-leave', category: 'Operations', desc: 'Biometric sync & parent SMS alerts' },
  { title: 'Admission and Fee', href: '/admission-enquiry', category: 'Enrollment', desc: 'Online application funnel & document desk' },
  { title: 'Learning Management (LMS)', href: '/lms', category: 'Digital Learning', desc: 'Lectures, quizzes & study material' },
  { title: 'Hostel Management', href: '/hostel-management', category: 'Campus Living', desc: 'Bed allocation, warden desk & mess fees' },
  { title: 'Transport Management', href: '/transport-management', category: 'Logistics', desc: 'Live GPS fleet routes & halt logs' },
  { title: 'SMS & Email Alerts', href: '/alerts-notification', category: 'Communication', desc: 'Emergency broadcast & fee triggers' },
  { title: 'Inventory Management', href: '/inventory-management', category: 'Procurement', desc: 'Stock balancing & asset registers' },
  { title: 'Controller of Examination', href: '/exam-controller', category: 'Confidential', desc: 'Encrypted question banks & transcripts' },
  { title: 'Enquiry Management CRM', href: '/enquiry-crm', category: 'Admissions', desc: 'Lead tracking & counselor telephony' },
];

export const Header: React.FC = () => {
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
    <header className="sticky top-0 z-50 w-full shadow-lg">
      
      {/* 1. TOP UTILITY STRIP (Similar to Bloombyte top bar, but strictly DEVGYAN INNOVATION) */}
      <div className="bg-[#02050e] border-b border-gray-900 text-gray-300 text-xs px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="text-gray-400">For institutional queries, contact:</span>
            <a
              href="mailto:contact@example.com"
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              <span>✉</span> contact@example.com
            </a>
            <span className="hidden md:inline text-gray-600">|</span>
            <a
              href="tel:+917351324716"
              className="hidden md:flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
            >
              <span>📞</span> +91 73513 24716 (Mon - Sat: 9 AM - 7 PM)
            </a>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden lg:inline text-gray-500">
              Campus Headquarters: Haldwani, Nainital, Uttarakhand
            </span>
            <a
              href="https://wa.me/917351324716"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>💬</span> WhatsApp Desk
            </a>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR WITH LOGO, SEARCH BAR & MEGA MENUS */}
      <div className="bg-[#030712]/95 backdrop-blur-md border-b border-gray-800 text-white px-6">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/25">
              DG
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white whitespace-nowrap">
              DEVGYAN <span className="text-cyan-400">INNOVATION</span>
            </span>
          </Link>

          {/* Quick Search Finder (Search Bar with Live Dropdown) */}
          <div ref={searchRef} className="relative flex-1 max-w-xs md:max-w-sm hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search modules (e.g. Fees, Exams, LMS)..."
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
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Search Results Modal/Dropdown */}
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
                    No results for "{searchQuery}". Try searching "Student", "Fee", or "GPS".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Menus with Interactive Dropdowns */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-gray-300">
            
            <Link href="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>

            {/* Dropdown: Education ERP Software */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('erp')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-cyan-400 py-2 transition-colors">
                <span>Education ERP Software</span>
                <span className="text-[10px]">▾</span>
              </button>

              {activeDropdown === 'erp' && (
                <div className="absolute top-full left-0 w-64 bg-[#0B1120] border border-gray-800 rounded-xl shadow-2xl p-2 space-y-1 z-50">
                  <Link href="/student-management" className="block px-3 py-2 rounded-lg text-xs hover:bg-gray-800 hover:text-cyan-400">
                    School Management Software
                  </Link>
                  <Link href="/student-management" className="block px-3 py-2 rounded-lg text-xs hover:bg-gray-800 hover:text-cyan-400">
                    College Management Software
                  </Link>
                  <Link href="/student-management" className="block px-3 py-2 rounded-lg text-xs hover:bg-gray-800 hover:text-cyan-400">
                    Institute Management Software
                  </Link>
                </div>
              )}
            </div>

            {/* Dropdown: Features */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('features')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-cyan-400 py-2 transition-colors">
                <span>Features</span>
                <span className="text-[10px]">▾</span>
              </button>

              {activeDropdown === 'features' && (
                <div className="absolute top-full left-0 w-72 bg-[#0B1120] border border-gray-800 rounded-xl shadow-2xl p-3 grid grid-cols-1 gap-1 z-50">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase px-2 py-1">All 15 ERP Modules</div>
                  <Link href="/student-management" className="px-2 py-1.5 rounded-lg text-xs hover:bg-gray-800 hover:text-cyan-400">
                    Student Lifecycle & KYC
                  </Link>
                  <Link href="/fee-management" className="px-2 py-1.5 rounded-lg text-xs hover:bg-gray-800 hover:text-cyan-400">
                    Fee Management & Challans
                  </Link>
                  <Link href="/exam-management" className="px-2 py-1.5 rounded-lg text-xs hover:bg-gray-800 hover:text-cyan-400">
                    Exam & Marksheet Engine
                  </Link>
                  <Link href="/lms" className="px-2 py-1.5 rounded-lg text-xs hover:bg-gray-800 hover:text-cyan-400">
                    Learning Management (LMS)
                  </Link>
                  <Link href="/transport-management" className="px-2 py-1.5 rounded-lg text-xs hover:bg-gray-800 hover:text-cyan-400">
                    Transport Fleet & Live GPS
                  </Link>
                </div>
              )}
            </div>

            <a href="/#pricing" className="hover:text-cyan-400 transition-colors">
              Pricing Plans
            </a>

            <a href="/#faq" className="hover:text-cyan-400 transition-colors">
              Resources
            </a>

            <a href="/#inquiry" className="hover:text-cyan-400 transition-colors">
              Contact Us
            </a>
          </nav>

          {/* Action CTA Button */}
          <div className="flex items-center gap-3">
            <a
              href="#demo-form"
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md shadow-cyan-500/25 transition-all whitespace-nowrap"
            >
              Book Campus Demo
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
