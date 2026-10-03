import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#02050e] border-t border-gray-900 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        
        {/* Column 1: Brand Info & Identity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-lg text-white">
              DG
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              DEVGYAN <span className="text-cyan-400">INNOVATION</span>
            </span>
          </div>
          <p className="text-xs uppercase font-semibold text-gray-300 tracking-wider">
            WE ENGINEER YOUR TECHNOLOGY IDEAS INTO ROBUST, SCALABLE ENTERPRISE SYSTEMS.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Enterprise campus automation, AI-ready student analytics, secure examination controller engines and real-time administrative intelligence across school, college and university tiers.
          </p>
          <div className="pt-2 text-xs text-gray-600 font-mono">
            Architecture: Next.js + NestJS + Go Lang + PostgreSQL + Redis
          </div>
        </div>

        {/* Column 2: Academic Core */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider border-l-2 border-cyan-400 pl-2">
            Academic Core
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/student-management" className="hover:text-cyan-400 transition-colors">Student Management</Link></li>
            <li><Link href="/staff-management" className="hover:text-cyan-400 transition-colors">Staff Management</Link></li>
            <li><Link href="/library-management" className="hover:text-cyan-400 transition-colors">Library Management</Link></li>
            <li><Link href="/staff-payroll" className="hover:text-cyan-400 transition-colors">Staff & Payroll</Link></li>
            <li><Link href="/fee-management" className="hover:text-cyan-400 transition-colors">Fee Management</Link></li>
            <li><Link href="/exam-management" className="hover:text-cyan-400 transition-colors">Exam Management</Link></li>
          </ul>
        </div>

        {/* Column 3: Smart Operations */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider border-l-2 border-blue-500 pl-2">
            Operations & Living
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/attendance-leave" className="hover:text-cyan-400 transition-colors">Attendance & Leave</Link></li>
            <li><Link href="/admission-enquiry" className="hover:text-cyan-400 transition-colors">Admission & Fee</Link></li>
            <li><Link href="/lms" className="hover:text-cyan-400 transition-colors">Learning Management (LMS)</Link></li>
            <li><Link href="/hostel-management" className="hover:text-cyan-400 transition-colors">Hostel Management</Link></li>
            <li><Link href="/transport-management" className="hover:text-cyan-400 transition-colors">Transport Fleet (GPS)</Link></li>
            <li><Link href="/alerts-notification" className="hover:text-cyan-400 transition-colors">SMS & Email Alerts</Link></li>
          </ul>
        </div>

        {/* Column 4: Dedicated Mobile & Web Portals + Governance */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider border-l-2 border-indigo-400 pl-2">
            Portals & Governance
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/student-app" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">📱 Student App</Link></li>
            <li><Link href="/staff-app" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">📱 Staff App</Link></li>
            <li><Link href="/management-app" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">📱 Management App</Link></li>
            <li className="pt-2"><Link href="/inventory-management" className="hover:text-cyan-400 transition-colors">Inventory Management</Link></li>
            <li><Link href="/exam-controller" className="hover:text-cyan-400 transition-colors">Controller of Examination</Link></li>
            <li><Link href="/enquiry-crm" className="hover:text-cyan-400 transition-colors">Enquiry Management CRM</Link></li>
          </ul>
        </div>

        {/* Column 5: Contact Details */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider border-l-2 border-amber-500 pl-2">
            Contact Details
          </h4>
          <div className="space-y-3 text-xs">
            <div>
              <p className="font-semibold text-gray-200">INDIA ADDRESS</p>
              <p className="text-gray-400 leading-relaxed">Lohariya Sal Malla, Near Block Office, Haldwani, Nainital, Uttarakhand - 263139</p>
            </div>
            <div>
              <p className="font-semibold text-gray-200">CLIENT SUPPORT</p>
              <p className="text-cyan-400 font-mono font-bold">+91 73513 24716</p>
              <p className="text-gray-400">contact@example.com</p>
              <p className="text-gray-500">Mon – Sat: 9:00 AM – 7:00 PM (IST)</p>
            </div>
            <div className="pt-1">
              <a
                href="https://wa.me/917351324716"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
              >
                <span>💬</span> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-900 py-6 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
        <div>
          © 2026 DEVGYAN INNOVATION. All rights reserved.
        </div>
        <div className="flex gap-4 font-mono text-[11px]">
          <span>Protected Multi-Tenant Architecture</span>
          <span>•</span>
          <span>Zero Trademark Risk Specification</span>
        </div>
      </div>
    </footer>
  );
};
